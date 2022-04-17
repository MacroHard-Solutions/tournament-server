<?php
/**
 * @param mysqli $db
 * @return bool
 */
function insertUser(mysqli $db)
{
  $stmt = $db->prepare("CALL insert_user(?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param(
    'ssssssii',
    $_POST['userID'],
    $_POST['fName'],
    $_POST['lName'],
    $_POST['userName'],
    $_POST['userEmail'],
    $_POST['userPass'],
    $_POST['isAdmin'],
    $_POST['wantsNotifications']
  );

  checkStatementFailure($db, $stmt->execute());

  return true;
}

/**
 * @param mysqli $db
 * @param string $addressID The new addressID obtained to associate with the agent
 * @return string The newly inserted UUID
 */
function insertAgent(mysqli $db, string $addressID) : string
{
  // echo("  ".$addressID ." is the ID");
  $stmt = $db->prepare("CALL insert_agent(?, ?, ?, ?)");
  $stmt->bind_param(
    'sssd',
    $_POST['userID'],
    $_POST['addressID'],//$addressID,
    $_POST['tournamentID'],
    $_POST['agentELO']
  );

  checkStatementFailure($db, $stmt->execute());

  // get agentID from previous insertion
  $result = $db->query("CALL get_latest_agent_id()");
  return $result->fetch_assoc()["USER_AGENT_ID"];
}

/**
 * @param mysqli $db
 * @return string The newly inserted UUID
 */
function insertAddress(mysqli $db) : string
{
  $stmt = $db->prepare("CALL insert_agent_address( ?, ?)");
  $stmt->bind_param('si', $_POST['addressIP'], $_POST['portNum']);

  checkStatementFailure($db, $stmt->execute());
  $stmt->store_result();

  // get addressID from previous insertion
  $result = $db->query("CALL get_latest_address_id();");
  $newAddressID = $result->fetch_assoc()["ADDRESS_ID"];
  $result->free();

  $db->next_result();

  return $newAddressID;
}

/**
 * @param mysqli $db
 * @return string The newly inserted UUID
 */
function insertGame(mysqli $db) :string
{
  $stmt = $db->prepare("CALL insert_game(?, ?)");
  $stmt->bind_param('ss', $_POST['gameName'], $_POST['fileName']);

  checkStatementFailure($db, $stmt->execute());

  $result = $stmt->get_result();
  $currRow = $result->fetch_assoc();
  echo (json_encode($currRow));
  $result->free();

  // get gameID from previous insertion
//  $result = $db->query("CALL get_latest_game_id()");
  return json_encode($currRow);
}

/**
 * @param mysqli $db
 * @return string The newly inserted UUID
 */
function insertTournament(mysqli $db) :string
{
  $stmt = $db->prepare("CALL insert_tournament(?, ?)");
  $stmt->bind_param('ss', $_POST['tournamentName'], $_POST['gameID']);

  checkStatementFailure($db, $stmt->execute());

  // get agentID from previous insertion
  $result = $db->query("CALL get_latest_tournament_id()");
  return $result->fetch_assoc()["TOURNAMENT_ID"];
}

/**
 * @param mysqli $db
 * @return string The newly inserted UUID
 */
function insertMatchLog(mysqli $db) : string
{
  $stmt = $db->prepare("CALL insert_match_log(?, ?, ?)");
  $stmt->bind_param('sss', $_POST['tournamentID'], $_POST['matchLogTime'], $_POST['gameLog']);

  checkStatementFailure($db, $stmt->execute());

  // get agentID from previous insertion
  $result = $db->query("CALL get_latest_match_log_id()");
  return $result->fetch_assoc()["MATCH_LOG_ID"];
}

// Need to figure out how matches are obtained
/**
 * @param mysqli $db
 * @param string $matchLogID  The related match log ID
 * @return bool
 */
function insertRanking(mysqli $db, string $matchLogID) : bool
{
  $stmt = $db->prepare("CALL insert_ranking(?, ?, ?)");
  $stmt->bind_param('ssi', $_POST['matchLogID'], $_POST['agentID'], $_POST['ranking']);

  checkStatementFailure($db, $stmt->execute());

  return true;
}

/**
 * @param mysqli $db
 * @return void
 */
function insertToTable(mysqli $db){
  $result = null;

  switch ($_POST["insertType"]) {
    case "user":
      // insert user
      $result = insertUser($db);
      break;
    case "game":
      // insert game
      $newID = insertGame($db);
      break;
    case "tournament":
      // insert tournament
      $newID = insertTournament($db);
      break;
    case "agent":
      // insert agent and associated address
      $addressID = insertAddress($db);

      //
      echo ("AddressID before Agent entry is " . $addressID);

      // TODO: FIX
      break;
    case "addressAgent":
      $newID = insertAgent($db, 0);//$addressID);
      break;

      break;
    case "matchLog":
      // inserts match log and rankings
      $matchLogID = insertMatchLog($db);
      echo ("MatchLogID before multiple rankings entries is " . $matchLogID);
      insertRanking($db, $matchLogID); // TODO: There's multiple to account for
      break;
    default:
      echo ($GLOBALS["ERROR"]);


      if (isset($newID))
        echo ("New ID for data entry is " . $newID);
      else if ($result)
        echo ($GLOBALS["SUCCESS"]);
      else
        echo ($GLOBALS["ERROR"]);
  }


}