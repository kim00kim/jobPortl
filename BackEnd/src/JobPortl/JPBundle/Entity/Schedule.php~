<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Schedule
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\ScheduleRepository")
 */
class Schedule
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="scheduleId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $scheduleId;
	/**
	 * @var datetime
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $datetimeUnavailable;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="schedules")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=true)
	 */
	protected $user;

	/**
	 * Get scheduleId
	 *
	 * @return integer
	 */
	public function getScheduleId()
	{
		return $this->scheduleId;
	}

	/**
	 * Set datetimeUnavailable
	 *
	 * @param \DateTime $datetimeUnavailable
	 * @return Schedule
	 */
	public function setDatetimeUnavailable($datetimeUnavailable)
	{
		$this->datetimeUnavailable = $datetimeUnavailable;

		return $this;
	}

	/**
	 * Get datetimeUnavailable
	 *
	 * @return \DateTime
	 */
	public function getDatetimeUnavailable()
	{
		return $this->datetimeUnavailable;
	}

	/**
	 * Set user
	 *
	 * @param \JobPortl\JPBundle\Entity\UserJ $user
	 * @return Schedule
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
