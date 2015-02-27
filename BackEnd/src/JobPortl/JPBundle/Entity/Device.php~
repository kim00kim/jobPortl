<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Device
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\DeviceRepository")
 */
class Device
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
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255, unique=true)
	 */
	private $device;
	/**
	 * @var datetime
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $first;
	/**
	 * @var datetime
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $last;
	/**
	 * @ORM\OneToOne(targetEntity="UserJ", fetch="EXTRA_LAZY")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=FALSE)
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
     * Set first
     *
     * @param \DateTime $first
     * @return Device
     */
    public function setFirst($first)
    {
        $this->first = $first;

        return $this;
    }

    /**
     * Get first
     *
     * @return \DateTime 
     */
    public function getFirst()
    {
        return $this->first;
    }

    /**
     * Set last
     *
     * @param \DateTime $last
     * @return Device
     */
    public function setLast($last)
    {
        $this->last = $last;

        return $this;
    }

    /**
     * Get last
     *
     * @return \DateTime 
     */
    public function getLast()
    {
        return $this->last;
    }

    /**
     * Set user
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $user
     * @return Device
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

    /**
     * Set device
     *
     * @param string $device
     * @return Device
     */
    public function setDevice($device)
    {
        $this->device = $device;

        return $this;
    }

    /**
     * Get device
     *
     * @return string 
     */
    public function getDevice()
    {
        return $this->device;
    }
}
