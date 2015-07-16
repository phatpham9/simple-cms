<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Frontend extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data = [
            'site_name'         => $this->config->item('site_name'),
            'site_title'        => $this->config->item('site_title'),
            'site_description'  => $this->config->item('site_description'),
            'keywords'          => $this->config->item('keywords'),
            'authors'           => $this->config->item('authors'),
            'content'           => 'Welcome to simple-cms homepage'
        ];
        $this->load->view('frontend/layout', $data);
    }
}
