<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// TODO: FREE EVERY RESULT OBTAINED FROM MYSQLI

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$GLOBALS["ERROR"] = json_encode("ERROR");
$GLOBALS["OK"] = json_encode("OK");
$GLOBALS["SUCCESS"] = json_encode("SUCCESS");
$GLOBALS["YES"] = json_encode("YES");
$GLOBALS["NO"] = json_encode("NO");

/**
 * Initiates a connectino to the database
 *
 * @return mysqli
 */
function connectToDB(): mysqli
{
	$db = new mysqli(
		"tourney-server-database.c2ncyvtifq7i.us-east-1.rds.amazonaws.com",
		"root",
		"44gRmEvP9xLhR6d",
		"db_tourney_server",
		"3306"
	);
	// $db = new mysqli(
	// 	"localhost",
	// 	"root",
	// 	"",
	// 	"db_tourney_server",
	// 	"3306"
	// );

	$db->set_charset("utf8");

	return $db;
}

/**
 * Checks if executing a statement was successful.
 * 
 * If not, the program needs to end
 * 
 * @param mysqli $db The database
 * @param bool $success Whether the execution was successful
 * 
 * @return void
 */
function checkStatementFailure(mysqli $db, bool $success)
{
	if ($success == false) {
		$db->close();
		exit($GLOBALS["ERROR"]);
	}
}

$db = connectToDB();

phpinfo();