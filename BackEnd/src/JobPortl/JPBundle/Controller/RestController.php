<?php

namespace JobPortl\JPBundle\Controller;

use FOS\RestBundle\Controller\Annotations\View;
use Proxies\__CG__\JobPortl\JPBundle\Entity\UserAccount;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use JobPortl\JPBundle\Entity;
use JobPortl\JPBundle\Service\Sha256Salted;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;
use \Monolog\Logger;

class RestController extends Controller
{
	public function getTestAction()
	{
		return "Hello!";
	}

	public function postAdduserAction(Request $request)
	{
		$post = $request->request;

		$logger = $this->get('logger');
		$logger->debug("VALUES: " . $request);

		$user = new Entity\UserJ();
		$user->setFirstName($post->get('firstName'));
		$user->setLastName($post->get('lastName'));
		$user->setAddress($post->get('address'));
		$user->setCityMun($post->get('city'));
		$user->setGender($post->get('gender'));
		$user->setBirthdate(\DateTime::createFromFormat('Y-m-d', $post->get('birthdate')));
		$user->setCpNo($post->get('cpno'));
		$user->setPhoto(($post->get('photo') == NULL ? 'img/blank.png': $post->get('photo')));

		$userAccount = new Entity\UserAccount();
		$userAccount->setEmail($post->get('email'));
		$userAccount->setSalt(uniqid(mt_rand())); // Unique salt for user

		// Set encrypted password
		$encoder = $this->container->get('security.encoder_factory')
			->getEncoder($userAccount);
		$password = $encoder->encodePassword($post->get('password'), $userAccount->getSalt());
		$userAccount->setPassword($password);

		$userAccount->setUserAccType($post->get('userAccType'));
		$userAccount->setUserType($post->get('userType'));
		$userAccount->setUser($user);

		$dal = $this->get('jpdal.dal');
		$dal->saveUser($user);
		$dal->saveUserAccount($userAccount);
		return $user;
	}

	public function postUserAction(Request $request)
	{
		$logger = $this->get('logger');
		$post = $request->request;
		$dal = $this->get('jpdal.dal');
		$dal->validateUser($post->get('email'));
		$logger->debug("Email: " . $post->get('email'));

		$userAccount = $dal->validateUser($post->get('email'));
		$logger->debug("Result: " . json_encode($userAccount));
		if (count($userAccount) != 1) {
			return $userAccount;
		} else {
			$encoder = $this->container->get('security.encoder_factory')
				->getEncoder($userAccount);
			$isValid = $encoder->isPasswordValid($userAccount->getPassword(), $post->get('password'), $userAccount->getSalt());
			if (!$isValid)
				return null;
			else
				return $userAccount;
		}
	}

	public function postAdminAction(Request $request)
	{
		$post=$request->request;

		$dal = $this->get('jpdal.dal');
		return $dal->validateAdmin($post->get('username'), $post->get('password'));
	}

	public function getAdminAction($id)
	{
		$logger = $this->get('logger');
		$dal = $this->get('jpdal.dal');
		$res = $dal->getAdmin($id);
		$logger->debug("Admin: " . json_encode($res));
		return $dal->getAdmin($id);
	}

	public function postAddcategoryAction(Request $request)
	{
		$category = new Entity\Category();
		$logger = $this->get('logger');
		$post = $request->request;
//		$logger->debug("Category : " . $request);
		$logger->debug("Category: " . $post->get('category_name'));
		$logger->debug("Category: " . $post->get('description'));
		$category->setCategoryName($post->get('category_name'));
		$category->setDescription($post->get('description'));
		$logger->debug("Category: " . $post->get('category_name'));
		$logger->debug("Category: " . $post->get('description'));
		$dal = $this->get('jpdal.dal');
		$dal->saveCategory($category);
		return $category;
	}
	public function getAllcategoriesAction()
	{
		$logger = $this->get('logger');
		$dal = $this->get('jpdal.dal');
		$res = $dal->getAllCategories();
		$logger->debug("Admin: " . json_encode($res));
		return $dal->getAllCategories();
	}
	public function postAddskillAction(Request $request)
	{
		$skill = new Entity\Skill();
		$post = $request->request;
		$dal = $this->get('jpdal.dal');

		$skill->setSkillName($post->get('skill_name'));
		$skill->setCategory($dal->getCategory($post->get('category_id')));

		$dal->saveSkill($skill);
		return $skill;
	}
	public function getAllskillsAction()
	{
		$dal = $this->get('jpdal.dal');
		return $dal->getAllSkills();
	}
	public function postAddjobpostAction(Request $request)
	{
		$post = $request->request;
		$dal = $this->get('jpdal.dal');
		$logger = $this->get('logger');

		$posting = new Entity\Posting();
		$posting->setDescription($post->get('description'));
		$posting->setLocation($post->get('location'));
		$posting->setRequiredApplicant($post->get('requiredApplicant'));
		$posting->setHired(0);
		$logger->debug("requiredApplicant: " .$post->get('requiredApplicant'));
		$posting->setStatus(1);
		$posting->setType($post->get('type'));
		$posting->setUser($dal->getUser($post->get('userId')));
		$posting->setSkill($dal->getSkill($post->get('skillId')));

		return $dal->savePosting($posting);
	}
	public function postSendjobofferAction(Request $request)
	{
		$post = $request->request;
		$dal = $this->get('jpdal.dal');
		$logger = $this->get('logger');
		$posting = new Entity\Posting();
		$application = new Entity\Application();

		$posting->setDescription($post->get('description'));
		$posting->setLocation($post->get('location'));
		$posting->setRequiredApplicant(1);
		$posting->setHired(0);
//		$logger->debug("requiredApplicant: " .$post->get('requiredApplicant'));
		$posting->setStatus(1);
		$posting->setType(1);
		$posting->setUser($dal->getUser($post->get('employerId')));
		$posting->setSkill($dal->getSkill($post->get('skillId')));

		$dal->savePosting($posting);

		$application->setUser($dal->getUser($post->get('slId')));
		$application->setStatus(0);
		$application->setPosting($posting);
		$dal->saveApplication($application);
		return $application;
	}
	public function getJobpostbyuserAction($userId)
	{
		$dal = $this->get('jpdal.dal');
		$postings = $dal->getPostingByUser($userId);
		$logger = $this->get('logger');
		$logger->debug("Trial");
//		$logger->debug(json_encode($postings));
		foreach($postings as $key => $posting){
			$logger->debug(json_encode($dal->getApplication($posting['postingId'])));
			array_push($postings[$key],$dal->getApplication($posting['postingId'], 2));
			$postings[$key] ['applications'] = $postings[$key] [0];
			unset($postings[$key][0]);
		}
		return $postings;
	}
	public function getAlljobpostAction()
	{
		$dal = $this->get('jpdal.dal');
		$postings= $dal->getAllJobPost();
		foreach($postings as $key => $posting){
			array_push($postings[$key],$dal->getApplication($posting['postingId']));
			$postings[$key] ['applications'] = $postings[$key] [0];
			unset($postings[$key][0]);
		}
		return $postings;
	}
    public function postSlapplicationAction(Request $request)
    {
        $post= $request->request;
        $dal = $this->get('jpdal.dal');
        $logger = $this->get('logger');
        $logger->debug("userId: " . $post->get('userId'));
        $logger->debug("type: " . $post->get('type'));
        $logger->debug("status: " . $post->get('status'));
        return $dal->getSlApplication($post->get('userId'),$post->get('type'),$post->get('status'));
    }
	public function deleteDeletecategoryAction($categoryId)
	{
		$logger = $this->get('logger');
		$logger->debug("Passed: " . $categoryId);
		$dal = $this->get('jpdal.dal');
		return $dal->deleteCategory($categoryId);
//		return $categoryId;
	}
	public function postUpdatecategoryAction(Request $request)
	{
		$post = $request->request;
		$dal= $this->get('jpdal.dal');
		$category = $dal->getCategory($post->get('category_id'));

		$category->setCategoryName($post->get('category_name'));
		$category->setDescription($post->get('description'));
		return $dal->_flush($category);
	}
	public function postUpdateskillAction(Request $request)
	{
		$post = $request->request;
		$dal= $this->get('jpdal.dal');
		$skill = $dal->getSkill($post->get('skill_id'));

		$skill->setSkillName($post->get('skill_name'));
		$skill->setCategory($dal->getCategory($post->get('category_id')));
		return $dal->_flush($skill);
	}
	public function postAcceptapplicationAction($appId)
	{
		$dal= $this->get('jpdal.dal');
		$application = $dal->getApplicationById($appId);
		$application->setStatus(1);
		$posting= $application->getPosting();
		if($posting->getHired() + 1 == $posting->getRequiredApplicant())
			$posting->setStatus(0);
		$posting->setHired($posting->getHired() + 1);
		return $dal->_flush($application);
	}
	public function deleteDeleteskillAction($skillId)
	{
		$logger = $this->get('logger');
		$logger->debug("Passed: " . $skillId);
		$dal = $this->get('jpdal.dal');
		return $dal->deleteSkill($skillId);
//		return $categoryId;
	}
	public function getSkilledlaborerAction()
	{
		$dal = $this->get('jpdal.dal');
		return $dal->getSkilledLaborers();
	}
	public function getAcquiredskillbyuserAction($userId)
	{
		$dal = $this->get('jpdal.dal');
		return $dal->getAcquiredSkillByUser($userId);
	}
	public function postAcquiredskillAction(Request $request)
	{
		$returnArray = array();
		$post = $request->request;
		$dal = $this->get("jpdal.dal");
		$logger = $this->get('logger');
//		foreach($p)
		foreach($post->get('skillId') as $skillId){
			$acquiredSkill = new Entity\AcquiredSkill();
			$user = $dal->getUser($post->get('userId'));
			$acquiredSkill->setUser($user);
			$logger->debug("skillId: " . $skillId);
			$skill = $dal->getSkill($skillId);
			$acquiredSkill->setSkill($skill);
			array_push($returnArray, $dal->saveAcquiredSkill($acquiredSkill));
		}
		return $returnArray;
	}
	public function getUpdateduserinfoAction($userAccId)
	{
		$dal = $this->get("jpdal.dal");
		return $dal->getUserAccount($userAccId);

	}
	public function postUpdatetitleAction(Request $request)
	{
		$post = $request->request;
		$dal= $this->get('jpdal.dal');
		$user = $dal->getUser($post->get('userId'));

		$user->setTitle($post->get('title'));
		return $dal->_flush($user);
	}
	public function deleteRemoveskillAction($asId)
	{
		$dal= $this->get('jpdal.dal');
		return $dal->deleteAS($asId);
	}
	public function postApplypostingAction(Request $request)
	{
		$dal= $this->get('jpdal.dal');
		$post = $request->request;
		$application = new Entity\Application();

		$logger = $this->get('logger');
		$logger->debug($post->get('postingId'));
		$logger->debug($post->get('userId'));

		$application->setStatus(2);
		$application->setPosting($dal->getPostingById($post->get('postingId')));
		$application->setUser($dal->getUser($post->get('userId')));

		return $dal->saveApplication($application);
	}
	public function getSkilledlaborerbyidAction($userId)
	{
		$dal= $this->get('jpdal.dal');
		return $dal->getSkilledLaborerById($userId);
	}
	public function deleteDeclineapplicationAction($appId)
	{
		$dal= $this->get('jpdal.dal');
		return $dal->deleteApplication($appId);
	}
}