<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Error extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//Load Dependencies
		$this->load->helper(array('url', 'string'));
	}

	public function error_404()
	{
		$result = array();
		$result['code'] 	= 0;
		$result['message'] 	= 'request not found';

		$this->output
		->set_status_header('404')
		->set_content_type('application/json')
		->set_output(json_encode($result));
	}
}