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
-- Table structure for table `AGENT_RANKING_ARCHIVE`
--

DROP TABLE IF EXISTS `AGENT_RANKING_ARCHIVE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AGENT_RANKING_ARCHIVE` (
  `MATCH_LOG_ID` varchar(45) NOT NULL COMMENT 'The UUID of the game played',
  `AGENT_ID` varchar(45) NOT NULL COMMENT 'The UUID of the player''s agent',
  `AGENT_NAME` varchar(100) NOT NULL,
  `USER_ID` varchar(45) NOT NULL,
  `USERNAME` varchar(45) NOT NULL,
  `RANKING` int NOT NULL DEFAULT '-1' COMMENT 'The agent''s ranking in a match.\\\\\\\\\\\\\\\\n0 indicates an undefined ranking',
  PRIMARY KEY (`MATCH_LOG_ID`,`AGENT_ID`),
  KEY `USER_ID_ARCH_idx` (`USER_ID`),
  CONSTRAINT `MATCH_LOG_ID_RANKING_ARCH` FOREIGN KEY (`MATCH_LOG_ID`) REFERENCES `MATCH_LOG` (`MATCH_LOG_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `USER_ID_ARCH` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AGENT_RANKING_ARCHIVE`
--

LOCK TABLES `AGENT_RANKING_ARCHIVE` WRITE;
/*!40000 ALTER TABLE `AGENT_RANKING_ARCHIVE` DISABLE KEYS */;
INSERT INTO `AGENT_RANKING_ARCHIVE` VALUES ('3ecb2b5d-0e7c-11ed-8a34-0ea680fee648','2663d0f7-0e75-11ed-8a34-0ea680fee648','Vita Dummy Agent','4a0c861e-0e64-11ed-8a34-0ea680fee648','iusto457',0);
/*!40000 ALTER TABLE `AGENT_RANKING_ARCHIVE` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-28 16:09:24