<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'frontend';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
// Category route
$route['api/category'] 					= $_SERVER['REQUEST_METHOD'] == 'GET' ? '/api/category/all'	: ($_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/category/create' : '/api/error/error_404');
$route['api/category/(:any)'] 			= $_SERVER['REQUEST_METHOD'] == 'GET' ? '/api/category/get/$1' : ($_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/category/update/$1' : '/api/error/error_404');
$route['api/category/(:any)/delete'] 	= $_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/category/delete/$1' : '/api/error/error_404';
// menu route
$route['api/menu'] 						= $_SERVER['REQUEST_METHOD'] == 'GET' ? '/api/menu/all'	: ($_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/menu/create' : '/api/error/error_404');
$route['api/menu/(:any)'] 				= $_SERVER['REQUEST_METHOD'] == 'GET' ? '/api/menu/get/$1' : ($_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/menu/update/$1' : '/api/error/error_404');
$route['api/menu/(:any)/delete'] 		= $_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/menu/delete/$1' : '/api/error/error_404';
// post route
$route['api/post'] 						= $_SERVER['REQUEST_METHOD'] == 'GET' ? '/api/post/all'	: ($_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/post/create' : '/api/error/error_404');
$route['api/post/(:any)'] 				= $_SERVER['REQUEST_METHOD'] == 'GET' ? '/api/post/get/$1' : ($_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/post/update/$1' : '/api/error/error_404');
$route['api/post/(:any)/delete'] 		= $_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/post/delete/$1' : '/api/error/error_404';
// setting route
$route['api/setting/(:any)'] 			= $_SERVER['REQUEST_METHOD'] == 'GET' ? '/api/setting/get/$1' : ($_SERVER['REQUEST_METHOD'] == 'POST' ? '/api/setting/update/$1' : '/api/error/error_404');