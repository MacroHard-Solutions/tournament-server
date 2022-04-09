
<?php
	// TODO: FREE EVERY RESULT OBTAINED FROM MYSQLI

	 mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

	$GLOBALS["ERROR"] = 900;
	$GLOBALS["OK"] = 500;

	/**
	 *  @brief Allows the user to connect to the database
	 *  
	 *  @return The active database, if it exists
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

	function checkStatementFailure($stmt){
		if ($stmt == false)
			exit($GLOBALS["ERROR"]);
	}

	$db = connectToDB();
	
//  printf("Success... %s\n\n", $db->host_info);

?>