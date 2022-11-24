<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getPersonnelByID.php?id=<id>

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	
	if($_REQUEST['table_name'] == 'personnel')
	{
		
$query_var = "SELECT personnel.*, department.name as dept_name,location.name as loc_name
FROM personnel
INNER JOIN department
  ON department.id  = personnel.departmentID
 
  INNER JOIN location
  ON location.id  = department.locationID
   where";
  $first_name = "";
  $last_name = "";
  $dept_name = "";
  $location_name = "";
// if($_REQUEST['first_name'])
// {
// 	$first_name = $_REQUEST['first_name'];
// }
if($_REQUEST['last_name'])
{
    	$first_name = $_REQUEST['last_name'];
	$last_name = $_REQUEST['last_name'];
}
if($_REQUEST['dept_name'])
{
	$dept_name = $_REQUEST['dept_name'];
}

if($_REQUEST['location_name'])
{
	$location_name = $_REQUEST['location_name'];
}

$query_var.= "(personnel.firstName like '%{$first_name}%' ";
$query_var.= "or personnel.lastName like  '%{$last_name}%')";
$query_var.= "and personnel.departmentID like   '%{$dept_name}%' ";
$query_var.= "and department.locationID like  '%{$location_name}%'  ";



	
$result = $conn->query($query_var);

	}




	else if($_REQUEST['table_name'] == 'department')
	{
		
$query_var = "SELECT department.*,location.name as loc_name
FROM department
INNER JOIN location
  ON location.id  = department.locationID
   where";
  $first_name = "";
  $last_name = "";
  $dept_name = "";
  $location_name = "";
if($_REQUEST['last_name'])
{
	$last_name = $_REQUEST['last_name'];
}

if($_REQUEST['location_name'])
{
	$location_name = $_REQUEST['location_name'];
}

$query_var.= " department.name like '%{$last_name}%' ";
$query_var.= "and department.locationID like  '%{$location_name}%'  ";



	
$result = $conn->query($query_var);
	}


	else if($_REQUEST['table_name'] == 'location')
	{
		
$query_var = "SELECT * from location 
   where";
  $last_name = "";
 
if($_REQUEST['last_name'])
{
	$last_name = $_REQUEST['last_name'];
}



$query_var.= " name like '%{$last_name}%' ";

$result = $conn->query($query_var);
	}

//$result->fetch_assoc();





// if (false === $result) {

// 		$output['status']['code'] = "400";
// 		$output['status']['name'] = "executed";
// 		$output['status']['description'] = "query failed";	
// 		$output['data'] = [];

// 		mysqli_close($conn);

// 		echo json_encode($output); 

// 		exit;

// 	}
    
	//$result = $query->get_result();

   	$personnel = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($personnel, $row);

	}



	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['personnel'] = $personnel;
	
	
	mysqli_close($conn);

	echo json_encode($output); 

?>