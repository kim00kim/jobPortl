<?php

namespace JobPortl\JPBundle\Service;

use \Monolog\Logger;
use Doctrine\Common\Collections\ExpressionBuilder;
use Doctrine\Common\Collections\Criteria;

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
	public function getUserAccount($id)
	{
		return $this->userAccountRepo->find($id);
	}
	public function getAllSkills()
	{
		return $this->skillRepo->findAll();
	}
	public function getPostingByUser($userId)
	{
		return $this->postingRepo->createQueryBuilder('p')
			->join('p.user','u')
			->where('u.userId = :userId')
			->setParameter('userId',$userId)
			->orderBy('p.datetimePosted','DESC')
			->getQuery()
			->getResult();
	}
	public function getAllJobPost()
	{
		return $this->postingRepo->createQueryBuilder('p')
			->join('p.user','u')
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
	public function deleteAS($asId)
	{
		$as = $this->acquiredSkillRepo->find($asId);
		return $this->_removeFlush($as);
	}
	public function deleteSkill($categoryId)
	{
		$skill = $this->skillRepo->find($categoryId);
		return $this->_removeFlush($skill);
	}
	public function getSkilledLaborers()
	{
		return $this->userAccountRepo->findBy(array('userType' => 1));
	}
	public function saveAcquiredSkill($newSkill)
	{
		return $this->_persistFlush($newSkill);
	}
	public function getAcquiredSkillById($id)
	{
		return $this->acquiredSkillRepo->find($id);
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