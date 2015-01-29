<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Certification
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\CertificationRepository")
 */
class Certification
{
    /**
     * @var integer
     *
     * @ORM\Column(name="certificationId", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $description;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=100)
	 */
	private $controlNo;
	/**
	 * @var boolean
	 *
	 * @ORM\Column(type="boolean")
	 */
	private $isValid = false;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="certifications")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId")
	 */
	protected  $user;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Certification
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set controlNo
     *
     * @param string $controlNo
     * @return Certification
     */
    public function setControlNo($controlNo)
    {
        $this->controlNo = $controlNo;

        return $this;
    }

    /**
     * Get controlNo
     *
     * @return string 
     */
    public function getControlNo()
    {
        return $this->controlNo;
    }

    /**
     * Set isValid
     *
     * @param boolean $isValid
     * @return Certification
     */
    public function setIsValid($isValid)
    {
        $this->isValid = $isValid;

        return $this;
    }

    /**
     * Get isValid
     *
     * @return boolean 
     */
    public function getIsValid()
    {
        return $this->isValid;
    }

    /**
     * Set user
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $user
     * @return Certification
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
}
