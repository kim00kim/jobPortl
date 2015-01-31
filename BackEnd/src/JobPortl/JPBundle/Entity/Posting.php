<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Posting
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\PostingRepository")
 */
class Posting
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="postingId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $postingId;
	/**
	 * @var datetime
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $datetimePosted;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="postings")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId")
	 */
	protected $user;
	/**
	 * @ORM\OneToOne(targetEntity="Job")
	 * @ORM\JoinColumn(name="jobId", referencedColumnName="jobId", nullable=false)
	 */
	protected $job;
	/**
	 * @ORM\OneToMany(targetEntity="Application", mappedBy="posting", fetch="EXTRA_LAZY")
	 */
	protected $applications;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$this->applications = new \Doctrine\Common\Collections\ArrayCollection();
	}

	/**
	 * Set datetimePosted
	 *
	 * @param \DateTime $datetimePosted
	 * @return Posting
	 */
	public function setDatetimePosted($datetimePosted)
	{
		$this->datetimePosted = $datetimePosted;

		return $this;
	}

	/**
	 * Get datetimePosted
	 *
	 * @return \DateTime
	 */
	public function getDatetimePosted()
	{
		return $this->datetimePosted;
	}

	/**
	 * Set user
	 *
	 * @param \JobPortl\JPBundle\Entity\UserJ $user
	 * @return Posting
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
	 * Set job
	 *
	 * @param \JobPortl\JPBundle\Entity\Job $job
	 * @return Posting
	 */
	public function setJob(\JobPortl\JPBundle\Entity\Job $job)
	{
		$this->job = $job;

		return $this;
	}

	/**
	 * Get job
	 *
	 * @return \JobPortl\JPBundle\Entity\Job
	 */
	public function getJob()
	{
		return $this->job;
	}

	/**
	 * Add applications
	 *
	 * @param \JobPortl\JPBundle\Entity\Application $applications
	 * @return Posting
	 */
	public function addApplication(\JobPortl\JPBundle\Entity\Application $applications)
	{
		$this->applications[] = $applications;

		return $this;
	}

	/**
	 * Remove applications
	 *
	 * @param \JobPortl\JPBundle\Entity\Application $applications
	 */
	public function removeApplication(\JobPortl\JPBundle\Entity\Application $applications)
	{
		$this->applications->removeElement($applications);
	}

	/**
	 * Get applications
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getApplications()
	{
		return $this->applications;
	}

	/**
	 * Get postingId
	 *
	 * @return integer
	 */
	public function getPostingId()
	{
		return $this->postingId;
	}
}
