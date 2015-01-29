<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Application
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\ApplicationRepository")
 */
class Application
{
    /**
     * @var integer
     *
     * @ORM\Column(name="appId", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $appId;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $status;
	/**
	 * @var datetime;
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $datetimeApplied;
	/**
	 * @ORM\ManyToOne(targetEntity="Posting", inversedBy="applications")
	 * @ORM\JoinColumn(name="postingId", referencedColumnName="postingId", nullable=FALSE)
	 */
	protected $posting;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="applications")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=FALSE)
	 */
	protected $user;
	/**
	 * @ORM\ManyToOne(targetEntity="Evaluation", inversedBy="applications")
	 * @ORM\JoinColumn(name="evaluationId", referencedColumnName="evaluationId", nullable=FALSE)
	 */
	protected $evaluation;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get appId
     *
     * @return integer 
     */
    public function getAppId()
    {
        return $this->appId;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return Application
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
     * Set datetimeApplied
     *
     * @param \DateTime $datetimeApplied
     * @return Application
     */
    public function setDatetimeApplied($datetimeApplied)
    {
        $this->datetimeApplied = $datetimeApplied;

        return $this;
    }

    /**
     * Get datetimeApplied
     *
     * @return \DateTime 
     */
    public function getDatetimeApplied()
    {
        return $this->datetimeApplied;
    }

    /**
     * Set posting
     *
     * @param \JobPortl\JPBundle\Entity\Posting $posting
     * @return Application
     */
    public function setPosting(\JobPortl\JPBundle\Entity\Posting $posting)
    {
        $this->posting = $posting;

        return $this;
    }

    /**
     * Get posting
     *
     * @return \JobPortl\JPBundle\Entity\Posting 
     */
    public function getPosting()
    {
        return $this->posting;
    }

    /**
     * Add users
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $users
     * @return Application
     */
    public function addUser(\JobPortl\JPBundle\Entity\UserJ $users)
    {
        $this->users[] = $users;

        return $this;
    }

    /**
     * Remove users
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $users
     */
    public function removeUser(\JobPortl\JPBundle\Entity\UserJ $users)
    {
        $this->users->removeElement($users);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * Set evaluation
     *
     * @param \JobPortl\JPBundle\Entity\Evaluation $evaluation
     * @return Application
     */
    public function setEvaluation(\JobPortl\JPBundle\Entity\Evaluation $evaluation)
    {
        $this->evaluation = $evaluation;

        return $this;
    }

    /**
     * Get evaluation
     *
     * @return \JobPortl\JPBundle\Entity\Evaluation 
     */
    public function getEvaluation()
    {
        return $this->evaluation;
    }

    /**
     * Set user
     *
     * @param \JobPortl\JPBundle\Entity\UserJ $user
     * @return Application
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
