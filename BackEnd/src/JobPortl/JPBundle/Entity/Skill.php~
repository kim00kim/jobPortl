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
	 * @ORM\ManyToOne(targetEntity="Category", inversedBy="skills")
	 * @ORM\JoinColumn(name="categoryId", referencedColumnName="categoryId", nullable=true, onDelete="CASCADE")
	 */
	protected $category;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->acquiredSkills = new \Doctrine\Common\Collections\ArrayCollection();
        $this->postings = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Add acquiredSkills
     *
     * @param \JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkills
     * @return Skill
     */
    public function addAcquiredSkill(\JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkills)
    {
        $this->acquiredSkills[] = $acquiredSkills;

        return $this;
    }

    /**
     * Remove acquiredSkills
     *
     * @param \JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkills
     */
    public function removeAcquiredSkill(\JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkills)
    {
        $this->acquiredSkills->removeElement($acquiredSkills);
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

    /**
     * Set category
     *
     * @param \JobPortl\JPBundle\Entity\Category $category
     * @return Skill
     */
    public function setCategory(\JobPortl\JPBundle\Entity\Category $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return \JobPortl\JPBundle\Entity\Category 
     */
    public function getCategory()
    {
        return $this->category;
    }
}
