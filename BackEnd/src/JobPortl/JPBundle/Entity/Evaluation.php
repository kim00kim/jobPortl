<?php

namespace JobPortl\JPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Evaluation
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="JobPortl\JPBundle\Entity\EvaluationRepository")
 */
class Evaluation
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="evaluationId", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $evaluationId;
	/**
	 * @var integer
	 *
	 * @ORM\Column(type="integer")
	 */
	private $rating;
	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255, nullable=true)
	 */
	private $comment;
	/**
	 * @var datetime
	 *
	 * @ORM\Column(type="datetime")
	 */
	private $datetimeEvaluated;
	/**
	 * @ORM\OneToMany(targetEntity="Application", mappedBy="evaluation")
	 */
	protected $applications;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$this->applications = new \Doctrine\Common\Collections\ArrayCollection();
	}

	/**
	 * Get evaluationId
	 *
	 * @return integer
	 */
	public function getEvaluationId()
	{
		return $this->evaluationId;
	}

	/**
	 * Set rating
	 *
	 * @param integer $rating
	 * @return Evaluation
	 */
	public function setRating($rating)
	{
		$this->rating = $rating;

		return $this;
	}

	/**
	 * Get rating
	 *
	 * @return integer
	 */
	public function getRating()
	{
		return $this->rating;
	}

	/**
	 * Set comment
	 *
	 * @param string $comment
	 * @return Evaluation
	 */
	public function setComment($comment)
	{
		$this->comment = $comment;

		return $this;
	}

	/**
	 * Get comment
	 *
	 * @return string
	 */
	public function getComment()
	{
		return $this->comment;
	}

	/**
	 * Set datetimeEvaluated
	 *
	 * @param \DateTime $datetimeEvaluated
	 * @return Evaluation
	 */
	public function setDatetimeEvaluated($datetimeEvaluated)
	{
		$this->datetimeEvaluated = $datetimeEvaluated;

		return $this;
	}

	/**
	 * Get datetimeEvaluated
	 *
	 * @return \DateTime
	 */
	public function getDatetimeEvaluated()
	{
		return $this->datetimeEvaluated;
	}

	/**
	 * Add applications
	 *
	 * @param \JobPortl\JPBundle\Entity\Application $applications
	 * @return Evaluation
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
}
