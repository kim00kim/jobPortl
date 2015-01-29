<?php
namespace JobPortl\JPBundle\Service;

use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;
use JobPortl\JPBundle\Entity\UserAccount;


class Sha256Salted implements PasswordEncoderInterface
{

	public function encodePassword($raw, $salt)
	{
		return hash('sha256', $salt . $raw); // Custom function for password encrypt
	}

	public function isPasswordValid($encoded, $raw, $salt)
	{
		return $encoded === substr($this->encodePassword($raw, $salt), 0, 60) ;
	}

}