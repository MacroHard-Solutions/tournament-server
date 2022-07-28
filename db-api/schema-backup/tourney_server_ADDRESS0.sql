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
-- Table structure for table `ADDRESS`
--

DROP TABLE IF EXISTS `ADDRESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ADDRESS` (
  `ADDRESS_ID` varchar(45) NOT NULL COMMENT 'The UUID of an agent''s address',
  `ADDRESS_IP` varchar(15) NOT NULL COMMENT 'Agent''s IP address',
  `ADDRESS_PORT` int unsigned NOT NULL COMMENT 'Agent''s port #',
  PRIMARY KEY (`ADDRESS_ID`),
  UNIQUE KEY `ADDRESS_ID_UNIQUE` (`ADDRESS_ID`) /*!80000 INVISIBLE */,
  UNIQUE KEY `IP_PORT_UNIQUE` (`ADDRESS_IP`,`ADDRESS_PORT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADDRESS`
--

LOCK TABLES `ADDRESS` WRITE;
/*!40000 ALTER TABLE `ADDRESS` DISABLE KEYS */;
INSERT INTO `ADDRESS` VALUES ('89f98699-e091-11ec-8a34-0ea680fee648','0.0.0.0.0.',8001),('7efb931f-e4ef-11ec-8a34-0ea680fee648','0.0.0.0.0.0.',8001),('b2e6418d-6b45-453b-afc2-6c5e833e79e4','0.0.0.0.0.0.0.0',100000),('be074fd6-9b33-45b9-b6ec-18c6505becf0','110.56.21.232',5699),('a4dd3bcd-ca94-4aff-a0b1-241a9f487e58','130.123.222.13',8444),('db94ee3e-3104-4ce3-b710-bd3b0bc48c9d','130.159.238.107',7121),('1e7f693c-32c2-4b01-91d0-67a4d8741d2e','143.124.47.60',5302),('82239217-454d-4ef6-bc66-12a99d494ed7','145.224.212.84',4213),('28aa20cd-a1c6-49ed-a951-69efa31ddb84','149.193.153.13',2613),('36b8b5a4-bcb5-434f-9027-59e82299d5e1','197.3.86.226',9195),('beb170c7-27a5-4810-8d6f-7bdb687e6b5b','204.149.182.10',1678),('de075ab8-2c17-49e9-81e9-fa41063dc5fb','206.126.0.27',1031),('4c0e9f47-c474-4f46-8563-60fb48b88b6c','25.206.139.193',6817),('6c57bad6-4b83-42b1-88a2-3bca282e1998','3.144.106.119',6918),('c3e3d96d-da0e-11ec-8a34-0ea680fee648','3.239.233.248',8001),('467f1657-e3e8-11ec-8a34-0ea680fee648','3.93.196.237',8000),('8494c24b-e3e8-11ec-8a34-0ea680fee648','35.175.115.17',8001),('ab626528-d935-11ec-8a34-0ea680fee648','52.91.54.222',8000),('20d358ff-e9a6-4a74-8e91-7242b4f1e3d7','68.117.166.152',5838),('271468da-da2c-4aa0-add8-5263e7e129cd','74.110.128.39',8125),('b4820deb-84d0-4990-b984-01e0cbf69b92','92.143.14.85',293),('a81207ab-df59-4847-a2b1-dc6eca7a6500','98.111.234.184',3088),('6d361982-0e75-11ed-8a34-0ea680fee648','ip2020202',10101010);
/*!40000 ALTER TABLE `ADDRESS` ENABLE KEYS */;
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

-- Dump completed on 2022-07-28 16:09:45