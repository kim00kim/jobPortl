<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Admin
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\AdminRepository")
 */
class Admin
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="adminId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $adminId;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=60)
	 */
	private $userName;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=50)
	 */
	private $password;

	/**
	 * Get adminId
	 *
	 * @return integer
	 */
	public function getAdminId()
	{
		return $this->adminId;
	}

	/**
	 * Set userName
	 *
	 * @param string $userName
	 * @return Admin
	 */
	public function setUserName($userName)
	{
		$this->userName = $userName;

		return $this;
	}

	/**
	 * Get userName
	 *
	 * @return string
	 */
	public function getUserName()
	{
		return $this->userName;
	}

	/**
	 * Set password
	 *
	 * @param string $password
	 * @return Admin
	 */
	public function setPassword($password)
	{
		$this->password = $password;

		return $this;
	}

	/**
	 * Get password
	 *
	 * @return string
	 */
	public function getPassword()
	{
		return $this->password;
	}
}
