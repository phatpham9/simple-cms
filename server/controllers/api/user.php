<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//Load Dependencies
		$this->load->helper(array('form', 'url', 'string'));
		$this->load->library('form_validation');
		$this->load->model('model_user');
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

		if (!is_null($userList = $this->model_user->getList($search,$sort,$skip,$limit)) ) {
			$result['code'] 	= 1;
			$result['message'] 	= 'all user successfully';
			$result['data'] 	= $userList;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));

		} else {
			$result['code'] 	= 0;
			$result['message'] 	= 'all user error';
			
			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}

	// Get item details
	public function get($id)
	{
		$query = !empty($this->input->get('query')) ? json_decode($this->input->get('query'))->email : '';
		$result = array();
		if (!is_null($userInfo = $this->model_user->getDetails($id,$query))) {
			$result['code'] 	= 1;
			$result['message'] 	= 'get user successfully';
			$result['data'] 	= $userInfo;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		} 
		else 
		{
			$result['code'] 	= 0;
			$result['message'] 	= 'get user error';
			
			$this->output
			->set_status_header('200')
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
		$_POST = json_decode(file_get_contents("php://input"), true);
		$this->form_validation->set_rules('email', 'Email', 'trim|required|xss_clean|valid_email');
		$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean');
		
		
		// validation ok
		if ($this->form_validation->run()) {

			$data['email'] = $this->input->post('email');
			$data['password'] = $this->tank_auth->hash_password($this->input->post('password'));
			$data['isEnabled'] = $this->input->post('isEnabled');
				
			// Insert to DB			
			if (!is_null($userInfo = $this->model_user->create($data))) {
				$result['code'] 	= 1;
				$result['message'] 	= 'Create user successfully';
				$result['data'] 	= $userInfo;

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			// Insert to DB Fail
			else {
				$errors = $this->tank_auth->get_error_message();
					foreach ($errors as $k => $v)	$result['errors'][$k] = $this->lang->line($v);

				$result['code'] 	= 0;
				$result['message']	= 'Create user error';

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
		if (!$this->tank_auth->is_logged_in()) {/**/
			$result['code'] = 0;
			$result['message'] = 'Your Session is expried. Please login & try again';

			$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));

			return;
		}
		$_POST = json_decode(file_get_contents("php://input"), true);
		$this->form_validation->set_rules('email', 'Email', 'trim|required|xss_clean|valid_email');
		$this->form_validation->set_rules('password', 'Password', 'trim|xss_clean');
		
		//check user exist
		if($this->model_user->checkUserExist($id))
		{	
			// validation ok
			if ($this->form_validation->run()) {
				$data['id'] = $id;
				$data['email'] = $this->input->post('email');
				!empty($this->input->post('password')) ? $data['password'] = $this->tank_auth->hash_password($this->input->post('password')) : '';
				$data['isEnabled']	= $this->input->post('isEnabled');

				// update to DB
				if (!is_null($this->model_user->update($data))) {
					$result['code'] 	= 1;
					$result['message'] 	= 'Update user successfully';
					$result['data'] 	= $this->model_user->getDetails($data['id'],'');
					
					$this->output
					->set_status_header('200')
					->set_content_type('application/json')
					->set_output(json_encode($result));
				} 
				// update to DB Fail
				else {
					$result['code'] = 0;
					$result['message'] = 'Update user error';

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
			$result['message'] = 'user ID is not existed';

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

		//check user exist
		if($this->model_user->checkUserExist($id))
		{	
			if (!is_null($this->model_user->delete($id)))
			{
				$result['code'] 	= 1;
				$result['message'] 	= 'Delete user successfully';

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			else 
			{
				$result['code'] 	= 0;
				$result['message'] 	= 'Delete user error';

				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		}
		else {
			$result['code'] = 0;
			$result['message'] = 'user ID is not existed';

			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}
}

/* End of file user.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/controllers/api/user.php */
