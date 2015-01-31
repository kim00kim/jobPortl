<?php

namespace JobPortl\JPBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
	public function indexAction($name)
	{
		return $this->render('JobPortlJPBundle:Default:index.html.twig', array('name' => $name));
	}
}
