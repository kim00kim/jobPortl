<?php

namespace JobPortl\JPBundle\Service;

use \Monolog\Logger;

class DALService
{

	private $adminRepo;
	private $userAccountRepo;
	private $categoryRepo;
	private $skillRepo;
	private $userRepo;
	private $postingRepo;
	private $acquiredSkillRepo;

	public function __construct(\Doctrine\ORM\EntityManager $entityManager, \Monolog\Logger $logger)
	{
		$this->manager = $entityManager;

		$this->adminRepo = $entityManager->getRepository('JobPortlJPBundle:Admin');
		$this->userAccountRepo = $entityManager->getRepository('JobPortlJPBundle:UserAccount');
		$this->categoryRepo = $entityManager->getRepository('JobPortlJPBundle:Category');
		$this->skillRepo = $entityManager->getRepository('JobPortlJPBundle:Skill');
		$this->userRepo = $entityManager->getRepository('JobPortlJPBundle:UserJ');
		$this->postingRepo = $entityManager->getRepository('JobPortlJPBundle:Posting');
		$this->acquiredSkillRepo = $entityManager->getRepository('JobPortlJPBundle:AcquiredSkill');
	}

	public function getAdmin($adminId)
	{
		return $this->adminRepo->find($adminId);
	}

	function saveUser($user)
	{
		return $this->_persistFlush($user);
	}

	function saveUserAccount($userAccount)
	{
		return $this->_persistFlush($userAccount);
	}

	public function validateUser($email)
	{
		return $this->userAccountRepo->findOneBy(array('email' => $email));
	}

	public function validateAdmin($username, $password)
	{
		return $this->adminRepo->findOneBy(array('username' => $username, 'password' =>$password));
	}

	public function saveCategory($category){
		return $this->_persistFlush($category);
	}

	public function saveSkill($skill){
		return $this->_persistFlush($skill);
	}
	public function savePosting($posting){
		return $this->_persistFlush($posting);
	}

	public function getAllCategories()
	{
		return $this->categoryRepo->findAll();
	}

	public  function getCategory($id)
	{
		return $this->categoryRepo->find($id);
	}
	public  function getSkill($id)
	{
		return $this->skillRepo->find($id);
	}
	public function getUser($id)
	{
		return $this->userRepo->find($id);
	}

	public function getAllSkills()
	{
		return $this->skillRepo->findAll();
	}
	public function getPostingByUser($userId)
	{
		return $this->postingRepo->createQueryBuilder('p')
			->select('p.postingId posting_id','p.datetimePosted datetime_posted','p.description','p.location','p.requiredApplicant required_applicant','p.status','p.available',
				'u.userId', 'u.firstName first_name', 'u.lastName last_name, u.photo','s.skillId skill_id','s.skillName skill_name','c.categoryId category_id','c.categoryName category_name')
			->join('p.user','u')
			->join('p.skill','s')
			->join('s.category','c')
			->where('u.userId = :userId')
			->setParameter('userId',$userId)
			->orderBy('p.datetimePosted','DESC')
			->getQuery()
			->getResult();
	}
	public function getAllJobPost()
	{
		$fields = array('p',);
		return $this->postingRepo->createQueryBuilder('p')
			->select('p.postingId posting_id','p.datetimePosted datetime_posted','p.description','p.location','p.requiredApplicant required_applicant','p.status','p.available',
					'u.userId', 'u.firstName first_name', 'u.lastName last_name, u.photo','s.skillId skill_id','s.skillName skill_name','c.categoryId category_id','c.categoryName category_name')
			->join('p.user','u')
			->join('p.skill','s')
			->join('s.category','c')
			->orderBy('p.datetimePosted','DESC')
			->getQuery()
			->getResult();
	}
	public function getUserPosting($userId)
	{
		return $this->userRepo->find($userId);
	}
	public function deleteCategory($categoryId)
	{
		$category = $this->categoryRepo->find($categoryId);
		return $this->_removeFlush($category);
	}
	public function deleteSkill($categoryId)
	{
		$skill = $this->skillRepo->find($categoryId);
		return $this->_removeFlush($skill);
	}
	public function getSkilledLaborers()
	{
		return $this->userAccountRepo->createQueryBuilder('u')
//			->orderBy('p.datetimePosted','DESC')
			->join('u.user','s')
			->where('u.userType = 1')
			->getQuery()
			->getResult();
	}
	public function saveAcquiredSkill($newSkill)
	{
		return $this->_persistFlush($newSkill);
	}
	private function _persistFlush($object)
	{
		$this->manager->persist($object);
		$this->manager->flush();

		return $object;
	}
	public function _flush($object)
	{
		$this->manager->flush();

		return $object;
	}

	private function _removeFlush($object)
	{
		$this->manager->remove($object);
		$this->manager->flush();

		return $object;
	}
}