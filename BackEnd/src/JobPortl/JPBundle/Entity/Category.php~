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
 * Category
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\CategoryRepository")
 */
class Category
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
	 * @ORM\OneToMany(targetEntity="Skill", mappedBy="category", fetch="EXTRA_LAZY")
	 */
	protected $skills;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->skills = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * @return Category
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
     * @return Category
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
     * Add skills
     *
     * @param \JobPortl\JPBundle\Entity\Skill $skills
     * @return Category
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
}
