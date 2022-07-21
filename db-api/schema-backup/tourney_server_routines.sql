-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: tourney-server-dev.crw7j7mduhsz.af-south-1.rds.amazonaws.com    Database: tourney_server
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Temporary view structure for view `OLD_AGENT`
--

DROP TABLE IF EXISTS `OLD_AGENT`;
/*!50001 DROP VIEW IF EXISTS `OLD_AGENT`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `OLD_AGENT` AS SELECT 
 1 AS `AGENT_ID`,
 1 AS `AGENT_NAME`,
 1 AS `USER_ID`,
 1 AS `ADDRESS_ID`,
 1 AS `AGENT_STATUS`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `OLD_RANKING`
--

DROP TABLE IF EXISTS `OLD_RANKING`;
/*!50001 DROP VIEW IF EXISTS `OLD_RANKING`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `OLD_RANKING` AS SELECT 
 1 AS `MATCH_LOG_ID`,
 1 AS `AGENT_ID`,
 1 AS `RANKING`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `X`
--

DROP TABLE IF EXISTS `X`;
/*!50001 DROP VIEW IF EXISTS `X`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `X` AS SELECT 
 1 AS `MATCH_LOG_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `OLD_AGENT_TOURNAMENT`
--

DROP TABLE IF EXISTS `OLD_AGENT_TOURNAMENT`;
/*!50001 DROP VIEW IF EXISTS `OLD_AGENT_TOURNAMENT`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `OLD_AGENT_TOURNAMENT` AS SELECT 
 1 AS `AGENT_ID`,
 1 AS `TOURNAMENT_ID`,
 1 AS `AGENT_ELO`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `OLD_AGENT`
--

/*!50001 DROP VIEW IF EXISTS `OLD_AGENT`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `OLD_AGENT` AS select `AGENT`.`AGENT_ID` AS `AGENT_ID`,`AGENT`.`AGENT_NAME` AS `AGENT_NAME`,`AGENT`.`USER_ID` AS `USER_ID`,`AGENT`.`ADDRESS_ID` AS `ADDRESS_ID`,`AGENT`.`AGENT_STATUS` AS `AGENT_STATUS` from `AGENT` where (`AGENT`.`AGENT_ID` = '96d35917-e051-11ec-8a34-0ea680fee648') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `OLD_RANKING`
--

/*!50001 DROP VIEW IF EXISTS `OLD_RANKING`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `OLD_RANKING` AS select `RANKING`.`MATCH_LOG_ID` AS `MATCH_LOG_ID`,`RANKING`.`AGENT_ID` AS `AGENT_ID`,`RANKING`.`RANKING` AS `RANKING` from `RANKING` where (`RANKING`.`AGENT_ID` = '96d35917-e051-11ec-8a34-0ea680fee648') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `X`
--

/*!50001 DROP VIEW IF EXISTS `X`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `X` AS select `ML`.`MATCH_LOG_ID` AS `MATCH_LOG_ID` from (`MATCH_LOG` `ML` left join `RANKING` `R` on((`ML`.`MATCH_LOG_ID` = `R`.`MATCH_LOG_ID`))) where (`R`.`AGENT_ID` is null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `OLD_AGENT_TOURNAMENT`
--

/*!50001 DROP VIEW IF EXISTS `OLD_AGENT_TOURNAMENT`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `OLD_AGENT_TOURNAMENT` AS select `AGENT_TOURNAMENT`.`AGENT_ID` AS `AGENT_ID`,`AGENT_TOURNAMENT`.`TOURNAMENT_ID` AS `TOURNAMENT_ID`,`AGENT_TOURNAMENT`.`AGENT_ELO` AS `AGENT_ELO` from `AGENT_TOURNAMENT` where (`AGENT_TOURNAMENT`.`AGENT_ID` = '96d35917-e051-11ec-8a34-0ea680fee648') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-06 11:32:08
