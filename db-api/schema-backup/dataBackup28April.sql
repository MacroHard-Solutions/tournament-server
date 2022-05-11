-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
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
-- Dumping data for table `ADDRESS`
--

LOCK TABLES `ADDRESS` WRITE;
/*!40000 ALTER TABLE `ADDRESS` DISABLE KEYS */;
INSERT INTO `ADDRESS` VALUES ('1e7f693c-32c2-4b01-91d0-67a4d8741d2e','143.124.47.60',5302),('20d358ff-e9a6-4a74-8e91-7242b4f1e3d7','68.117.166.152',5838),('271468da-da2c-4aa0-add8-5263e7e129cd','74.110.128.39',8125),('28aa20cd-a1c6-49ed-a951-69efa31ddb84','149.193.153.13',2613),('36b8b5a4-bcb5-434f-9027-59e82299d5e1','197.3.86.226',9195),('4c0e9f47-c474-4f46-8563-60fb48b88b6c','25.206.139.193',6817),('6c57bad6-4b83-42b1-88a2-3bca282e1998','3.144.106.119',6918),('82239217-454d-4ef6-bc66-12a99d494ed7','145.224.212.84',4213),('a4dd3bcd-ca94-4aff-a0b1-241a9f487e58','130.123.222.13',8444),('a81207ab-df59-4847-a2b1-dc6eca7a6500','98.111.234.184',3088),('b2e6418d-6b45-453b-afc2-6c5e833e79e4','90.242.93.51',7223),('b4820deb-84d0-4990-b984-01e0cbf69b92','92.143.14.85',293),('be074fd6-9b33-45b9-b6ec-18c6505becf0','110.56.21.232',5699),('beb170c7-27a5-4810-8d6f-7bdb687e6b5b','204.149.182.10',1678),('db94ee3e-3104-4ce3-b710-bd3b0bc48c9d','130.159.238.107',7121),('de075ab8-2c17-49e9-81e9-fa41063dc5fb','206.126.0.27',1031);
/*!40000 ALTER TABLE `ADDRESS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `AGENT`
--

LOCK TABLES `AGENT` WRITE;
/*!40000 ALTER TABLE `AGENT` DISABLE KEYS */;
INSERT INTO `AGENT` VALUES ('0e852e78-207e-4bc8-bb9d-215ab10cc385','ef368c5d-b01e-48c6-81bd-33e15f27bb2f','de075ab8-2c17-49e9-81e9-fa41063dc5fb','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('173afbb4-f4d0-446f-ac79-89695ea643bc','ef368c5d-b01e-48c6-81bd-33e15f27bb2f','82239217-454d-4ef6-bc66-12a99d494ed7','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1),('1aea2e2e-be8a-4aaa-8c43-5fe4bb60467e','e0e35f91-5b72-487d-bad9-54221e08b22f','4c0e9f47-c474-4f46-8563-60fb48b88b6c','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1),('26ef3200-98dd-469c-985e-3c0811c495e4','68c9c890-2c4d-4fde-ae53-ce20c9151f49','271468da-da2c-4aa0-add8-5263e7e129cd','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1),('37729ba7-b6ec-4d41-aa04-e8d9a4bc19e6','23d32596-6872-4173-b79e-94d7afb45d81','20d358ff-e9a6-4a74-8e91-7242b4f1e3d7','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1),('6cb7eb05-7012-44a5-945d-ac10a6782999','b79d39e9-9f8d-4534-b842-564b39e7cbb7','be074fd6-9b33-45b9-b6ec-18c6505becf0','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('7ddc7016-9a9a-4e06-9102-3d6b96da2f1b','e11036e6-dfa4-419d-90a4-4374ae609d4c','db94ee3e-3104-4ce3-b710-bd3b0bc48c9d','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('a687bd27-a9de-4385-aee1-e2d23a405446','820a3ff2-55cb-4e6d-9763-94f762e9c80d','28aa20cd-a1c6-49ed-a951-69efa31ddb84','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1),('b724d13a-32e0-400b-a6ac-9b499a41c511','e11036e6-dfa4-419d-90a4-4374ae609d4c','6c57bad6-4b83-42b1-88a2-3bca282e1998','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1),('d1e7c053-ce94-4bc0-9a7c-e7949de6da53','820a3ff2-55cb-4e6d-9763-94f762e9c80d','b4820deb-84d0-4990-b984-01e0cbf69b92','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('d1ef799e-689f-4d98-8358-0f42c49fb3b1','23d32596-6872-4173-b79e-94d7afb45d81','a81207ab-df59-4847-a2b1-dc6eca7a6500','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('e2474139-8d71-45f4-a7c8-5a69329a1ebe','68c9c890-2c4d-4fde-ae53-ce20c9151f49','b2e6418d-6b45-453b-afc2-6c5e833e79e4','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('e3799ca9-1778-4171-93af-b91a93a01ec3','b79d39e9-9f8d-4534-b842-564b39e7cbb7','36b8b5a4-bcb5-434f-9027-59e82299d5e1','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1),('f64da681-86c9-4b68-a266-7ae4b8668449','0fbe7dd3-20b4-400a-ad28-53d86dd36cd2','a4dd3bcd-ca94-4aff-a0b1-241a9f487e58','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('fb7edb19-1d5f-4f58-a07e-33e42f3a7310','e0e35f91-5b72-487d-bad9-54221e08b22f','beb170c7-27a5-4810-8d6f-7bdb687e6b5b','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505',1500,-1),('fdf8799a-492d-43d5-a30e-77edadd0d8b1','0fbe7dd3-20b4-400a-ad28-53d86dd36cd2','1e7f693c-32c2-4b01-91d0-67a4d8741d2e','01934c61-c6f6-11ec-a02e-0ab3cd6d5505',1500,-1);
/*!40000 ALTER TABLE `AGENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `GAME`
--

LOCK TABLES `GAME` WRITE;
/*!40000 ALTER TABLE `GAME` DISABLE KEYS */;
INSERT INTO `GAME` VALUES ('886edf86-c6f5-11ec-a02e-0ab3cd6d5505','Tic-Tac-Toe','TTT.java','TTT.png'),('b772386d-c6f5-11ec-a02e-0ab3cd6d5505','Rock-Paper-Scissors-Lizard-Spock','RPSLS.java','RPSLS.png');
/*!40000 ALTER TABLE `GAME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `MATCH_LOG`
--

LOCK TABLES `MATCH_LOG` WRITE;
/*!40000 ALTER TABLE `MATCH_LOG` DISABLE KEYS */;
INSERT INTO `MATCH_LOG` VALUES ('1b05064f-31db-4b4f-8a4e-6b091878c405','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','sdfdsf','0000-00-00 00:00:00'),('8fab6ade-c704-11ec-a02e-0ab3cd6d5505','e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','LKAHFSD','2022-04-28 15:04:54');
/*!40000 ALTER TABLE `MATCH_LOG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `RANKING`
--

LOCK TABLES `RANKING` WRITE;
/*!40000 ALTER TABLE `RANKING` DISABLE KEYS */;
/*!40000 ALTER TABLE `RANKING` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `TOURNAMENT`
--

LOCK TABLES `TOURNAMENT` WRITE;
/*!40000 ALTER TABLE `TOURNAMENT` DISABLE KEYS */;
INSERT INTO `TOURNAMENT` VALUES ('01934c61-c6f6-11ec-a02e-0ab3cd6d5505','Rock-Paper-Scissors-Lizard-Spock Tourney','b772386d-c6f5-11ec-a02e-0ab3cd6d5505'),('e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505','Tic-Tac-Toe-Tourney','886edf86-c6f5-11ec-a02e-0ab3cd6d5505');
/*!40000 ALTER TABLE `TOURNAMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES ('0fbe7dd3-20b4-400a-ad28-53d86dd36cd2','Michael','Le Forestier','MikeyMike','2322970@students.wits.ac.za','hockey',0,0,'default.png'),('23d32596-6872-4173-b79e-94d7afb45d81','Katlego','Kungoane','KatTheGod','2320690@students.wits.ac.za','people998',0,0,'default.png'),('68c9c890-2c4d-4fde-ae53-ce20c9151f49','Gregory','Cowan','lordGregorious','2395453@students.wits.ac.za','CAM is my ham',0,0,'default.png'),('820a3ff2-55cb-4e6d-9763-94f762e9c80d','Musawenkosi','Gumpu','Moose918','2326254@students.wits.ac.za','musa',0,0,'default.png'),('90ca0fef-c71d-11ec-a02e-0ab3cd6d5505','Ahmad','Lesch','XSS913','Dana_Cassin@example.com','9i62ea1k34',1,1,'default.png'),('a5831146-c71c-11ec-a02e-0ab3cd6d5505','Noemy','Maggio','India288','Junius78@example.net','mtsocnimxg',1,1,'default.png'),('abc528d0-c71d-11ec-a02e-0ab3cd6d5505','Jovani','Rutherford','AGP112','Dianna98@example.net','a0kid9qbto',1,1,'default.png'),('b79d39e9-9f8d-4534-b842-564b39e7cbb7','Verushan','Naidoo','Elementrix','2374896@students.wits.ac.za','Keanu',0,0,'default.png'),('d6bb00bd-c735-11ec-a944-0ea680fee648','Toney','Durgan','Steel183','Martin99@example.org','wlrjjt8hjr',1,1,'default.png'),('e0e35f91-5b72-487d-bad9-54221e08b22f','Mulanga','Sibeli','Lover Boy','2126182@students.wits.ac.za','mulanga',0,0,'default.png'),('e11036e6-dfa4-419d-90a4-4374ae609d4c','Kain','Reddy','Kixn','2307935@students.wits.ac.za','react',0,0,'default.png'),('ef368c5d-b01e-48c6-81bd-33e15f27bb2f','Thabo','Mohapi','Zizi','2150723@students.wits.ac.za','Papa Drake',0,0,'default.png');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
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

-- Dump completed on 2022-04-28 23:11:44
