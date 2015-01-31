<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Job
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\JobRepository")
 */
class Job
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="jobId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $jobId;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=60)
	 */
	private $title;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $description;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $location;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $requiredApplicant;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $status;
	/**
	 * @ORM\OneToOne(targetEntity="JobCategory")
	 * @ORM\JoinColumn(name="jobCategoryId", referencedColumnName="categoryId", nullable=FALSE)
	 */
	protected $jobCategory;

	/**
	 * Get jobId
	 *
	 * @return integer
	 */
	public function getJobId()
	{
		return $this->jobId;
	}

	/**
	 * Set title
	 *
	 * @param string $title
	 * @return Job
	 */
	public function setTitle($title)
	{
		$this->title = $title;

		return $this;
	}

	/**
	 * Get title
	 *
	 * @return string
	 */
	public function getTitle()
	{
		return $this->title;
	}

	/**
	 * Set description
	 *
	 * @param string $description
	 * @return Job
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
	 * Set location
	 *
	 * @param string $location
	 * @return Job
	 */
	public function setLocation($location)
	{
		$this->location = $location;

		return $this;
	}

	/**
	 * Get location
	 *
	 * @return string
	 */
	public function getLocation()
	{
		return $this->location;
	}

	/**
	 * Set requiredApplicant
	 *
	 * @param integer $requiredApplicant
	 * @return Job
	 */
	public function setRequiredApplicant($requiredApplicant)
	{
		$this->requiredApplicant = $requiredApplicant;

		return $this;
	}

	/**
	 * Get requiredApplicant
	 *
	 * @return integer
	 */
	public function getRequiredApplicant()
	{
		return $this->requiredApplicant;
	}

	/**
	 * Set status
	 *
	 * @param integer $status
	 * @return Job
	 */
	public function setStatus($status)
	{
		$this->status = $status;

		return $this;
	}

	/**
	 * Get status
	 *
	 * @return integer
	 */
	public function getStatus()
	{
		return $this->status;
	}

	/**
	 * Set jobCategory
	 *
	 * @param \JobPortl\JPBundle\Entity\JobCategory $jobCategory
	 * @return Job
	 */
	public function setJobCategory(\JobPortl\JPBundle\Entity\JobCategory $jobCategory)
	{
		$this->jobCategory = $jobCategory;

		return $this;
	}

	/**
	 * Get jobCategory
	 *
	 * @return \JobPortl\JPBundle\Entity\JobCategory
	 */
	public function getJobCategory()
	{
		return $this->jobCategory;
	}
}
