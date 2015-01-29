<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JobPortl\JPBundle\Service\Sha256Salted;

/**
 * UserAccount
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\UserAccountRepository")
 */
class UserAccount
{
    /**
     * @var integer
     *
     * @ORM\Column(name="userAccId", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $userAccId;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255, unique=true)
	 */
	private $email;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=60, nullable=true)
	 */
	private $password;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $userAccType;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $userType;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $salt;
	/**
	 * @ORM\OneToOne(targetEntity="UserJ")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=FALSE)
	 *
	 */
	protected $user;

    /**
     * Get userAccId
     *
     * @return integer 
     */
    public function getUserAccId()
    {
        return $this->userAccId;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return UserAccount
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return UserAccount
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

    /**
     * Set userAccType
     *
     * @param integer $userAccType
     * @return UserAccount
     */
    public function setUserAccType($userAccType)
    {
        $this->userAccType = $userAccType;

        return $this;
    }

    /**
     * Get userAccType
     *
     * @return integer 
     */
    public function getUserAccType()
    {
        return $this->userAccType;
    }

    /**
     * Set userType
     *
     * @param integer $userType
     * @return UserAccount
     */
    public function setUserType($userType)
    {
        $this->userType = $userType;

        return $this;
    }

    /**
     * Get userType
     *
     * @return integer 
     */
    public function getUserType()
    {
        return $this->userType;
    }

    /**
     * Set user
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $user
     * @return UserAccount
     */
    public function setUser(\JobPortl\JPBundle\Entity\UserJ $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \JobPortl\JPBundle\Entity\UserJ 
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set salt
     *
     * @param string $salt
     * @return UserAccount
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }

    /**
     * Get salt
     *
     * @return string 
     */
    public function getSalt()
    {
        return $this->salt;
    }
}
