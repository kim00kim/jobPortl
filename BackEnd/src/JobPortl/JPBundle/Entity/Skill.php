<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Skill
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\SkillRepository")
 */
class Skill
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="skillId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $skillId;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=50)
	 */
	private $skillName;
	/**
	 * @ORM\OneToMany(targetEntity="AcquiredSkill", mappedBy="skill", fetch="EXTRA_LAZY")
	 */
	protected $acquiredSkills;
	/**
	 * @ORM\OneToMany(targetEntity="Posting", mappedBy="skill", fetch="EXTRA_LAZY")
	 */
	protected $postings;

	/**
	 * Get skillId
	 *
	 * @return integer
	 */
	public function getSkillId()
	{
		return $this->skillId;
	}

	/**
	 * Set skillName
	 *
	 * @param string $skillName
	 * @return Skill
	 */
	public function setSkillName($skillName)
	{
		$this->skillName = $skillName;

		return $this;
	}

	/**
	 * Get skillName
	 *
	 * @return string
	 */
	public function getSkillName()
	{
		return $this->skillName;
	}

	/**
	 * Set jobCategory
	 *
	 * @param \JobPortl\JPBundle\Entity\JobCategory $jobCategory
	 * @return Skill
	 */
	public function setJobCategory(\JobPortl\JPBundle\Entity\JobCategory $jobCategory = null)
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

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$this->acquiredSkill = new \Doctrine\Common\Collections\ArrayCollection();
	}

	/**
	 * Add acquiredSkill
	 *
	 * @param \JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkill
	 * @return Skill
	 */
	public function addAcquiredSkill(\JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkill)
	{
		$this->acquiredSkill[] = $acquiredSkill;

		return $this;
	}

	/**
	 * Remove acquiredSkill
	 *
	 * @param \JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkill
	 */
	public function removeAcquiredSkill(\JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkill)
	{
		$this->acquiredSkill->removeElement($acquiredSkill);
	}

	/**
	 * Get acquiredSkill
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getAcquiredSkill()
	{
		return $this->acquiredSkill;
	}

	/**
	 * Get acquiredSkills
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getAcquiredSkills()
	{
		return $this->acquiredSkills;
	}

    /**
     * Add postings
     *
     * @param \JobPortl\JPBundle\Entity\Posting $postings
     * @return Skill
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
