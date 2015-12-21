<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Email
| -------------------------------------------------------------------------
| This file lets you define parameters for sending emails.
| Please see the user guide for info:
|
|	http://codeigniter.com/user_guide/libraries/email.html
|
*/
$config['mailtype'] = 'html';
$config['charset'] = 'utf-8';
$config['newline'] = "\r\n";

$config['protocol'] = 'smtp';
$config['charset'] = 'iso-8859-1';
$config['mailtype'] = 'html';

$config['smtp_host'] = 'ssl://smtp.gmail.com';
$config['smtp_port'] = '465';

$config['smtp_user'] = 'Your Email';
$config['smtp_pass'] = 'Your Password';
/* End of file email.php */
/* Location: ./application/config/email.php */