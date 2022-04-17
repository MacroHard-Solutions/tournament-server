<?php
require ("insertToDB.php");
//require __DIR__."";
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
 * Initiates a connection to the database
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
  // For connecting to a local DB
  // $db = new mysqli(
  // 	"localhost",
  // 	"root",
  // 	"",
  // 	"db_tourney_server",
  // 	"3306"
  // );

  // if the connection was unsuccessful
  if ($db->connect_errno)
  {
    echo ($GLOBALS["ERROR"].": Unable to connect to DB");
    exit($GLOBALS['ERROR']);
  }

  $db->set_charset("utf8");

  return $db;
}

/**
 * Checks if executing a statement was successful
 * @param mysqli $db The connected database
 * @param bool $successful
 * @return void
 */
function checkStatementFailure(mysqli $db, bool $successful)
{
  if (!$successful) {
    $db->close();
    exit($GLOBALS["ERROR"]);
  }
}

$db = connectToDB();

switch ($_POST['function']){
  case "signup":
    insertUser($db);
    break;

  case "insert":
    insertToTable($db);
    break;

  default:
    echo ($GLOBALS["ERROR"]);

}

// list functionality

$db->close();