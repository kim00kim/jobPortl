<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserConcern
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\UserConcernRepository")
 */
class UserConcern
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $id;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $type;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $description;
	/**
	 * @var datetime
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $sent;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="concerns", fetch="EXTRA_LAZY")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=FALSE)
	 */
	protected $user;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$this->setDatetimeSent(new \DateTime("now"));
	}

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
     * Set type
     *
     * @param integer $type
     * @return UserConcern
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
     * Set description
     *
     * @param string $description
     * @return UserConcern
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
     * Set sent
     *
     * @param \DateTime $sent
     * @return UserConcern
     */
    public function setSent($sent)
    {
        $this->sent = $sent;

        return $this;
    }

    /**
     * Get sent
     *
     * @return \DateTime 
     */
    public function getSent()
    {
        return $this->sent;
    }

    /**
     * Set user
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $user
     * @return UserConcern
     */
    public function setUser(\JobPortl\JPBundle\Entity\UserJ $user)
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
