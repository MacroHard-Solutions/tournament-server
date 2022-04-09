<?php
require __DIR__ . "/connectDB.php";
// require __DIR__ . "/getTableID.php";

function insertUser($db)
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

	checkStatementFailure($stmt->execute());

	return true;
}
function insertAgent($db, $addressID)
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

	checkStatementFailure($stmt->execute());

	// get agentID from previous insertion
	$result = $db->query("CALL get_latest_agent_id()");
	return $result->fetch_assoc()["USER_AGENT_ID"];
}
function insertAddress($db)
{
	$stmt = $db->prepare("CALL insert_agent_address( ?, ?)");
	$stmt->bind_param('si', $_POST['addressIP'], $_POST['portNum']);

	checkStatementFailure($stmt->execute());
	$stmt->store_result();

	// get addressID from previous insertion
	$result = $db->query("CALL get_latest_address_id();");
	$newAddressID = $result->fetch_assoc()["ADDRESS_ID"];
	print($newAddressID. " eesh");
	$result->free();

	$db->next_result();	

	return $newAddressID;
}
function insertGame($db)
{
	$stmt = $db->prepare("CALL insert_game(?, ?)");
	$stmt->bind_param('sb', $_POST['gameName'], $_POST['fileName']);

	checkStatementFailure($stmt->execute());

	// get gameID from previous insertion
	$result = $db->query("CALL get_latest_game_id()");
	return $result->fetch_assoc()["GAME_ID"];
}
function insertTournament($db)
{
	$stmt = $db->prepare("CALL insert_tournament(?, ?)");
	$stmt->bind_param('ss', $_POST['tournamentName'], $_POST['gameID']);

	checkStatementFailure($stmt->execute());

	// get agentID from previous insertion
	$result = $db->query("CALL get_latest_tournament_id()");
	return $result->fetch_assoc()["TOURNAMENT_ID"];
}
function insertMatchLog($db)
{
	$stmt = $db->prepare("CALL insert_match_log(?, ?)");
	$stmt->bind_param('ss', $_POST['tournamentID'], $_POST['gameLog']);

	checkStatementFailure($stmt->execute());

	// get agentID from previous insertion
	$result = $db->query("CALL get_latest_match_log_id()");
	return $result->fetch_assoc()["MATCH_LOG_ID"];
}
function insertRanking($db, $matchLogID)
{
	$stmt = $db->prepare("CALL insert_ranking(?, ?, ?)");
	$stmt->bind_param('ssi', $_POST['matchLogID'], $_POST['agentID'], $_POST['ranking']);

	checkStatementFailure($stmt->execute());

	return true;
}

$db = connectToDB();

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
		// insert agent and address
		$addressID = insertAddress($db);

		//
		echo ("AddressID before Agent entry is " . $addressID);
/* 
	// TODO: FIX
	case "addressAgent":
		$newID = insertAgent($db, 0);//$addressID);
		break; */
	case "matchLog":
		// inserts match log and rankings
		$matchLogID = insertMatchLog($db);
		echo ("MatchLogID before multiple rankings entries is " . $matchLogID);
		insertRanking($db, $matchLogID); // TODO: There's multiple to account for
		break;
	default:
		echo ($GLOBALS["ERROR"]);
}

if (isset($newID))
	echo ("New ID for data entry is " . $newID);
else if ($result)
	echo ($GLOBALS["OK"]);
else
	echo ($GLOBALS["ERROR"]);

?>