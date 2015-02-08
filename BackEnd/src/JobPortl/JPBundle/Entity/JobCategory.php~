<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Exclude;
use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * JobCategory
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\JobCategoryRepository")
 */
class JobCategory
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="categoryId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $categoryId;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=100)
	 */
	private $categoryName;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $description;
	/**
	 * @ORM\OneToMany(targetEntity="Posting", mappedBy="jobCategory", fetch="EXTRA_LAZY")
	 */
	protected $postings;

	/**
	 * Get categoryId
	 *
	 * @return integer
	 */
	public function getCategoryId()
	{
		return $this->categoryId;
	}

	/**
	 * Set categoryName
	 *
	 * @param string $categoryName
	 * @return JobCategory
	 */
	public function setCategoryName($categoryName)
	{
		$this->categoryName = $categoryName;

		return $this;
	}

	/**
	 * Get categoryName
	 *
	 * @return string
	 */
	public function getCategoryName()
	{
		return $this->categoryName;
	}

	/**
	 * Set description
	 *
	 * @param string $description
	 * @return JobCategory
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
	 * Constructor
	 */
	public function __construct()
	{
		$this->skills = new \Doctrine\Common\Collections\ArrayCollection();
	}

	/**
	 * Add skills
	 *
	 * @param \JobPortl\JPBundle\Entity\Skill $skills
	 * @return JobCategory
	 */
	public function addSkill(\JobPortl\JPBundle\Entity\Skill $skills)
	{
		$this->skills[] = $skills;

		return $this;
	}

	/**
	 * Remove skills
	 *
	 * @param \JobPortl\JPBundle\Entity\Skill $skills
	 */
	public function removeSkill(\JobPortl\JPBundle\Entity\Skill $skills)
	{
		$this->skills->removeElement($skills);
	}

	/**
	 * Get skills
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getSkills()
	{
		return $this->skills;
	}

    /**
     * Add jobs
     *
     * @param \JobPortl\JPBundle\Entity\Job $jobs
     * @return JobCategory
     */
    public function addJob(\JobPortl\JPBundle\Entity\Job $jobs)
    {
        $this->jobs[] = $jobs;

        return $this;
    }

    /**
     * Remove jobs
     *
     * @param \JobPortl\JPBundle\Entity\Job $jobs
     */
    public function removeJob(\JobPortl\JPBundle\Entity\Job $jobs)
    {
        $this->jobs->removeElement($jobs);
    }

    /**
     * Get jobs
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getJobs()
    {
        return $this->jobs;
    }

    /**
     * Add postings
     *
     * @param \JobPortl\JPBundle\Entity\Posting $postings
     * @return JobCategory
     */
    public function addPosting(\JobPortl\JPBundle\Entity\Posting $postings)
    {
        $this->postings[] = $postings;

        return $this;
    }

    /**
     * Remove postings
     *
     * @param \JobPortl\JPBundle\Entity\Posting $postings
     */
    public function removePosting(\JobPortl\JPBundle\Entity\Posting $postings)
    {
        $this->postings->removeElement($postings);
    }

    /**
     * Get postings
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPostings()
    {
        return $this->postings;
    }
}
