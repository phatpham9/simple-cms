<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_post extends CI_Model {

	private $tblPost = "post";

	public function __construct()
	{
		parent::__construct();
		//Do your magic here
	}

	function getList($search = '',$sort = '-created',$skip = '', $limit)
	{
		if($skip == 0 || $skip == null) $skip = 1;// skip is page for pagination
			$offset = ($skip - 1) * $limit;

		$pieces = explode("-", $sort);
		$sqlCommand  = "SELECT distinct * FROM `".$this->tblPost."`"
					 . " WHERE " 
					 . 		"`isDeleted` = 0 "
					 .      "AND 
					 			( 
					 				`title` like '%".$search."%' 
					 			OR 
					 				`description` like '%".$search."%'
					 			OR
					 				`content` like '%".$search."%'
					 			)"
					 . " ORDER BY ".(($pieces[0] === '-') ? "`".$pieces[1]."` DESC" : "`".$pieces[1]."` ASC")
					 . " LIMIT ". $limit
					 . " OFFSET ".$offset;
		
		$query = $this->db->query($sqlCommand);
		// print_r($this->db->last_query());
		//return $query->num_rows() > 0 ? $query->result_array() : NULL;
		return $query->result();
	}

	function create($post)
	{
		$post['created'] = date('Y-m-d G:i:s', time());
		$post['updated'] = date('Y-m-d G:i:s', time());  
		$post['isDeleted'] = 0; 

		if ($this->db->insert($this->tblPost, $post)) {
			$post['id'] = $this->db->insert_id();
			return $post;
		}
		else 
		{
			return NULL;
		}
	}

	function getDetails($id,$slug)
	{

		$this->db->distinct();
		!empty($slug) ? $this->db->where($this->tblPost.'.slug',$slug) : $this->db->where($this->tblPost.'.id',$id);
		$this->db->where($this->tblPost.'.isDeleted',0);
		$query = $this->db->get($this->tblPost);
		return $query->num_rows() == 1 ? $query->row_array() : NULL;
	}

	function update($post)
	{
		$post['updated'] = date('Y-m-d G:i:s', time());  

		$this->db->where('id', $post['id']);
		return $this->db->update($this->tblPost, $post);
	}

	function delete($id)
	{
		$post = array();
		$post['updated'] = date('Y-m-d G:i:s', time());  
		$post['isDeleted'] = 1; 

		$this->db->where('id', $id);
		return $this->db->update($this->tblPost, $post);
	}

	function checkPostExist($id){
		$this->db->where('id', $id);
		$query = $this->db->get($this->tblPost);
		return $query->num_rows() > 0 ? TRUE :  FALSE;
	}
}

/* End of file model_post.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/models/model_post.php */