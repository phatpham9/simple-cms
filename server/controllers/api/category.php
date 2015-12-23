<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Category extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//Load Dependencies
		$this->load->helper(array('form', 'url', 'string'));
		$this->load->library('form_validation');
		$this->load->model('model_category');
		$this->load->library('tank_auth');
	}

	// List all your items
	public function all()
	{
		$result = array();

		$search = !empty($this->input->get("search")) 	? $this->input->get("search") 	: '';
		$sort 	= !empty($this->input->get("sort")) 	? $this->input->get("sort") 	: '-created';
		$skip 	= !empty($this->input->get("skip")) 	? $this->input->get("skip") 	: 0;
		$limit 	= !empty($this->input->get("limit")) ? $this->input->get("limit") 	: 50;

		if (!is_null($categoryList = $this->model_category->getList($search,$sort,$skip,$limit)) ) {
			$result['code'] 	= 1;
			$result['message'] 	= 'all category successfully';
			$result['data'] 	= $categoryList;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));

		} else {
			$result['code'] 	= 0;
			$result['message'] 	= 'all category error';
			
			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}

	// Get item details
	public function get($id)
	{
		$result = array();
		if (!is_null($categoryInfo = $this->model_category->getDetails($id))) {
			$result['code'] 	= 1;
			$result['message'] 	= 'get category successfully';
			$result['data'] 	= $categoryInfo;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		} 
		else 
		{
			$result['code'] 	= 0;
			$result['message'] 	= 'get category error';
			
			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}

	// Add a new item
	public function create()
	{
		$data = array();
		$result = array();
		
		//Session is expired
		if (!$this->tank_auth->is_logged_in()) {
			$result['code'] 	= 0;
			$result['message'] 	= 'Your Session is expried. Please login & try again';

			$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));

			return;
		}

		$this->form_validation->set_rules('name', 'Name', 'trim|required|min_length[2]|max_length[256]');
		$this->form_validation->set_rules('slug', 'Slug', 'trim|required|min_length[2]');
		$this->form_validation->set_rules('description', 'Description', 'trim|required|min_length[2]');
		$this->form_validation->set_rules('parent', 'Parent', 'trim|required|min_length[2]');
		
		
		// validation ok
		if ($this->form_validation->run()) {
			$data['name']			= $this->input->post('name');
			$data['slug'] 			= $this->input->post('slug');
			$data['description']	= $this->input->post('description');
			$data['parent']			= $this->input->post('parent');
			
			// Insert to DB
			if (!is_null($categoryInfo = $this->model_category->create($data))) {
				$result['code'] 	= 1;
				$result['message'] 	= 'Create category successfully';
				$result['data'] 	= $categoryInfo;

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			// Insert to DB Fail
			else {
				$result['code'] 	= 0;
				$result['message']	= 'Create category error';

				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		// validation fail
		} else {
			$result['code'] 	= 0;
			$result['message']	= validation_errors();
			
			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}

	//Update one item
	public function update($id)
	{
		$data = array();
		$result = array();
		
		//Session is expired
		if (!$this->tank_auth->is_logged_in()) {
			$result['code'] = 0;
			$result['message'] = 'Your Session is expried. Please login & try again';

			$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));

			return;
		}

		$this->form_validation->set_rules('name', 'Name', 'trim|required|min_length[2]|max_length[256]');
		$this->form_validation->set_rules('slug', 'Slug', 'trim|required|min_length[2]');
		$this->form_validation->set_rules('description', 'Description', 'trim|required|min_length[2]');
		$this->form_validation->set_rules('parent', 'Parent', 'trim|required|min_length[2]');
		
		//check category exist
		if($this->model_category->checkCategoryExist($id))
		{	
			// validation ok
			if ($this->form_validation->run()) {
				$data['id']				= $id;
				$data['name']			= $this->form_validation->set_value('name');
				$data['slug'] 			= $this->form_validation->set_value('slug');
				$data['description']	= $this->form_validation->set_value('description');
				$data['parent']			= $this->form_validation->set_value('parent');
				
				// update to DB
				if (!is_null($this->model_category->update($data))) {
					$result['code'] 	= 1;
					$result['message'] 	= 'Update category successfully';
					$result['data'] 	= $this->model_category->getDetails($data['id']);
					
					$this->output
					->set_status_header('200')
					->set_content_type('application/json')
					->set_output(json_encode($result));
				} 
				// update to DB Fail
				else {
					$result['code'] = 0;
					$result['message'] = 'Update category error';

					$this->output
					->set_status_header('403')
					->set_content_type('application/json')
					->set_output(json_encode($result));
				}
			// validation fail
			} else {
				$result['code'] 	= 0;
				$result['message'] 	= validation_errors();

				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		}
		else {
			$result['code'] = 0;
			$result['message'] = 'Category ID is not existed';

			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}

	//Delete one item
	public function delete($id)
	{
		$result = array();
		
		//Session is expired
		if (!$this->tank_auth->is_logged_in()) {
			$result['code'] 	= 0;
			$result['message'] 	= 'Your Session is expried. Please login & try again';

			$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));

			return;
		}

		//check category exist
		if($this->model_category->checkCategoryExist($id))
		{	
			if (!is_null($this->model_category->delete($id)))
			{
				$result['code'] 	= 1;
				$result['message'] 	= 'Delete category successfully';

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			else 
			{
				$result['code'] 	= 0;
				$result['message'] 	= 'Delete category error';

				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		}
		else {
			$result['code'] = 0;
			$result['message'] = 'Category ID is not existed';

			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}
}

/* End of file category.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/controllers/api/category.php */
