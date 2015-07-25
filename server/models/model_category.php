<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_category extends CI_Model {

	private $tblCategory = "category";
	
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
		$sqlCommand  = "SELECT distinct * FROM `".$this->tblCategory."`"
					 . " WHERE " 
					 . 		"`isDeleted` = 0 "
					 .      "AND 
					 			( 
					 				`name` like '%".$search."%' 
					 			OR 
					 				`description` like '%".$search."%'
					 			)"
					 . " ORDER BY ".(($pieces[0] === '-') ? "`".$pieces[1]."` DESC" : "`".$pieces[1]."` ASC")
					 . " LIMIT ". $limit
					 . " OFFSET ".$offset;
		
		$query = $this->db->query($sqlCommand);
		
		//return $query->num_rows() > 0 ? $query->result_array() : NULL;
		return $query->num_rows() > 0 ? $query->result() : NULL;
	}

	function create($category)
	{
		$category['created'] = date('Y-m-d G:i:s', time());
		$category['updated'] = date('Y-m-d G:i:s', time());  
		$category['isDeleted'] = 0; 

		if ($this->db->insert($this->tblCategory, $category)) {
			$category['id'] = $this->db->insert_id();
			return $category;
		}
		else 
		{
			return NULL;
		}
	}

	function getDetails($id)
	{
		$this->db->distinct();
		$this->db->where($this->tblCategory.'.id',$id);
		$this->db->where($this->tblCategory.'.isDeleted',0);
		$query = $this->db->get($this->tblCategory);

		return $query->num_rows() == 1 ? $query->row_array() : NULL;
	}

	function update($category)
	{
		$category['updated'] = date('Y-m-d G:i:s', time());  

		$this->db->where('id', $category['id']);
		return $this->db->update($this->tblCategory, $category);
	}

	function delete($id)
	{
		//if (!$this->db->where('id', $id)->delete($this->tblCategory)) ? return FALSE : return TRUE;
		$category = array();
		$category['updated'] = date('Y-m-d G:i:s', time());  
		$category['isDeleted'] = 1; 

		$this->db->where('id', $id);
		return $this->db->update($this->tblCategory, $category);
	}

	function checkCategoryExist($id){
		$this->db->where('id', $id);
		$query = $this->db->get($this->tblCategory);
		return $query->num_rows() > 0 ? TRUE :  FALSE;
	}
}

/* End of file model_category.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/models/model_category.php */