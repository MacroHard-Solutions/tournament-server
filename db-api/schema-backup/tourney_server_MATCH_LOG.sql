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
-- Table structure for table `MATCH_LOG`
--

DROP TABLE IF EXISTS `MATCH_LOG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MATCH_LOG` (
  `MATCH_LOG_ID` varchar(45) NOT NULL COMMENT 'THE UUID of the match to be logged from a tournament',
  `TOURNAMENT_ID` varchar(45) NOT NULL COMMENT 'The UUID of the tournament this match was played in',
  `MATCH_LOG_DATA` longtext NOT NULL COMMENT 'Details of the match',
  `MATCH_LOG_TIMESTAMP` timestamp NOT NULL COMMENT 'Date and time of  recording the past match',
  `MATCH_LOG_IN_PROGRESS` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Whether the match is in progress or finished',
  PRIMARY KEY (`MATCH_LOG_ID`),
  UNIQUE KEY `MATCH_LOG_ID_UNIQUE` (`MATCH_LOG_ID`),
  UNIQUE KEY `UK_MATCH_LOG_MATCH_LOG_TIME` (`MATCH_LOG_TIMESTAMP`),
  KEY `TOURNAMENT_ID_idx` (`TOURNAMENT_ID`),
  CONSTRAINT `TOURNAMENT_ID_MATCH_LOG` FOREIGN KEY (`TOURNAMENT_ID`) REFERENCES `TOURNAMENT` (`TOURNAMENT_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MATCH_LOG`
--

LOCK TABLES `MATCH_LOG` WRITE;
/*!40000 ALTER TABLE `MATCH_LOG` DISABLE KEYS */;
INSERT INTO `MATCH_LOG` VALUES ('01c177a0-0b97-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 0 X|1 2 O|0 2 X|1 1 O|2 0 X|2 2 O|0 0 X|','2022-07-24 21:24:31',0),('027002d6-e094-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','WAH','2022-05-31 03:44:44',0),('0352cec6-e094-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','WAH','2022-05-31 03:44:45',0),('040c2503-e094-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','WAH','2022-05-31 03:44:46',0),('04a62eda-e094-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','WAH','2022-05-31 03:44:47',0),('04b4dc60-0b9c-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 0 O|1 1 O|0 2 O|2 2 O|','2022-07-24 22:00:24',0),('04efed6d-da14-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 1 X|2 1 O|2 2 X|2 0 O|1 1 X|0 0 O|1 0 X|0 2 O|1 2 X|','2022-05-22 21:13:25',0),('05468626-e094-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','WAH','2022-05-31 03:44:48',0),('0592c0d6-da0f-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 0 X|0 2 O|2 0 X|1 2 O|0 1 X|0 0 O|1 1 X|2 1 O|2 2 X|','2022-05-22 20:37:39',0),('05ec7e15-e094-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','WAH','2022-05-31 03:44:50',0),('071ff1f5-b077-48c4-94bb-3b3601641175','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Paper Lizard|Paper Paper|Scissors Rock|Scissors Rock|Rock Lizard|Paper Rock|','2022-04-10 18:39:15',0),('0cbdff18-d9da-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 1 X|2 2 O|2 0 X|2 1 O|0 2 X|','2022-05-22 14:18:28',0),('0e95e176-1848-4710-a220-4d8d6dd12ca4','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Scissors Spock|Lizard Rock|Scissors Rock|Rock Lizard|Paper Lizard|','2022-02-06 04:28:49',0),('0f38ba68-0066-4b1a-8c24-49edcd8a293e','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Scissors Rock|Rock Paper|Spock Scissors|Lizard Rock|Lizard Scissors|','2022-03-08 05:06:45',0),('0f671f35-c9fa-4b5c-b877-d831a116270f','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|1 0 O|2 1 X|2 0 O|0 2 X|0 0 O|','2022-01-03 13:39:29',0),('10a35fdc-dea4-11ec-8a34-0ea680fee648','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','','2022-05-28 16:34:37',1),('155c7458-d94d-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 0 X|0 2 O|2 1 X|1 1 O|0 1 X|1 2 O|1 0 X|2 2 O|','2022-05-21 21:29:23',0),('17327cf4-93c3-4361-9ace-4c142624672f','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 2 X|1 2 O|0 1 X|2 1 O|2 0 X|1 0 O|0 2 X|1 1 O|','2022-03-14 00:01:03',0),('174a734f-02a6-4ef9-8de1-e041ebd8dd01','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 1 X|1 0 O|0 1 X|1 1 O|0 2 X|1 2 O|','2022-01-15 21:17:08',0),('1ae3a8f6-da15-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 1 X|2 2 O|0 2 X|1 1 O|0 1 X|0 0 O|','2022-05-22 21:21:12',0),('1b95f255-da97-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|0 2 O|2 2 X|1 2 O|2 0 X|0 0 O|1 0 X|2 1 O|0 1 X|','2022-05-23 12:51:47',0),('1d80a3e7-3300-4534-b5f9-55baf92ffc84','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Rock Lizard|Spock Scissors|Paper Rock|Lizard Lizard|Rock Rock|Lizard Scissors|Scissors Rock|','2022-04-23 22:59:39',0),('1dd13b11-43a0-4d65-8c8b-551baeb70509','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|1 0 O|0 2 X|2 1 O|2 0 X|','2022-03-31 17:18:42',0),('297bf706-d9bf-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 1 X|0 0 O|1 0 X|0 2 O|1 1 X|1 2 O|2 2 X|0 1 O|','2022-05-22 11:05:59',0),('2bddaae3-5cdd-42ad-ac57-9079aadbe1d3','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 0 X|1 2 O|2 2 X|1 1 O|1 0 X|2 1 O|2 0 X|','2022-03-25 21:37:02',0),('2f721fbe-e591-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|2 2 O|0 2 X|1 2 O|1 0 X|0 0 O|2 1 X|0 1 O|2 0 X|','2022-06-06 12:07:07',0),('316d29af-da17-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 2 X|1 1 O|2 2 X|0 2 O|0 0 X|1 0 O|2 1 X|0 1 O|2 0 X|','2022-05-22 21:36:08',0),('32495db7-d955-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 2 X|1 0 O|0 0 X|2 0 O|2 1 X|0 1 O|1 1 X|','2022-05-21 22:27:28',0),('349b7ce0-d94d-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 0 X|1 0 O|2 2 X|2 0 O|0 1 X|2 1 O|1 2 X|0 2 O|1 1 X|','2022-05-21 21:30:15',0),('34e6e4c3-d9f3-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 0 X|1 0 O|2 2 X|1 1 O|0 1 X|2 1 O|0 2 X|','2022-05-22 17:18:32',0),('3834cb40-e7ed-4633-ac9d-63fa8c959e78','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Spock Spock|Lizard Spock|Spock Paper|Paper Lizard|Scissors Paper|Lizard Scissors|','2022-01-15 06:06:27',0),('38ed71b8-66a6-40c6-a4b7-317cdd883afb','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Paper Lizard|Paper Spock|Scissors Rock|Rock Paper|Scissors Spock|','2022-01-09 03:20:07',0),('38f29ebb-534f-455f-9232-c3b44c7152ed','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 2 X|2 2 O|0 0 X|2 0 O|1 1 X|1 0 O|2 1 X|0 1 O|1 2 X|','2022-02-25 17:25:05',0),('3e487b53-00c5-41bb-b91b-8da2d70defb0','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 1 X|1 1 O|1 2 X|2 0 O|2 2 X|0 0 O|0 2 X|','2022-03-18 00:31:20',0),('3e4e8aa3-e467-4bfd-a60a-157401521c16','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Lizard Paper|Spock Paper|Paper Paper|Lizard Spock|Lizard Spock|Spock Rock|','2022-01-28 14:25:51',0),('3f06bcd2-d9b9-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 1 X|0 2 O|0 1 X|2 0 O|1 0 X|0 0 O|2 2 X|2 1 O|1 2 X|','2022-05-22 10:23:39',0),('40cf7a80-d9da-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 2 X|2 0 O|1 1 X|0 1 O|1 2 X|0 2 O|2 1 X|1 0 O|0 0 X|','2022-05-22 14:19:55',0),('411df268-d9dc-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 2 X|1 1 O|0 1 X|0 2 O|2 0 X|1 0 O|1 2 X|0 0 O|2 1 X|','2022-05-22 14:34:15',0),('435366fc-fdcc-406d-9401-1aed72b61188','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|0 0 O|0 1 X|1 2 O|1 0 X|2 1 O|2 2 X|0 2 O|2 0 X|','2022-02-27 04:01:03',0),('455befa3-d94d-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 0 X|1 1 O|0 1 X|2 0 O|1 2 X|2 2 O|1 0 X|0 2 O|','2022-05-21 21:30:44',0),('4980159e-d94c-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 2 X|1 0 O|0 2 X|2 1 O|2 2 X|','2022-05-21 21:23:41',0),('49b556d0-1a2b-4796-a341-fc17cce0f6e9','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Spock Lizard|Rock Rock|Scissors Lizard|Rock Rock|Rock Paper|Spock Spock|Paper Lizard|Paper Rock|','2022-03-21 22:18:54',0),('4ac6ad0e-d8a3-11ec-8a34-0ea680fee648','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|rock scissors|','2022-05-21 01:13:58',0),('4eea77c7-d936-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 1 X|1 0 O|0 2 X|2 1 O|2 0 X|','2022-05-21 18:46:21',0),('55ba8819-d151-445b-9086-c9d18fac5422','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Paper Lizard|Paper Paper|Spock Scissors|Spock Paper|Rock Lizard|Scissors Spock|','2022-02-24 11:07:31',0),('5668ecc1-d9d9-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 2 X|1 2 O|0 1 X|0 0 O|1 0 X|1 1 O|2 1 X|2 0 O|0 2 X|','2022-05-22 14:13:22',0),('567a0b68-da91-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 1 X|2 2 O|0 1 X|0 0 O|1 2 X|1 1 O|','2022-05-23 12:10:29',0),('5895dbf7-da15-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 2 X|0 2 O|1 1 X|2 0 O|0 1 X|2 1 O|2 2 X|0 0 O|1 0 X|','2022-05-22 21:22:55',0),('58efb573-0b9d-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 0 X|1 2 O|1 1 X|2 1 O|2 2 X|1 0 O|0 0 X|','2022-07-24 22:09:54',0),('59a93fff-9eb6-4655-b9b0-386b17c4b5ab','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 1 X|2 2 O|1 1 X|2 1 O|2 0 X|1 0 O|0 2 X|','2022-04-13 15:08:56',0),('5ac1d173-b6c6-4f15-a8ec-452f8a3337fa','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Rock Paper|Paper Rock|Paper Paper|Lizard Paper|Paper Rock|Scissors Scissors|Rock Spock|','2022-03-01 00:00:38',0),('5c41f74d-d94c-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 2 X|1 0 O|0 2 X|2 1 O|2 2 X|','2022-05-21 21:24:13',0),('632cfd60-0b96-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 1 X|1 2 O|0 0 X|2 1 O|2 0 X|0 2 O|2 2 X|1 1 O|1 0 X|','2022-07-24 21:20:05',0),('64b8d7ea-d9e7-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|0 0 O|1 2 X|1 0 O|1 1 X|0 2 O|2 1 X|2 2 O|0 1 X|','2022-05-22 15:53:59',0),('6d1f4fa1-dea4-11ec-8a34-0ea680fee648','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','WAH','2022-05-28 16:37:12',0),('6e3a9d89-d955-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 2 X|0 2 O|2 0 X|2 1 O|0 1 X|0 0 O|1 1 X|1 2 O|1 0 X|','2022-05-21 22:29:08',0),('6e6b8544-1f68-4e01-88b5-90cfe016a6f1','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Scissors Spock|Rock Paper|Spock Spock|Scissors Rock|Lizard Spock|Rock Paper|','2022-03-16 15:47:12',0),('6f30792d-da18-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|0 0 O|2 1 X|1 1 O|1 0 X|0 1 O|2 2 X|','2022-05-22 21:45:02',0),('77daba76-e51a-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-06-05 21:57:18',1),('7943bec7-da14-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|0 2 O|0 1 X|0 0 O|1 2 X|2 1 O|2 2 X|1 0 O|2 0 X|','2022-05-22 21:16:41',0),('7ae20e5e-da11-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|0 2 O|1 2 X|1 0 O|2 1 X|0 1 O|0 0 X|2 2 O|2 0 X|','2022-05-22 20:55:15',0),('7d8c3add-b9b6-43d0-b8fa-d1da1ba9b9cf','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|2 0 O|1 2 X|2 2 O|2 1 X|0 0 O|0 1 X|','2022-04-10 17:52:07',0),('801814d5-da81-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 0 X|1 2 O|2 0 X|0 0 O|2 2 X|1 1 O|0 2 X|2 1 O|0 1 X|','2022-05-23 10:17:07',0),('82a8436a-3d00-42bf-ab19-9a42ef8e501b','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 0 X|0 2 O|1 2 X|2 2 O|1 0 X|0 1 O|2 0 X|','2022-02-12 18:47:24',0),('83b5db33-d954-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 1 X|0 1 O|2 0 X|2 2 O|0 2 X|','2022-05-21 22:22:35',0),('83be578f-dea4-11ec-8a34-0ea680fee648','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','WAH','2022-05-28 16:37:50',0),('88cb67e4-e500-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-06-05 18:51:39',1),('88e54a09-dea2-11ec-8a34-0ea680fee648','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','WAH','2022-05-28 16:23:40',0),('8bc716d1-da10-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 2 X|0 1 O|1 0 X|1 2 O|2 2 X|2 1 O|0 0 X|1 1 O|','2022-05-22 20:48:34',0),('8d91a75b-d952-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 1 X|2 0 O|0 2 X|2 1 O|1 0 X|0 0 O|1 2 X|2 2 O|','2022-05-21 22:08:32',0),('90235fee-144f-443f-aa91-503bd13c20a0','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 2 X|1 0 O|0 1 X|2 2 O|2 1 X|1 1 O|0 0 X|0 2 O|2 0 X|','2022-02-04 01:42:32',0),('93086476-224e-4862-8c7a-77641d13ebb2','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Paper Paper|Paper Lizard|Paper Rock|Paper Lizard|Scissors Scissors|Rock Lizard|Scissors Spock|','2022-01-19 14:07:42',0),('9d96ea19-da8e-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|1 0 O|1 1 X|2 1 O|2 2 X|0 1 O|1 2 X|0 2 O|0 0 X|','2022-05-23 11:51:00',0),('a66ad805-0b95-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 1 X|0 0 O|0 2 X|2 2 O|1 0 X|2 0 O|1 2 X|1 1 O|','2022-07-24 21:14:48',0),('a84e4371-e51a-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-06-05 21:58:39',1),('a9c426c1-da16-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 2 X|0 1 O|2 0 X|2 2 O|2 1 X|1 1 O|0 2 X|0 0 O|','2022-05-22 21:32:21',0),('a9f13f90-8f6a-45ae-b314-add99b0da2eb','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|2 1 O|0 2 X|1 0 O|1 1 X|','2022-01-19 18:53:05',0),('aa61d3ae-d9fe-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 2 X|2 1 O|0 0 X|1 1 O|1 2 X|2 0 O|0 1 X|0 2 O|','2022-05-22 18:40:34',0),('ab73c23e-0b9c-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 2 O|1 0 O|0 2 O|1 2 O|','2022-07-24 22:05:03',0),('aeb0e238-0b46-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 2 X|1 0 O|0 2 X|2 0 O|1 2 X|','2022-07-24 11:49:32',0),('af9157cc-da02-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 2 X|1 1 O|1 0 X|2 1 O|0 0 X|0 1 O|','2022-05-22 19:09:21',0),('b10b7303-da11-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 2 X|1 0 O|0 0 X|1 2 O|2 0 X|0 1 O|1 1 X|','2022-05-22 20:56:46',0),('b17d2e65-dafe-47c7-8dbc-b59a3dd16476','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Paper Rock|Paper Lizard|Spock Spock|Spock Spock|Spock Lizard|Paper Lizard|Scissors Paper|','2022-04-27 20:41:42',0),('b6408872-580f-47d1-b709-b4cf2e796f49','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Rock Scissors|Paper Lizard|Lizard Rock|Spock Scissors|Scissors Paper|','2022-01-17 08:42:10',0),('b8189dfa-da93-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 0 X|2 0 O|1 1 X|2 1 O|0 2 X|0 0 O|1 2 X|','2022-05-23 12:27:32',0),('b8706d3b-da17-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 0 X|0 2 O|0 1 X|2 1 O|1 2 X|2 2 O|1 0 X|2 0 O|','2022-05-22 21:39:55',0),('be4f70dc-c2a1-4184-9a3b-2382c4ff7d4e','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Spock Lizard|Paper Scissors|Spock Rock|Rock Lizard|Scissors Lizard|','2022-02-17 05:15:53',0),('c5ac9681-0b96-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 2 X|1 2 O|1 0 X|1 1 O|2 2 X|0 0 O|2 1 X|2 0 O|0 1 X|','2022-07-24 21:22:50',0),('c85faa78-1ad4-4085-bc80-4b57368b17bd','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|1 2 O|2 0 X|0 1 O|0 2 X|','2022-04-11 17:11:29',0),('c91b26bd-d9f2-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|1 0 O|0 0 X|2 2 O|1 2 X|2 1 O|0 1 X|0 2 O|1 1 X|','2022-05-22 17:15:32',0),('c9cf4783-24af-4057-afdd-156d6247db46','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Lizard Scissors|Rock Rock|Spock Rock|Scissors Rock|Rock Scissors|Lizard Rock|','2022-02-15 07:15:14',0),('ce3556db-d9d9-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 1 X|1 0 O|1 2 X|0 1 O|2 1 X|0 2 O|2 0 X|0 0 O|','2022-05-22 14:16:43',0),('ce8afa1f-e51e-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-06-05 22:28:21',1),('d0f3be22-e8c8-4d00-b7d5-efa01dafccd0','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 0 X|2 2 O|1 2 X|0 1 O|2 0 X|0 2 O|2 1 X|1 1 O|0 0 X|','2022-03-01 20:03:56',0),('d207fc23-da10-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 0 X|2 0 O|0 0 X|0 1 O|1 2 X|2 1 O|2 2 X|1 1 O|','2022-05-22 20:50:31',0),('d3211ffc-85ee-48fa-919f-810c98b691bf','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 1 X|0 0 O|1 2 X|1 0 O|2 2 X|2 0 O|','2022-02-07 09:19:41',0),('d4ad75a1-427e-4ac5-b7d2-1578ea4a76e5','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 0 X|1 0 O|0 1 X|0 2 O|2 0 X|1 2 O|1 1 X|2 2 O|','2022-04-22 13:04:59',0),('d5defcfc-c3e3-430a-a4cc-551f162cf117','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Spock Lizard|Rock Lizard|Lizard Spock|Lizard Rock|Spock Paper|','2022-01-15 04:22:10',0),('d8168a96-da0f-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|1 2 O|2 2 X|2 1 O|0 2 X|1 1 O|1 0 X|0 1 O|','2022-05-22 20:43:32',0),('d8305c23-c3ed-4911-892b-e8aeacafc9a1','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 1 X|1 2 O|0 0 X|1 1 O|0 2 X|2 2 O|2 0 X|0 1 O|1 0 X|','2022-02-03 16:20:37',0),('d936ea29-d9db-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|2 2 O|0 0 X|1 0 O|1 2 X|0 2 O|2 0 X|2 1 O|0 1 X|','2022-05-22 14:31:20',0),('da8ad1e1-4d38-408e-b3a3-6d950e4d5db3','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 0 X|0 0 O|0 2 X|2 1 O|1 1 X|0 1 O|2 2 X|2 0 O|1 2 X|','2022-03-21 09:47:44',0),('db3a6a02-da11-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|2 1 O|0 2 X|2 2 O|0 1 X|0 0 O|1 0 X|1 1 O|','2022-05-22 20:57:56',0),('dd03941f-e590-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 1 X|1 2 O|1 1 X|0 0 O|2 1 X|','2022-06-06 12:04:48',0),('dd06a8fb-da26-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|0 0 O|2 2 X|0 2 O|1 0 X|2 1 O|0 1 X|1 2 O|1 1 X|','2022-05-22 23:28:19',0),('dea2c1a5-dccd-4cf1-b3b1-60f69f01a4f3','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Spock Scissors|Rock Lizard|Lizard Rock|Scissors Rock|Paper Scissors|','2022-04-16 09:21:55',0),('deadf2ac-e51c-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-06-05 22:14:29',1),('e0106457-e4ff-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-06-05 18:46:56',1),('e1a961f9-da15-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 1 X|0 2 O|1 1 X|0 0 O|2 2 X|1 2 O|2 1 X|','2022-05-22 21:26:45',0),('e4c12bea-d9dc-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|1 2 O|0 0 X|1 1 O|2 1 X|0 1 O|1 0 X|','2022-05-22 14:38:49',0),('e5020fcc-d93c-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 2 X|1 0 O|0 2 X|2 1 O|2 2 X|','2022-05-21 19:33:30',0),('e7cc1eb8-0e84-4bec-ada0-09652e9f5873','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Lizard Spock|Lizard Rock|Scissors Lizard|Spock Spock|Paper Spock|Rock Rock|Spock Lizard|','2022-02-22 18:34:42',0),('e8726b07-9400-42cd-a34d-86483101bc1b','01934c61-c6f6-11ec-a02e-0ab3cd6d5505','|Spock Rock|Lizard Spock|Paper Lizard|Rock Spock|Paper Scissors|','2022-01-08 02:07:34',0),('ea5bbcc2-da19-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 0 X|2 0 O|1 2 X|2 2 O|0 2 X|0 1 O|1 1 X|','2022-05-22 21:55:38',0),('eef5539b-e519-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-06-05 21:53:28',1),('eefbaf7b-d957-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|0 2 X|1 0 O|1 2 X|0 0 O|2 2 X|','2022-05-21 22:47:03',0),('effb6935-5916-412a-ad6b-7c01095c1c73','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 2 X|1 1 O|2 1 X|0 2 O|1 0 X|2 0 O|','2022-01-13 13:06:12',0),('f214e3b0-d938-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 1 X|1 0 O|0 2 X|2 1 O|2 0 X|','2022-05-21 19:05:14',0),('f742ec50-0b9c-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 1 X|0 0 O|0 1 X|2 0 O|0 2 X|2 2 O|1 0 X|1 2 O|1 1 X|','2022-07-24 22:07:10',0),('f96cc4c3-d947-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 2 X|1 0 O|0 2 X|2 1 O|2 0 X|','2022-05-21 20:52:49',0),('fa1d2401-e58f-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|1 0 X|0 1 O|1 2 X|2 1 O|0 0 X|2 0 O|2 2 X|1 1 O|','2022-06-06 11:58:28',0),('fb47de8f-da16-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|2 0 X|2 1 O|0 1 X|0 0 O|0 2 X|1 2 O|1 0 X|1 1 O|2 2 X|','2022-05-22 21:34:38',0),('fc0a0114-0b98-11ed-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','','2022-07-24 21:38:40',1),('fd17ca81-d9fb-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|0 2 X|1 2 O|0 1 X|2 0 O|1 1 X|2 2 O|1 0 X|0 0 O|2 1 X|','2022-05-22 18:21:24',0),('feee7678-e4ee-11ec-8a34-0ea680fee648','22531f29-cd83-11ec-8a34-0ea680fee648','|2 1 X|1 1 O|2 0 X|0 1 O|1 0 X|0 0 O|1 2 X|2 2 O|','2022-06-05 16:46:07',0),('ff19dd1a-da12-11ec-8a34-0ea680fee648','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','|1 1 X|1 2 O|1 0 X|2 2 O|2 1 X|2 0 O|0 0 X|0 1 O|0 2 X|','2022-05-22 21:06:06',0);
/*!40000 ALTER TABLE `MATCH_LOG` ENABLE KEYS */;
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

-- Dump completed on 2022-07-25 22:44:06
