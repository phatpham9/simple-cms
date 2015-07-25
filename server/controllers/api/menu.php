<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Menu extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//Load Dependencies
		$this->load->helper(array('form', 'url', 'string'));
		$this->load->library('form_validation');
		$this->load->model('model_menu');
		$this->load->library('tank_auth');
	}

	// List all your items
	public function all()
	{
		$result = array();

		$search = (null !== ($this->input->get("search"))) 	? $this->input->get("search") : '';
		$sort 	= (null !== ($this->input->get("sort"))) 	? $this->input->get("sort") : '-created';
		$skip 	= (null !== ($this->input->get("skip"))) 	? $this->input->get("skip") : 0;
		$limit 	= (null !== ($this->input->get("limit"))) 	? $this->input->get("limit") : 50;

		if (!is_null($menuList = $this->model_menu->getList($search,$sort,$skip,$limit)) ) {
			$result['code'] 	= 1;
			$result['message'] 	= 'all menu successfully';
			$result['data'] 	= $menuList;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		} else {
			$result['code'] = 0;
			$result['message'] = 'all menu error';

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
		if (!is_null($menuInfo = $this->model_menu->getDetails($id))) {
			$result['code'] 	= 1;
			$result['message'] 	= 'get menu successfully';
			$result['data'] 	= $menuInfo;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
		else 
		{
			$result['code'] 	= 0;
			$result['message'] 	= 'get menu error';
			
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

		$this->form_validation->set_rules('name', 'Name of menu', 'trim|required|min_length[2]|max_length[256]');
		$this->form_validation->set_rules('items', 'Items of menu', 'trim|required|min_length[2]');
		
		// validation ok
		if ($this->form_validation->run()) {
			$data['name']	= $this->input->post('name');
			$data['items'] 	= $this->input->post('items');
			
			// Insert to DB
			if (!is_null($menuInfo = $this->model_menu->create($data))) {
				$result['code'] 	= 1;
				$result['message'] 	= 'Create menu successfully';
				$result['data'] 	= $menuInfo;

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			// Insert to DB Fail
			else {
				$result['code'] 	= 0;
				$result['message'] 	= 'Create menu error';

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

	//Update one item
	public function update($id)
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

		$this->form_validation->set_rules('name', 'Name of menu', 'trim|required|min_length[2]|max_length[256]');
		$this->form_validation->set_rules('items', 'Items of menu', 'trim|required|min_length[2]');
		
		//check menu exist
		if($this->model_menu->checkMenuExist($id))
		{
			// validation ok
			if ($this->form_validation->run()) {
				$data['id']		= $id;
				$data['name']	= $this->input->post('name');
				$data['items'] 	= $this->input->post('items');
				
				// update to DB
				if (!is_null($this->model_menu->update($data))) {
					$result['code'] 	= 1;
					$result['message'] 	= 'Update menu successfully';
					$result['data'] 	= $this->model_menu->getDetails($data['id']);

					$this->output
					->set_status_header('200')
					->set_content_type('application/json')
					->set_output(json_encode($result));
				} 
				// update to DB Fail
				else {
					$result['code'] 	= 0;
					$result['message'] 	= 'Update menu error';

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
			$result['code'] 	= 0;
			$result['message'] 	= 'Menu ID is not existed';

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
		
		//check menu exist
		if($this->model_menu->checkMenuExist($id))
		{
			if (!is_null($this->model_menu->delete($id)))
			{
				$result['code'] 	= 1;
				$result['message'] 	= 'Delete menu successfully';

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			else 
			{
				$result['code'] 	= 0;
				$result['message'] 	= 'Delete menu error';

				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		}
		else {
			$result['code'] 	= 0;
			$result['message'] 	= 'Menu ID is not existed';

			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}	
	}
}

/* End of file menu.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/controllers/api/menu.php */
