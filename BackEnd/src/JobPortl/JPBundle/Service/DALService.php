<?php

namespace JobPortl\JPBundle\Service;

use \Monolog\Logger;
use Doctrine\Common\Collections\ExpressionBuilder;
use Doctrine\Common\Collections\Criteria;
use Doctrine\DBAL\Query;
use Doctrine\ORM\EntityManager;

class DALService
{

	private $adminRepo;
	private $userAccountRepo;
	private $categoryRepo;
	private $skillRepo;
	private $userRepo;
	private $postingRepo;
	private $acquiredSkillRepo;
	private $applicationRepo;

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
		$this->applicationRepo = $entityManager->getRepository('JobPortlJPBundle:Application');
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
			->innerJoin('p.user','u')
			->innerJoin('p.skill','s')
			->innerJoin('s.category', 'c')
//			->leftJoin('JobPortlJPBundle:Application','a', 'With', 'IDENTITY(a.posting) = p.postingId', 'a.appId')
//			->innerJoin('a.user','au')
			->addSelect('partial u.{userId,firstName,lastName,photo,cpNo}','partial s.{skillId,skillName}',
				'partial c.{categoryId,categoryName}')
//			->join('p.user','u')
			->where('u.userId = :userId')
			->setParameter('userId',$userId)
			->orderBy('p.datetimePosted','DESC')
//			->getDQL();
			->getQuery()
			->getArrayResult();
	}
	public function getApplication($postingId)
	{
		return $this->applicationRepo->createQueryBuilder('a')
			->innerJoin('a.posting','p')
			->innerJoin('a.user','u')
			->addSelect('u')
			->where('p.postingId = ?1')
		//fix tomorrow
			->andWhere('a.status= ?2')
			->setParameters(array(1 => $postingId, 2=> 2))
			->getQuery()
			->getArrayResult();
	}

	public function getAllJobPost()
	{
		return $this->postingRepo->createQueryBuilder('p')
			->innerJoin('p.user','u')
			->innerJoin('p.skill','s')
			->innerJoin('s.category', 'c')
			->addSelect('partial u.{userId,firstName,lastName,photo,cpNo}','partial s.{skillId,skillName}',
				'partial c.{categoryId,categoryName}')
			->orderBy('p.datetimePosted','DESC')
			->getQuery()
			->getArrayResult();

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
	public function deleteApplication($appId)
	{
		$app = $this->applicationRepo->find($appId);
		return $this->_removeFlush($app);
	}
	public function deleteSkill($categoryId)
	{
		$skill = $this->skillRepo->find($categoryId);
		return $this->_removeFlush($skill);
	}
	public function getSkilledLaborers()
	{
//		return $this->userAccountRepo->findBy(array('userType' => 1));
		return $this->userAccountRepo->createQueryBuilder('ua')
			->select('partial ua.{userAccId, userAccType,userType,user}')
			->innerJoin('ua.user','u')
//			->leftJoin('JobPortlJPBundle:AcquiredSkill','ac','With','IDENTITY(ac.user)= u.userId','ac.asId')
			->addSelect('u')
			->where('ua.userType = ?1')
			->setParameters(array(1 => 1))
//			->getDQL();
			->getQuery()
			->getArrayResult();
	}
	public function getSkilledLaborerById($userId)
	{
		return $this->userRepo->createQueryBuilder('u')
			->where('u.userId = ?1')
			->setParameters(array(1 => $userId))
			->getQuery()
			->getArrayResult();
	}
	public function saveAcquiredSkill($newSkill)
	{
		return $this->_persistFlush($newSkill);
	}
	public function getAcquiredSkillByUser($userId)
	{
		return $this->acquiredSkillRepo->createQueryBuilder('ac')
			->innerJoin('ac.skill','s')
			->innerJoin('s.category','c')
			->innerJoin('ac.user','u')
			->addSelect('s','c')
			->where('IDENTITY(ac.user) = ?1')
			->setParameters(array(1 => $userId))
			->getQuery()
			->getArrayResult();
	}
	public function getPostingById($id)
	{
		return $this->postingRepo->find($id);
		/*return $this->createQuery('Select p FROM JobPortlJPBundle:Posting WHERE p.postingId = ?1')
			->setParameter(1, $id)
			->getQuery()
			->getArrayResult;*/
	}

	public function getApplicationById($appId)
	{
		return $this->applicationRepo->find($appId);
	}

	public function saveApplication($application){
		return $this->_persistFlush($application);
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


/*
 * Some useful queries
 *
		 * getting the acquired skill of a specific user
		 * return $this->acquiredSkillRepo->createQueryBuilder('ac')
			->innerJoin('ac.skill','s')
			->innerJoin('s.category','c')
			->innerJoin('ac.user','u')
			->addSelect('u','s','c')
			->where('IDENTITY(ac.user) = 2')
//			->setParameters(array(1 => 1))
			->getQuery()
			->getArrayResult();*/
