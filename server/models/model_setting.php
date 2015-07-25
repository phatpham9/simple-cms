<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_setting extends CI_Model {

	private $tblSetting = "setting";

	public function __construct()
	{
		parent::__construct();
		//Do your magic here
	}

	function getDetails($id)
	{
		$this->db->distinct();
		$this->db->where($this->tblSetting.'.id',$id);
		$query = $this->db->get($this->tblSetting);

		return $query->num_rows() == 1 ? $query->row_array() : NULL;
	}

	function update($setting)
	{
		$this->db->where('id', $setting['id']);
		return $this->db->update($this->tblSetting, $setting);
	}

	function checkSettingExist($id){
		$this->db->where('id', $id);
		$query = $this->db->get($this->tblSetting);
		return $query->num_rows() > 0 ? TRUE :  FALSE;
	}
}

/* End of file model_setting.php */
/* Location: .//C/xampp/htdocs/simple-cms/server/models/model_setting.php */