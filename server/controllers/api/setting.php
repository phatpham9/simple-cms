<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Setting extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//Load Dependencies
		$this->load->helper(array('form', 'url', 'string'));
		$this->load->library('form_validation');
		$this->load->model('model_setting');	
		$this->load->library('tank_auth');
	}

	// Get item details
	public function get($id)
	{
		$result = array();
		if (!is_null($settingInfo = $this->model_setting->getDetails($id))) 
		{
			$result['code'] 	= 1;
			$result['message'] 	= 'get setting successfully';
			$result['data'] 	= $settingInfo;

			$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
		}
		else
		{
			$result['code'] 	= 0;
			$result['message'] 	= 'get setting error';
			
			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output($this->model_setting->getDetails($id));
		}	
	}

	//Update one item
	public function update($id)
	{
		$data = array();
		$result = array();
		
		//Session is expired
		// if (!$this->tank_auth->is_logged_in()) {
		// 	$result['code'] 	= 0;
		// 	$result['message'] 	= 'Your Session is expried. Please login & try again';

		// 	$this->output
		// 		->set_status_header('403')
		// 		->set_content_type('application/json')
		// 		->set_output(json_encode($result));

		// 	return;
		// }
		$_POST = json_decode(file_get_contents("php://input"), true);
		$this->form_validation->set_rules('value', 'Value of id', 'trim|required');
		//check id exist
		if($this->model_setting->checkSettingExist($id))
		{
			// validation ok
			if ($this->form_validation->run()) 
			{

				$data['id']= $id;
				$data['value'] = $this->input->post('value');

				// update to DB
				if (!is_null($this->model_setting->update($data))) {
					$result['code'] 	= 1;
					$result['message'] 	= 'Update setting successfully';
					$result['data'] 	= $this->model_setting->getDetails($data['id']);

					$this->output
					->set_status_header('200')
					->set_content_type('application/json')
					->set_output(json_encode($data));
				} 
				// update to DB Fail
				else {
					print_r($validation_error());
					$result['code'] = 0;
					$result['message'] = 'Update setting error';

					$this->output
					->set_status_header('403')
					->set_content_type('application/json')
					->set_output(json_encode($result));
				}
			// validation fail
			} else {
				$result['code'] = 0;
				$result['message'] = "Yolo";
				
				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		}
		else {
			$result['code'] 	= 0;
			$result['message'] 	= 'id is not existed';

			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}
}

/* End of file setting.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/controllers/api/setting.php */
