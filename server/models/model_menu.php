<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_menu extends CI_Model {

	private $tblMenu = "menu";

	public function __construct()
	{
		parent::__construct();
		//Do your magic here
	}

	function getList($search = '',$sort = '-created',$skip = '', $limit)
	{
		if($skip == 0 || $skip == null) $skip = 1;// skip is page for pagination
			$offset = ($skip - 1) * $limit;

		$this->db->distinct();
		$this->db->select($this->tblMenu. '.id');
		$this->db->select($this->tblMenu. '.name');
		$this->db->select($this->tblMenu. '.items');
		$this->db->select($this->tblMenu. '.updated');
		$this->db->select($this->tblMenu. '.created');
		$this->db->select($this->tblMenu. '.isDeleted');
		$this->db->from($this->tblMenu);
		$this->db->where($this->tblMenu.'.isDeleted',0);
		$this->db->like($this->tblMenu.'.name',$search);
		$pieces = explode("-", $sort);
		if($pieces[0] == '-')
		{
			$this->db->order_by($this->tblMenu.'.'.$pieces[1], 'desc');
		}
		else
		{
			$this->db->order_by($this->tblMenu.'.'.$pieces[1], 'acs');
		}
		
		if (!empty($limit)){
			$this->db->limit($limit, $offset);
		}
		$query = $this->db->get();

		//return $query->num_rows() > 0 ? $query->result_array() : NULL;
		return $query->num_rows() > 0 ? $query->result() : NULL;
	}

	function create($menu)
	{
		$menu['created'] = date('Y-m-d G:i:s', time());
		$menu['updated'] = date('Y-m-d G:i:s', time());  
		$menu['isDeleted'] = 0; 

		if ($this->db->insert($this->tblMenu, $menu)) {
			$menu['id'] = $this->db->insert_id();
			return $menu;
		}
		else 
		{
			return NULL; 
		}
	}

	function getDetails($id)
	{
		$this->db->distinct();
		$this->db->where($this->tblMenu.'.id',$id);
		$this->db->where($this->tblMenu.'.isDeleted',0);
		$query = $this->db->get($this->tblMenu);

		return $query->num_rows() == 1 ? $query->row_array() : NULL;
	}

	function update($menu)
	{
		$menu['updated'] = date('Y-m-d G:i:s', time());  

		$this->db->where('id', $menu['id']);
		return $this->db->update($this->tblMenu, $menu);
	}

	function delete($id)
	{
		//if (!$this->db->where('id', $id)->delete($this->tblMenu)) ? return FALSE : return TRUE;
		$menu = array();
		$menu['updated'] = date('Y-m-d G:i:s', time());  
		$menu['isDeleted'] = 1; 

		$this->db->where('id', $id);
		return $this->db->update($this->tblMenu, $menu);
	}

	function checkMenuExist($id){
		$this->db->where('id', $id);
		$query = $this->db->get($this->tblMenu);
		return $query->num_rows() > 0 ? TRUE :  FALSE;
	}
}

/* End of file model_menu.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/models/model_menu.php */