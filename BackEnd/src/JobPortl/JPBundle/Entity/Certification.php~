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
	 * @ORM\Column(name="id", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $id;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $qualification;
	/**
	 * @var datetime
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $issued;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=100, nullable=true)
	 */
	private $control;
	/**
	 * @var boolean
	 *
	 * @ORM\Column(type="boolean", options={"default"=false})
	 */
	private $valid;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=27)
	 */
	private $type;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="certifications", fetch="EXTRA_LAZY")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=true)
	 */
	protected $user;

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
     * Set qualification
     *
     * @param string $qualification
     * @return Certification
     */
    public function setQualification($qualification)
    {
        $this->qualification = $qualification;

        return $this;
    }

    /**
     * Get qualification
     *
     * @return string 
     */
    public function getQualification()
    {
        return $this->qualification;
    }

    /**
     * Set issued
     *
     * @param \DateTime $issued
     * @return Certification
     */
    public function setIssued($issued)
    {
        $this->issued = $issued;

        return $this;
    }

    /**
     * Get issued
     *
     * @return \DateTime 
     */
    public function getIssued()
    {
        return $this->issued;
    }

    /**
     * Set control
     *
     * @param string $control
     * @return Certification
     */
    public function setControl($control)
    {
        $this->control = $control;

        return $this;
    }

    /**
     * Get control
     *
     * @return string 
     */
    public function getControl()
    {
        return $this->control;
    }

    /**
     * Set valid
     *
     * @param boolean $valid
     * @return Certification
     */
    public function setValid($valid)
    {
        $this->valid = $valid;

        return $this;
    }

    /**
     * Get valid
     *
     * @return boolean 
     */
    public function getValid()
    {
        return $this->valid;
    }

    /**
     * Set type
     *
     * @param integer $type
     * @return Certification
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return integer 
     */
    public function getType()
    {
        return $this->type;
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
