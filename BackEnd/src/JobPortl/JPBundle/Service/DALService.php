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

	public function __construct(\Doctrine\ORM\EntityManager $entityManager, \Monolog\Logger $logger)
	{
		$this->manager = $entityManager;

		$this->adminRepo = $entityManager->getRepository('JobPortlJPBundle:Admin');
		$this->userAccountRepo = $entityManager->getRepository('JobPortlJPBundle:UserAccount');
		$this->categoryRepo = $entityManager->getRepository('JobPortlJPBundle:JobCategory');
		$this->skillRepo = $entityManager->getRepository('JobPortlJPBundle:Skill');
		$this->userRepo = $entityManager->getRepository('JobPortlJPBundle:UserJ');
		$this->postingRepo = $entityManager->getRepository('JobPortlJPBundle:Posting');
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
	public function saveJob($job){
		return $this->_persistFlush($job);
	}
	public function savePosting($posting){
		return $this->_persistFlush($posting);
	}

	public function getAllCategories()
	{
		return $this->categoryRepo->findAll();
	}

	public  function getJobCategory($id)
	{
		return $this->categoryRepo->find($id);
	}
	public function getUser($id)
	{
		return $this->userRepo->find($id);
	}

	public function getAllSkills()
	{
		return $this->skillRepo->findAll();
	}
	public function getPosting($user)
	{
		return $this->postingRepo->findBy(array('userId' => $user[0]));
//		return $this->userRepo->find($id);

	}

	private function _persistFlush($object)
	{
		$this->manager->persist($object);
		$this->manager->flush();

		return $object;
	}

}