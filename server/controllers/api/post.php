<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Post extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//Load Dependencies
		$this->load->helper(array('form', 'url', 'string'));
		$this->load->library('form_validation');
		$this->load->model('model_post');
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

		if (!is_null($postList = $this->model_post->getList($search,$sort,$skip,$limit)) ) {
			$result['code'] = 1;
			$result['message'] = 'all post successfully';
			$result['data'] = $postList;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));

		} else {
			$result['code'] = 0;
			$result['message'] = 'all post error';
			
			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}

	// Get item details
	public function get($id)
	{
		$query = !empty($this->input->get('query')) ? $this->input->get('query') : '';
		$query ? json_decode($query)->slug : '';
		$result = array();
		if (!is_null($postInfo = $this->model_post->getDetails($id,$query))) {
			$result['code'] = 1;
			$result['message'] = 'get post successfully';
			$result['data'] = $postInfo;

			$this->output
			->set_status_header('200')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		} 
		else 
		{
			$result['code'] = 0;
			$result['message'] = 'get post error';
			
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
			$result['code'] = 0;
			$result['message'] = 'Your Session is expried. Please login & try again';

			$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));

			return;
		}
		$_POST = json_decode(file_get_contents("php://input"), true);
		$this->form_validation->set_rules('title', 'Title', 'trim|required|min_length[2]|max_length[256]');
		$this->form_validation->set_rules('slug', 'Slug', 'trim|required|min_length[2]');
		$this->form_validation->set_rules('content', 'Content', 'trim|required|min_length[2]');
		// validation ok
		if ($this->form_validation->run() == TRUE) {
			$data['title']			= $this->input->post('title');
			$data['slug'] 			= $this->input->post('slug');
			$data['description']	= $this->input->post('briefIntroduction');
			$data['content']		= $this->input->post('content');
			$data['author'] 		= $this->input->post('author');
			$data['isStaticPage']	= $this->input->post('isStaticPage');
			$data['isPublished']	= $this->input->post('isPublished');
			$data['date']			= $this->input->post('date');
			
			// Insert to DB
			if (!is_null($postInfo = $this->model_post->create($data))) {
				$result['code'] = 1;
				$result['message'] = 'Create post successfully';
				$result['data'] = $postInfo;

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			// Insert to DB Fail
			else {
				$result['code'] = 0;
				$result['message'] = 'Create post error';

				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		// validation fail
		} else {
			$result['code'] = 0;
			$result['message'] = validation_errors();
			
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
		$_POST = json_decode(file_get_contents("php://input"), true);
		$this->form_validation->set_rules('title', 'Title', 'trim|required|min_length[2]|max_length[256]');
		$this->form_validation->set_rules('slug', 'Slug', 'trim|required|min_length[2]');
		//$this->form_validation->set_rules('description', 'Description', 'trim|required|min_length[2]');
		$this->form_validation->set_rules('content', 'Content', 'trim|required|min_length[2]');
		// $this->form_validation->set_rules('author', 'Author', 'trim|required|min_length[2]');
		// $this->form_validation->set_rules('isStaticPage', 'Static page', 'trim|required');
		// $this->form_validation->set_rules('isPublished', 'Published', 'trim|required');
		// $this->form_validation->set_rules('date', 'Date', 'trim|required');
		
		//check post exist
		if($this->model_post->checkPostExist($id))
		{
			// validation ok
			if ($this->form_validation->run()) {
				$data['id']				= $id;
				$data['title']			= $this->input->post('title');
				$data['slug'] 			= $this->input->post('slug');
				$data['description']	= $this->input->post('description');
				$data['content']		= $this->input->post('content');
				$data['author'] 		= $this->input->post('author');
				$data['isStaticPage']	= $this->input->post('isStaticPage');
				$data['isPublished'] 	= $this->input->post('isPublished');
				$data['date'] 		 	= $this->input->post('date');

				// Update to DB
				if (!is_null($this->model_post->update($data))) {
					$result['code'] 	= 1;
					$result['message'] 	= 'Update post successfully';
					$result['data'] 	= $this->model_post->getDetails($data['id']);

					$this->output
					->set_status_header('200')
					->set_content_type('application/json')
					->set_output(json_encode($result));
				} 
				// Update to DB Fail
				else 
				{
					$result['code'] 	= 0;
					$result['message'] 	= 'Update post error';

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
		else 
		{
			$result['code'] 	= 0;
			$result['message'] 	= 'Post ID is not existed';
			
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

		//check post exist
		if($this->model_post->checkPostExist($id))
		{
			if (!is_null($this->model_post->delete($id)))
			{
				$result['code'] 	= 1;
				$result['message'] 	= 'Delete post successfully';

				$this->output
				->set_status_header('200')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			} 
			else 
			{
				$result['code'] 	= 0;
				$result['message'] 	= 'Delete post error';

				$this->output
				->set_status_header('403')
				->set_content_type('application/json')
				->set_output(json_encode($result));
			}
		}
		else 
		{
			$result['code'] 	= 0;
			$result['message'] 	= 'Post ID is not existed';
			
			$this->output
			->set_status_header('403')
			->set_content_type('application/json')
			->set_output(json_encode($result));
		}
	}
}

/* End of file post.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/controllers/api/post.php */
