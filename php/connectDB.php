
<?php
	// TODO: FREE EVERY RESULT OBTAINED FROM MYSQLI

	 mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

	$GLOBALS["ERROR"] = json_encode(900);
	$GLOBALS["OK"] = json_encode(500);

	/**
	 *  Iniitiates a conneciton with the database
	 *  
	 *  @return mysqli The active database
	 */
	function connectToDB(){
		// $db = new mysqli("tourney-server-database.c2ncyvtifq7i.us-east-1.rds.amazonaws.com",
		// 				"root", "44gRmEvP9xLhR6d",
		// 				"db_tourney_server", "3306");
						$db = new mysqli("localhost",
						"root", "",
						"db_tourney_server", "3306");

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
	function checkStatementFailure($db, $success){
		if ($success == false)
		{
			$db->close();
			exit($GLOBALS["ERROR"]);
		}
	}

	$db = connectToDB();
	
//  printf("Success... %s\n\n", $db->host_info);

?>