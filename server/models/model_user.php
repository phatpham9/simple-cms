<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_user extends CI_Model {

	private $tblUser = "users";
	
	public function __construct()
	{
		parent::__construct();
		//Do your magic here
	}

	function getList($search = '',$sort = '-created', $skip = '', $limit)
	{
		if($skip == 0 || $skip == null) $skip = 1;// skip is page for pagination
			$offset = ($skip - 1) * $limit;

		$pieces = explode("-", $sort);
		$sqlCommand  = "SELECT distinct * FROM `".$this->tblUser."`"
					 . " WHERE " 
					 . 		"`isDeleted` = 0 "
					 .      "AND 
					 			( 
					 				`username` like '%".$search."%' 
					 			OR 
					 				`email` like '%".$search."%'
					 			)"
					 . " ORDER BY ".(($pieces[0] === '-') ? "`".$pieces[1]."` DESC" : "`".$pieces[1]."` ASC")
					 . " LIMIT ". $limit
					 . " OFFSET ".$offset;
		$query = $this->db->query($sqlCommand);
		
		return $query->num_rows() > 0 ? $query->result() : NULL;
	}

	function create($user)
	{
		$user['created'] = date('Y-m-d G:i:s', time());
		$user['modified'] = date('Y-m-d G:i:s', time());  
		$user['isDeleted'] = 0; 
		$user['activated'] = 1; 

		if ($this->db->insert($this->tblUser, $user)) {
			$user['id'] = $this->db->insert_id();
			return $user;
		}
		else 
		{
			return NULL;
		}
	}

	function getDetails($id,$email)
	{
		$this->db->distinct();
		!empty($email) ? $this->db->where($this->tblUser.'.email',$email) : $this->db->where($this->tblUser.'.id',$id);
		$this->db->where($this->tblUser.'.isDeleted',0);
		$query = $this->db->get($this->tblUser);
		return $query->num_rows() == 1 ? $query->row_array() : NULL;
	}

	function update($user)
	{
		$user['modified'] = date('Y-m-d G:i:s', time());  

		$this->db->where('id', $user['id']);
		return $this->db->update($this->tblUser, $user);
	}

	function delete($id)
	{
		//if (!$this->db->where('id', $id)->delete($this->tblUser)) ? return FALSE : return TRUE;
		$user = array();
		$user['modified'] = date('Y-m-d G:i:s', time());  
		$user['isDeleted'] = 1; 

		$this->db->where('id', $id);
		return $this->db->update($this->tblUser, $user);
	}

	function checkUserExist($id){
		$this->db->where('id', $id);
		$query = $this->db->get($this->tblUser);
		return $query->num_rows() > 0 ? TRUE :  FALSE;
	}
}

/* End of file model_user.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/models/model_user.php */