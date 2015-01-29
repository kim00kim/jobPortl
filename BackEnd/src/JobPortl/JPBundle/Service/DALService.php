<?php

namespace JobPortl\JPBundle\Service;

use \Monolog\Logger;

class DALService {

	private $adminRepo;
	private $userAccountRepo;

	public function __construct(\Doctrine\ORM\EntityManager $entityManager, \Monolog\Logger $logger) {
		$this->manager = $entityManager;
		$this->adminRepo = $entityManager->getRepository('JobPortlJPBundle:Admin');
		$this->userAccountRepo = $entityManager->getRepository('JobPortlJPBundle:UserAccount');
	}
	public function getAdmin($adminId) {
//		$logger = $this->get('logger');

		/*$query = $this->adminRepo->createQueryBuilder('a')
			->where('a.user_name > :adminId')
			->setParameter('adminId', $adminId)
			->getQuery();*/
//		$logger->debug("Query: " .  $query);
//		return  $query->getOneOrNullResult(); /*$this->adminRepo->findBy(array('user_name' => $adminId));  // Equivalent to a SELECT * FROM child WHERE id = $id*/
		return $this->adminRepo->findOneBy(array('userName' => $adminId));

	}
	function saveUser($user) {
		return $this->_persistFlush($user);
	}
	function saveUserAccount($userAccount) {
		return $this->_persistFlush($userAccount);
	}
	public function validateUser($email){
		return $this->userAccountRepo->findOneBy(array('email' => $email));
	}

	private function _persistFlush($object) {
		$this->manager->persist($object);
		$this->manager->flush();

		return $object;
	}


}