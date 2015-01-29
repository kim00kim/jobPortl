<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AcquiredSkill
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\AcquiredSkillRepository")
 */
class AcquiredSkill
{
    /**
     * @var integer
     *
     * @ORM\Column(name="asId", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $asId;
	/**
	 * @ORM\ManyToOne(targetEntity="Skill", inversedBy="acquiredSkills")
	 * @ORM\JoinColumn(name="skillId", referencedColumnName="skillId", nullable=FALSE)
	 */
	protected $skill;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="acquiredSkills")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId")
	 */
	protected $user;

    /**
     * Get asId
     *
     * @return integer 
     */
    public function getAsId()
    {
        return $this->asId;
    }

    /**
     * Set skill
     *
     * @param \JobPortl\JPBundle\Entity\Skill $skill
     * @return AcquiredSkill
     */
    public function setSkill(\JobPortl\JPBundle\Entity\Skill $skill)
    {
        $this->skill = $skill;

        return $this;
    }

    /**
     * Get skill
     *
     * @return \JobPortl\JPBundle\Entity\Skill 
     */
    public function getSkill()
    {
        return $this->skill;
    }

    /**
     * Set user
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $user
     * @return AcquiredSkill
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
