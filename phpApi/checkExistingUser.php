<?php
require __DIR__ . "/connectDB.php"; // The database connection is required

/**
 * The values entered by the user will be sent upon.
 * making a POST request and validated in their 
 *  respective checks
 */


/**
 * Checks if the user's credintials are valid in the database.
 * 
 * Either the username and password, or the email and password is validated
 * 
 * In the $_POST array, the following attributes are retrieved:
 * 
 * userName, userEmail, userPass
 * 
 * @param mysqli $db The database
 * @return mixed ErrorCode - Indicates that invalid details were entered
 * 
 *      JSONObject - The of row corresponding to the valid user entry
 */
function loginCheck($db)
{
  $stmt = $db->prepare("CALL login_user_check(?, ?, ?)");
  $stmt->bind_param("sss", $_POST['userName_Email'], $_POST['userName_Email'], $_POST['userPass']);

  checkStatementFailure($db, $stmt->execute());

  $result = $stmt->get_result();

  if ($result->num_rows == 0)
    $jsonResult = $GLOBALS["NO"];
  else {
    $jsonResult = json_encode($result->fetch_assoc());
  }

  $result->free();

  return $jsonResult;
}

/**
 * Checks if the user wanting to sign up/register may use their desired username.
 * 
 * In the POST array, the following attributes are retrieved:
 * 
 * userName - The username 
 * 
 * @param mysqli $db The database
 * 
 * @return ErrorResult Indicates whether the user may proceed with the given username
 */
function checkExistingUser($db)
{
  $stmt = $db->prepare("CALL check_existing_user(?)");
  $stmt->bind_param("s", $_POST['userName']);

  checkStatementFailure($db, $stmt->execute());

  $result = $stmt->get_result();

  if ($result->num_rows > 0)
    $output = $GLOBALS["NO"];
  else
    $output = $GLOBALS["OK"];

  $result->free();

  return $output;
}

$db = connectToDB($db);

switch ($_POST["userCheck"]) {
  case "login":
    $result = loginCheck($db);
    break;
  case "duplicateUser":
    $result = checkExistingUser($db);
    break;
  default:
    $result = $GLOBALS["ERROR"];
}

echo ($result);

$db->close();