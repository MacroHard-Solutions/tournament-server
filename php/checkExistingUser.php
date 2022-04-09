<?php
require __DIR__."/connectDB.php";

function loginCheck($db){
  $stmt = $db->prepare("CALL login_user(?, ?, ?)");
  $stmt->bind_param("ssb", $_POST['userName'], $_POST['userEmail'], $_POST['userPass']);

  checkStatementFailure($stmt->execute());

  $result = $stmt->get_result();

  if ($result->num_rows == 0)
    return($GLOBALS["ERROR"]);
  else
    return($result->fetch_assoc());
}

function checkExistingUser($db){
  $stmt = $db->prepare("CALL check_existing_user(?)");
  $stmt->bind_param("s", $_POST['userName']);

  checkStatementFailure($stmt->execute());

  $result = $stmt->get_result();

  if ($result->num_rows >= 0)
    return($GLOBALS["ERROR"]);
  else
    return($GLOBALS["OK"]);
}

$db = connectToDB($db);

switch ($_POST["userCheck"]){
  case "login":
      $result = loginCheck($db);
    break;
  case "duplicateUser":
      $result = checkExistingUser($db);
    break;
  default:
    $result = $GLOBALS["ERROR"];
}

  echo($result);
?>