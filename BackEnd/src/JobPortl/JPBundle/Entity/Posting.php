<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Exclude;

/**
 * Posting
 * @ExclusionPolicy("none")
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
	 * @ORM\Column(type="integer", options={"default"=1})
	 */
	private $status;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $available;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer", options={"default"=0}, nullable = true)
	 */
	private $type;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="postings", fetch="EXTRA_LAZY")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=true)
	 */
	protected $user;
	/**
	 * @Exclude
	 * @ORM\OneToMany(targetEntity="Application", mappedBy="posting", fetch="EXTRA_LAZY")
	 */
	protected $applications;
	/**
	 * @ORM\ManyToOne(targetEntity="Skill", inversedBy="postings", fetch="EXTRA_LAZY")
	 * @ORM\JoinColumn(name="skillId", referencedColumnName="skillId", nullable=true, onDelete="SET NULL")
	 */
	protected $skill;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->applications = new \Doctrine\Common\Collections\ArrayCollection();
		$this->setDatetimePosted(new \DateTime());
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
     * Set description
     *
     * @param string $description
     * @return Posting
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
     * @return Posting
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
     * @return Posting
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
     * @return Posting
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
     * Set available
     *
     * @param integer $available
     * @return Posting
     */
    public function setAvailable($available)
    {
        $this->available = $available;

        return $this;
    }

    /**
     * Get available
     *
     * @return integer 
     */
    public function getAvailable()
    {
        return $this->available;
    }

    /**
     * Set user
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $user
     * @return Posting
     */
    public function setUser(\JobPortl\JPBundle\Entity\UserJ $user = null)
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
     * Set skill
     *
     * @param \JobPortl\JPBundle\Entity\Skill $skill
     * @return Posting
     */
    public function setSkill(\JobPortl\JPBundle\Entity\Skill $skill = null)
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
     * Set type
     *
     * @param integer $type
     * @return Posting
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
}
