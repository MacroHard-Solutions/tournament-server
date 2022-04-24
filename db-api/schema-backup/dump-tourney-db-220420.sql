-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: tourney-server-database.c2ncyvtifq7i.us-east-1.rds.amazonaws.com    Database: db_tourney_server
-- ------------------------------------------------------
-- Server version	8.0.27

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
/*!40000 ALTER TABLE `ADDRESS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `AGENT`
--

LOCK TABLES `AGENT` WRITE;
/*!40000 ALTER TABLE `AGENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `AGENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `GAME`
--

LOCK TABLES `GAME` WRITE;
/*!40000 ALTER TABLE `GAME` DISABLE KEYS */;
INSERT INTO `GAME` VALUES ('20f0524f-be44-11ec-b7cb-02abc4ca7a81','nisi harum id','communications_quantifying_synergize.ini'),('5566e653-be3c-11ec-b7cb-02abc4ca7a81','autem voluptates et','smtp_dynamic.wbmp'),('65dfadf6-be3c-11ec-b7cb-02abc4ca7a81','laudantium aliquid ut','local_area_network.aif'),('6eba86e8-be39-11ec-b7cb-02abc4ca7a81','error est et',''),('73723fca-be43-11ec-b7cb-02abc4ca7a81','eaque quis illo','handmade_metal_chicken_jewelery.wmx'),('a45e100f-be3a-11ec-b7cb-02abc4ca7a81','et nihil ratione','index.class'),('ac61fcea-be3c-11ec-b7cb-02abc4ca7a81','molestiae maiores doloremque','ergonomic_green.scs'),('e5aee711-be39-11ec-b7cb-02abc4ca7a81','sint nulla recusandae','bedfordshire_mobility_generating.xlt');
/*!40000 ALTER TABLE `GAME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `MATCH_LOG`
--

LOCK TABLES `MATCH_LOG` WRITE;
/*!40000 ALTER TABLE `MATCH_LOG` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `TOURNAMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES ('06526494-0e1b-470b-84c5-968092a86b39','Oda','Okuneva','goatcode','stevej@wits.com','hello',0,0),('09f6f417-601d-4206-aa81-33ba2cce6d9f','Name','Howell','cr7','cristano@manu.com','hello',0,0),('0a56873b-f954-4d93-af72-6531ced7baa4','Lavada','Miller','cr9','cristiano','hello',0,0),('1fcab54c-94af-449c-b65a-476164c351bc','Jamir','Hauck','el pepe','wefwf','hello',0,0),('25c9520e-8901-4147-97da-e574333e595e','Alexis','Orn','elementrix','22333@gmail.com','hello',0,0),('2e342717-5303-4da6-ba44-4244c52ac954','xbox','nathan','lmfao','wkjeubd@gmail.com','hello',0,0),('30df78af-556d-491f-9b68-515803ed665a','Lester','Pacocha','venom','venom@marvel.com','hello',0,0),('35d9941e-a0e4-470b-abde-2438983968ec','River','Rutherford','','s','',0,0),('5046abd7-c34c-4b5d-a5d7-d659e2373a68','veru','nathan','234','wkjeubd@gmail.com','hello',0,0),('8272008b-e809-40f2-acfc-0a0a64019b3e','Chloe','Hackett','goatercoder','steviej@wits.ac.za','hello',0,0),('86f94c08-9849-4486-8ef7-c44fd0e57908','Musa','Gumpu','2217826','2217826@mhs.com','aezakmi',0,0),('9a27bf60-a2e8-43f7-bd4f-7a1530df4a91','Agnes','Veum','erferf','erfewrf','h',0,0),('bec910fd-67e7-4c8d-af05-5f09d695469b','veru','nathan','2346333333333333333333333333','wkjeubd@gmail.com','hello',0,0),('d71100df-77bd-4f8d-8bad-8989f6aa93b4','xbox','nathan','lmao','wkjeubd@gmail.com','hello',0,0),('e1e723f4-4ad1-4321-a79a-435df90a2988','Carolyne','Baumbach','jin','tekken@bandai.games','hello',0,0),('e3390206-b405-4905-a7ac-862c7fc61757','Kylee','Streich','5416','nico@wits.com','hello',0,0),('f53a3b43-bf4f-41f0-91ef-10297c8f10d0','Lonzo','Boyer','cr10','wedwefdw','hello',0,0),('fd7d1aa4-c530-4489-885f-de23fa8718b0','Marlon','Lakin','cr8','cristiano','hello',0,0);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-20 13:19:06
