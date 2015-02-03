<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserJ
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\UserJRepository")
 */
class UserJ
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="userId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $userId;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=60)
	 */
	private $firstName;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=60)
	 */
	private $lastName;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=60)
	 */
	private $address;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=30)
	 */
	private $cityMun;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $zipCode;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=6)
	 */
	private $gender;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="date")
	 */
	private $birthdate;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=12)
	 */
	private $cpNo;
	/**
	 * @var boolean
	 *
	 * @ORM\Column(type="boolean")
	 */
	private $hasVerifiedNumber = false;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255, nullable=true)
	 */
	private $photo;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255, options={"default"=" "})
	 */
	private $title;
	/**
	 * @ORM\OneToMany(targetEntity="Certification", mappedBy="user", fetch="EXTRA_LAZY")
	 */
	protected $certifications;
	/**
	 * @ORM\OneToMany(targetEntity="Language", mappedBy="user", fetch="EXTRA_LAZY")
	 */
	protected $languages;
	/**
	 * @ORM\OneToMany(targetEntity="AcquiredSkill", mappedBy="user", fetch="EXTRA_LAZY")
	 */
	protected $acquiredSkills;
	/**
	 * @ORM\OneToMany(targetEntity="Application", mappedBy="user", fetch="EXTRA_LAZY")
	 */
	protected $applications;
	/**
	 * @ORM\OneToMany(targetEntity="Posting", mappedBy="user")
	 */
	protected $postings;
	/**
	 * @ORM\OneToMany(targetEntity="Schedule", mappedBy="user")
	 */
	protected $schedules;

	/**
	 * Get userId
	 *
	 * @return integer
	 */
	public function getUserId()
	{
		return $this->userId;
	}

	/**
	 * Set firstName
	 *
	 * @param string $firstName
	 * @return UserJ
	 */
	public function setFirstName($firstName)
	{
		$this->firstName = $firstName;

		return $this;
	}

	/**
	 * Get firstName
	 *
	 * @return string
	 */
	public function getFirstName()
	{
		return $this->firstName;
	}

	/**
	 * Set lastName
	 *
	 * @param string $lastName
	 * @return UserJ
	 */
	public function setLastName($lastName)
	{
		$this->lastName = $lastName;

		return $this;
	}

	/**
	 * Get lastName
	 *
	 * @return string
	 */
	public function getLastName()
	{
		return $this->lastName;
	}

	/**
	 * Set address
	 *
	 * @param string $address
	 * @return UserJ
	 */
	public function setAddress($address)
	{
		$this->address = $address;

		return $this;
	}

	/**
	 * Get address
	 *
	 * @return string
	 */
	public function getAddress()
	{
		return $this->address;
	}

	/**
	 * Set cityMun
	 *
	 * @param string $cityMun
	 * @return UserJ
	 */
	public function setCityMun($cityMun)
	{
		$this->cityMun = $cityMun;

		return $this;
	}

	/**
	 * Get cityMun
	 *
	 * @return string
	 */
	public function getCityMun()
	{
		return $this->cityMun;
	}

	/**
	 * Set zipCode
	 *
	 * @param integer $zipCode
	 * @return UserJ
	 */
	public function setZipCode($zipCode)
	{
		$this->zipCode = $zipCode;

		return $this;
	}

	/**
	 * Get zipCode
	 *
	 * @return integer
	 */
	public function getZipCode()
	{
		return $this->zipCode;
	}

	/**
	 * Set gender
	 *
	 * @param string $gender
	 * @return UserJ
	 */
	public function setGender($gender)
	{
		$this->gender = $gender;

		return $this;
	}

	/**
	 * Get gender
	 *
	 * @return string
	 */
	public function getGender()
	{
		return $this->gender;
	}

	/**
	 * Set birthdate
	 *
	 * @param \DateTime $birthdate
	 * @return UserJ
	 */
	public function setBirthdate($birthdate)
	{
		$this->birthdate = $birthdate;

		return $this;
	}

	/**
	 * Get birthdate
	 *
	 * @return \DateTime
	 */
	public function getBirthdate()
	{
		return $this->birthdate;
	}

	/**
	 * Set cpNo
	 *
	 * @param string $cpNo
	 * @return UserJ
	 */
	public function setCpNo($cpNo)
	{
		$this->cpNo = $cpNo;

		return $this;
	}

	/**
	 * Get cpNo
	 *
	 * @return string
	 */
	public function getCpNo()
	{
		return $this->cpNo;
	}

	/**
	 * Set hasVerifiedNumber
	 *
	 * @param boolean $hasVerifiedNumber
	 * @return UserJ
	 */
	public function setHasVerifiedNumber($hasVerifiedNumber)
	{
		$this->hasVerifiedNumber = $hasVerifiedNumber;

		return $this;
	}

	/**
	 * Get hasVerifiedNumber
	 *
	 * @return boolean
	 */
	public function getHasVerifiedNumber()
	{
		return $this->hasVerifiedNumber;
	}

	/**
	 * Set photo
	 *
	 * @param string $photo
	 * @return UserJ
	 */
	public function setPhoto($photo)
	{
		$this->photo = $photo;

		return $this;
	}

	/**
	 * Get photo
	 *
	 * @return string
	 */
	public function getPhoto()
	{
		return $this->photo;
	}

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$this->certifications = new \Doctrine\Common\Collections\ArrayCollection();
	}

	/**
	 * Add certifications
	 *
	 * @param \JobPortl\JPBundle\Entity\Certification $certifications
	 * @return UserJ
	 */
	public function addCertification(\JobPortl\JPBundle\Entity\Certification $certifications)
	{
		$this->certifications[] = $certifications;

		return $this;
	}

	/**
	 * Remove certifications
	 *
	 * @param \JobPortl\JPBundle\Entity\Certification $certifications
	 */
	public function removeCertification(\JobPortl\JPBundle\Entity\Certification $certifications)
	{
		$this->certifications->removeElement($certifications);
	}

	/**
	 * Get certifications
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getCertifications()
	{
		return $this->certifications;
	}

	/**
	 * Add languages
	 *
	 * @param \JobPortl\JPBundle\Entity\Language $languages
	 * @return UserJ
	 */
	public function addLanguage(\JobPortl\JPBundle\Entity\Language $languages)
	{
		$this->languages[] = $languages;

		return $this;
	}

	/**
	 * Remove languages
	 *
	 * @param \JobPortl\JPBundle\Entity\Language $languages
	 */
	public function removeLanguage(\JobPortl\JPBundle\Entity\Language $languages)
	{
		$this->languages->removeElement($languages);
	}

	/**
	 * Get languages
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getLanguages()
	{
		return $this->languages;
	}

	/**
	 * Add acquiredSkills
	 *
	 * @param \JobPortl\JPBundle\Entity\AcquiredSkill $acquiredSkills
	 * @return UserJ
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
	 * Set application
	 *
	 * @param \JobPortl\JPBundle\Entity\Application $application
	 * @return UserJ
	 */
	public function setApplication(\JobPortl\JPBundle\Entity\Application $application)
	{
		$this->application = $application;

		return $this;
	}

	/**
	 * Get application
	 *
	 * @return \JobPortl\JPBundle\Entity\Application
	 */
	public function getApplication()
	{
		return $this->application;
	}

	/**
	 * Add postings
	 *
	 * @param \JobPortl\JPBundle\Entity\Posting $postings
	 * @return UserJ
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
	 * Add schedules
	 *
	 * @param \JobPortl\JPBundle\Entity\Schedule $schedules
	 * @return UserJ
	 */
	public function addSchedule(\JobPortl\JPBundle\Entity\Schedule $schedules)
	{
		$this->schedules[] = $schedules;

		return $this;
	}

	/**
	 * Remove schedules
	 *
	 * @param \JobPortl\JPBundle\Entity\Schedule $schedules
	 */
	public function removeSchedule(\JobPortl\JPBundle\Entity\Schedule $schedules)
	{
		$this->schedules->removeElement($schedules);
	}

	/**
	 * Get schedules
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getSchedules()
	{
		return $this->schedules;
	}

	/**
	 * Add applications
	 *
	 * @param \JobPortl\JPBundle\Entity\Application $applications
	 * @return UserJ
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
     * Set title
     *
     * @param string $title
     * @return UserJ
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
}
