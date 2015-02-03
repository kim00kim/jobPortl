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
		$user->setFirstName($post->get('first_name'));
		$user->setLastName($post->get('last_name'));
		$user->setAddress($post->get('address'));
		$user->setCityMun($post->get('city'));
		$user->setZipCode($post->get('zipcode'));
		$user->setGender($post->get('gender'));
		$user->setBirthdate(\DateTime::createFromFormat('Y-m-d', $post->get('birthdate')));;
		$user->setCpNo($post->get('cpno'));
		$user->setPhoto($post->get('photo'));

		$userAccount = new Entity\UserAccount();
		$userAccount->setEmail($post->get('email'));
		$userAccount->setSalt(uniqid(mt_rand())); // Unique salt for user

		// Set encrypted password
		$encoder = $this->container->get('security.encoder_factory')
			->getEncoder($userAccount);
		$password = $encoder->encodePassword($post->get('password'), $userAccount->getSalt());
		$userAccount->setPassword($password);

		$userAccount->setUserAccType($post->get('user_acc_type'));
		$userAccount->setUserType($post->get('user_type'));
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
		$userAccount = new Entity\UserAccount();

		$dal = $this->get('jpdal.dal');
		$dal->validateUser($post->get('email_add'));
		$logger->debug("Email: " . $post->get('email_add'));

		$userAccount = $dal->validateUser($post->get('email_add'));
		$logger->debug("Result: " . json_encode($userAccount));
		if (count($userAccount) != 1) {
			return $userAccount;
		} else {
//			$userAccount = $result;
			$encoder = $this->container->get('security.encoder_factory')
				->getEncoder($userAccount);
			$password = $encoder->encodePassword($post->get('password'), $userAccount->getSalt());
//			$logger->debug("Pass:" . strlen($password));
			$isValid = $encoder->isPasswordValid($userAccount->getPassword(), $post->get('password'), $userAccount->getSalt());
//			$logger->debug("Result: " .$isValid . " encoded: " . $userAccount->getPassword() . " raw: ".$post->get('password'). " salt: " .$userAccount->getSalt());
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
		return $dal->validateAdmin($post->get('username'), $post->get('password'));;
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
		$category = new Entity\JobCategory();
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
		$category = new Entity\JobCategory();

		$logger = $this->get('logger');
		$post = $request->request;
		$dal = $this->get('jpdal.dal');

		$skill->setSkillName($post->get('skill_name'));
		$skill->setJobCategory($dal->getJobCategory($post->get('category_id')));

//		$logger->debug("Category: " . $category);

		$dal->saveSkill($skill);
		return $skill;
	}
	public function getAllskillsAction()
	{
		$logger = $this->get('logger');
		$dal = $this->get('jpdal.dal');
		$res = $dal->getAllSkills();
		$logger->debug("Skills: " . json_encode($res));
		return $dal->getAllSkills();
	}

}