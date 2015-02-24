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
	 * @var boolean;
	 *
	 * @ORM\Column(type="boolean", options={"default"=false})
	 */
	private $isEvaluated = false;
	/**
	 * @ORM\ManyToOne(targetEntity="Posting", inversedBy="applications")
	 * @ORM\JoinColumn(name="postingId", referencedColumnName="postingId", nullable=true)
	 */
	protected $posting;
	/**
	 * @ORM\ManyToOne(targetEntity="UserJ", inversedBy="applications" ,fetch="EXTRA_LAZY")
	 * @ORM\JoinColumn(name="userId", referencedColumnName="userId", nullable=true)
	 */
	protected $user;
	/**
	 * @ORM\OneToMany(targetEntity="Evaluation", mappedBy="application", fetch="EXTRA_LAZY", fetch="EXTRA_LAZY")
	 */
	protected $evaluations;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$this->users = new \Doctrine\Common\Collections\ArrayCollection();
		$this->setDatetimeApplied(new \DateTime("now"));
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

    /**
     * Add evaluations
     *
     * @param \JobPortl\JPBundle\Entity\Evaluation $evaluations
     * @return Application
     */
    public function addEvaluation(\JobPortl\JPBundle\Entity\Evaluation $evaluations)
    {
        $this->evaluations[] = $evaluations;

        return $this;
    }

    /**
     * Remove evaluations
     *
     * @param \JobPortl\JPBundle\Entity\Evaluation $evaluations
     */
    public function removeEvaluation(\JobPortl\JPBundle\Entity\Evaluation $evaluations)
    {
        $this->evaluations->removeElement($evaluations);
    }

    /**
     * Get evaluations
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getEvaluations()
    {
        return $this->evaluations;
    }

    /**
     * Set isEvaluated
     *
     * @param boolean $isEvaluated
     * @return Application
     */
    public function setIsEvaluated($isEvaluated)
    {
        $this->isEvaluated = $isEvaluated;

        return $this;
    }

    /**
     * Get isEvaluated
     *
     * @return boolean 
     */
    public function getIsEvaluated()
    {
        return $this->isEvaluated;
    }
}
