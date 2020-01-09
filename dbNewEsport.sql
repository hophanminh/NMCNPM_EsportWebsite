CREATE DATABASE  IF NOT EXISTS `esport` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `esport`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: esport
-- ------------------------------------------------------
-- Server version	8.0.18

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

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `idAccount` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`idAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` (`idAccount`, `username`, `password`, `email`) VALUES (1,'admin1','root','someone@example.com'),(2,'admin2','root','someone@example.com'),(3,'admin3','root','someone@example.com'),(4,'admin123','$2a$10$CSwY2h83i/VjVUMpNGBfG.jzAb1VSloF//KMMRNM/KBp8JL3pg9SO','masa23vn@gmail.com'),(5,'masa23vn','$2a$10$WhhEFj/ipR5T0gEK8NKhVu7RbWjYgWaZiJlV504DifQl/yg1SFcQO','masa24vn@gmail.com');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailmatch`
--

DROP TABLE IF EXISTS `detailmatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailmatch` (
  `idDetailMatch` int(11) NOT NULL AUTO_INCREMENT,
  `kill1` int(11) DEFAULT NULL,
  `kill2` int(11) DEFAULT NULL,
  `died1` int(11) DEFAULT NULL,
  `died2` int(11) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `match_roundMatch` int(11) NOT NULL COMMENT 'ID of match in branch',
  `match_branch` int(11) NOT NULL COMMENT '0: win branch\n 1: lose branch 2: final',
  `match_tournament_idTournament` int(11) NOT NULL,
  PRIMARY KEY (`idDetailMatch`,`match_roundMatch`,`match_branch`,`match_tournament_idTournament`),
  KEY `fk_detailmatch_match1_idx` (`match_roundMatch`,`match_branch`,`match_tournament_idTournament`),
  CONSTRAINT `fk_detailmatch_match1` FOREIGN KEY (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`) REFERENCES `match` (`roundMatch`, `branch`, `tournament_idTournament`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailmatch`
--

LOCK TABLES `detailmatch` WRITE;
/*!40000 ALTER TABLE `detailmatch` DISABLE KEYS */;
INSERT INTO `detailmatch` (`idDetailMatch`, `kill1`, `kill2`, `died1`, `died2`, `time`, `match_roundMatch`, `match_branch`, `match_tournament_idTournament`) VALUES (33,NULL,NULL,NULL,NULL,NULL,1,0,4),(34,NULL,NULL,NULL,NULL,NULL,2,0,4),(35,NULL,NULL,NULL,NULL,NULL,3,0,4),(36,NULL,NULL,NULL,NULL,NULL,4,0,4),(37,NULL,NULL,NULL,NULL,NULL,5,0,4),(38,NULL,NULL,NULL,NULL,NULL,6,0,4),(39,NULL,NULL,NULL,NULL,NULL,7,0,4),(40,NULL,NULL,NULL,NULL,NULL,8,0,4),(41,NULL,NULL,NULL,NULL,NULL,9,0,4),(42,NULL,NULL,NULL,NULL,NULL,10,0,4),(43,NULL,NULL,NULL,NULL,NULL,11,0,4),(44,NULL,NULL,NULL,NULL,NULL,12,0,4),(45,NULL,NULL,NULL,NULL,NULL,13,0,4),(46,NULL,NULL,NULL,NULL,NULL,14,0,4),(47,NULL,NULL,NULL,NULL,NULL,15,0,4),(48,NULL,NULL,NULL,NULL,NULL,1,1,4),(49,NULL,NULL,NULL,NULL,NULL,2,1,4),(50,NULL,NULL,NULL,NULL,NULL,3,1,4),(51,NULL,NULL,NULL,NULL,NULL,4,1,4),(52,NULL,NULL,NULL,NULL,NULL,5,1,4),(53,NULL,NULL,NULL,NULL,NULL,6,1,4),(54,NULL,NULL,NULL,NULL,NULL,7,1,4),(55,NULL,NULL,NULL,NULL,NULL,8,1,4),(56,NULL,NULL,NULL,NULL,NULL,9,1,4),(57,NULL,NULL,NULL,NULL,NULL,10,1,4),(58,NULL,NULL,NULL,NULL,NULL,11,1,4),(59,NULL,NULL,NULL,NULL,NULL,12,1,4),(60,NULL,NULL,NULL,NULL,NULL,13,1,4),(61,NULL,NULL,NULL,NULL,NULL,14,1,4),(62,NULL,NULL,NULL,NULL,NULL,1,2,4),(63,NULL,NULL,NULL,NULL,NULL,2,2,4),(64,NULL,NULL,NULL,NULL,NULL,1,0,5),(65,NULL,NULL,NULL,NULL,NULL,2,0,5),(66,NULL,NULL,NULL,NULL,NULL,3,0,5),(67,NULL,NULL,NULL,NULL,NULL,4,0,5),(68,NULL,NULL,NULL,NULL,NULL,5,0,5),(69,NULL,NULL,NULL,NULL,NULL,6,0,5),(70,NULL,NULL,NULL,NULL,NULL,7,0,5),(71,NULL,NULL,NULL,NULL,NULL,8,0,5),(72,NULL,NULL,NULL,NULL,NULL,9,0,5),(73,NULL,NULL,NULL,NULL,NULL,10,0,5),(74,NULL,NULL,NULL,NULL,NULL,11,0,5),(75,NULL,NULL,NULL,NULL,NULL,12,0,5),(76,NULL,NULL,NULL,NULL,NULL,13,0,5),(77,NULL,NULL,NULL,NULL,NULL,14,0,5),(78,NULL,NULL,NULL,NULL,NULL,15,0,5),(79,NULL,NULL,NULL,NULL,NULL,1,1,5),(80,NULL,NULL,NULL,NULL,NULL,2,1,5),(81,NULL,NULL,NULL,NULL,NULL,3,1,5),(82,NULL,NULL,NULL,NULL,NULL,4,1,5),(83,NULL,NULL,NULL,NULL,NULL,5,1,5),(84,NULL,NULL,NULL,NULL,NULL,6,1,5),(85,NULL,NULL,NULL,NULL,NULL,7,1,5),(86,NULL,NULL,NULL,NULL,NULL,8,1,5),(87,NULL,NULL,NULL,NULL,NULL,9,1,5),(88,NULL,NULL,NULL,NULL,NULL,10,1,5),(89,NULL,NULL,NULL,NULL,NULL,11,1,5),(90,NULL,NULL,NULL,NULL,NULL,12,1,5),(91,NULL,NULL,NULL,NULL,NULL,13,1,5),(92,NULL,NULL,NULL,NULL,NULL,14,1,5),(93,NULL,NULL,NULL,NULL,NULL,1,2,5),(94,NULL,NULL,NULL,NULL,NULL,2,2,5);
/*!40000 ALTER TABLE `detailmatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match` (
  `roundMatch` int(11) NOT NULL COMMENT 'ID of match in branch',
  `branch` int(11) NOT NULL COMMENT '0: win branch\n 1: lose branch 2: final',
  `dateMatch` datetime DEFAULT NULL,
  `statusMatch` int(11) NOT NULL COMMENT '0: Not yet\\n1: Happening\\n2: Done',
  `tournament_idTournament` int(11) NOT NULL,
  PRIMARY KEY (`roundMatch`,`branch`,`tournament_idTournament`),
  KEY `fk_match_tournament1_idx` (`tournament_idTournament`),
  CONSTRAINT `fk_match_tournament1` FOREIGN KEY (`tournament_idTournament`) REFERENCES `tournament` (`idTournament`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (1,0,NULL,0,4),(1,0,NULL,0,5),(1,1,NULL,0,4),(1,1,NULL,0,5),(1,2,NULL,0,4),(1,2,NULL,0,5),(2,0,NULL,0,4),(2,0,NULL,0,5),(2,1,NULL,0,4),(2,1,NULL,0,5),(2,2,NULL,0,4),(2,2,NULL,0,5),(3,0,NULL,0,4),(3,0,NULL,0,5),(3,1,NULL,0,4),(3,1,NULL,0,5),(4,0,NULL,0,4),(4,0,NULL,0,5),(4,1,NULL,0,4),(4,1,NULL,0,5),(5,0,NULL,0,4),(5,0,NULL,0,5),(5,1,NULL,0,4),(5,1,NULL,0,5),(6,0,NULL,0,4),(6,0,NULL,0,5),(6,1,NULL,0,4),(6,1,NULL,0,5),(7,0,NULL,0,4),(7,0,NULL,0,5),(7,1,NULL,0,4),(7,1,NULL,0,5),(8,0,NULL,0,4),(8,0,NULL,0,5),(8,1,NULL,0,4),(8,1,NULL,0,5),(9,0,NULL,0,4),(9,0,NULL,0,5),(9,1,NULL,0,4),(9,1,NULL,0,5),(10,0,NULL,0,4),(10,0,NULL,0,5),(10,1,NULL,0,4),(10,1,NULL,0,5),(11,0,NULL,0,4),(11,0,NULL,0,5),(11,1,NULL,0,4),(11,1,NULL,0,5),(12,0,NULL,0,4),(12,0,NULL,0,5),(12,1,NULL,0,4),(12,1,NULL,0,5),(13,0,NULL,0,4),(13,0,NULL,0,5),(13,1,NULL,0,4),(13,1,NULL,0,5),(14,0,NULL,0,4),(14,0,NULL,0,5),(14,1,NULL,0,4),(14,1,NULL,0,5),(15,0,NULL,0,4),(15,0,NULL,0,5);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `overview`
--

DROP TABLE IF EXISTS `overview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `overview` (
  `mostkillPlayer` int(11) DEFAULT NULL,
  `Champion` int(11) DEFAULT NULL,
  `viewers` int(11) DEFAULT NULL,
  `Discription` varchar(500) DEFAULT NULL,
  `tournament_idTournament` int(11) NOT NULL,
  PRIMARY KEY (`tournament_idTournament`),
  CONSTRAINT `fk_overview_tournament` FOREIGN KEY (`tournament_idTournament`) REFERENCES `tournament` (`idTournament`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `overview`
--

LOCK TABLES `overview` WRITE;
/*!40000 ALTER TABLE `overview` DISABLE KEYS */;
/*!40000 ALTER TABLE `overview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `idPlayer` int(11) NOT NULL AUTO_INCREMENT,
  `usernamePlayer` varchar(45) NOT NULL,
  `realnamePlayer` varchar(45) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `statusPlayer` int(11) DEFAULT NULL COMMENT '0: Win branch\\n1: Lose branch\\n2: Out\\n3: Difference\\n',
  `tournament_idTournament` int(11) NOT NULL,
  PRIMARY KEY (`idPlayer`,`tournament_idTournament`),
  KEY `fk_player_tournament1_idx` (`tournament_idTournament`),
  CONSTRAINT `fk_player_tournament1` FOREIGN KEY (`tournament_idTournament`) REFERENCES `tournament` (`idTournament`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (34,'player1','player1','1999-12-31',2,4),(35,'player2','player2','1999-12-31',2,4),(36,'player3','player3','1999-12-31',2,4),(37,'player4','player4','1999-12-31',2,4),(38,'player5','player5','1999-12-31',2,4),(39,'player6','player6','1999-12-31',2,4),(40,'player7','player7','1999-12-31',2,4),(41,'player8','player8','1999-12-31',2,4),(42,'player9','player9','1999-12-31',2,4),(43,'player10','player10','1999-12-31',2,4),(44,'player11','player11','1999-12-31',2,4),(45,'player12','player12','1999-12-31',2,4),(46,'player13','player13','1999-12-31',2,4),(47,'player14','player14','1999-12-31',2,4),(48,'player15','player15','1999-12-31',2,4),(49,'player16','player16','1999-12-31',2,4),(50,'player1','player1','1999-12-31',2,5),(51,'player2','player2','1999-12-31',2,5),(52,'player3','player3','1999-12-31',2,5),(53,'player4','player4','1999-12-31',2,5),(54,'player5','player5','1999-12-31',2,5),(55,'player6','player6','1999-12-31',2,5),(56,'player7','player7','1999-12-31',2,5),(57,'player8','player8','1999-12-31',2,5),(58,'player9','player9','1999-12-31',2,5),(59,'player10','player10','1999-12-31',2,5),(60,'player11','player11','1999-12-31',2,5),(61,'player12','player12','1999-12-31',2,5),(62,'player13','player13','1999-12-31',2,5),(63,'player14','player14','1999-12-31',2,5),(64,'player15','player15','1999-12-31',2,5),(65,'player16','player16','1999-12-31',2,5);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_has_match`
--

DROP TABLE IF EXISTS `player_has_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_has_match` (
  `match_roundMatch` int(11) NOT NULL,
  `match_branch` int(11) NOT NULL,
  `match_tournament_idTournament` int(11) NOT NULL,
  `player_idPlayer1` int(11) DEFAULT NULL,
  `player_idPlayer2` int(11) DEFAULT NULL,
  `score1` int(11) DEFAULT NULL,
  `score2` int(11) DEFAULT NULL,
  PRIMARY KEY (`match_roundMatch`,`match_branch`,`match_tournament_idTournament`),
  KEY `fk_player_has_match_match1_idx` (`match_roundMatch`,`match_branch`,`match_tournament_idTournament`),
  KEY `fk_player_has_match_player1_idx` (`player_idPlayer1`),
  KEY `fk_player_has_match_player2_idx` (`player_idPlayer2`),
  CONSTRAINT `fk_player_has_match_match1` FOREIGN KEY (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`) REFERENCES `match` (`roundMatch`, `branch`, `tournament_idTournament`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_player_has_match_player1` FOREIGN KEY (`player_idPlayer1`) REFERENCES `player` (`idPlayer`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_player_has_match_player2` FOREIGN KEY (`player_idPlayer2`) REFERENCES `player` (`idPlayer`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_has_match`
--

LOCK TABLES `player_has_match` WRITE;
/*!40000 ALTER TABLE `player_has_match` DISABLE KEYS */;
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (1,0,4,48,47,NULL,NULL),(1,0,5,60,58,0,2),(1,1,4,NULL,NULL,NULL,NULL),(1,1,5,60,61,NULL,NULL),(1,2,4,NULL,NULL,NULL,NULL),(1,2,5,NULL,NULL,NULL,NULL),(2,0,4,38,46,NULL,NULL),(2,0,5,61,52,1,3),(2,1,4,NULL,NULL,NULL,NULL),(2,1,5,NULL,NULL,NULL,NULL),(2,2,4,NULL,NULL,NULL,NULL),(2,2,5,NULL,NULL,NULL,NULL),(3,0,4,36,44,NULL,NULL),(3,0,5,51,63,NULL,NULL),(3,1,4,NULL,NULL,NULL,NULL),(3,1,5,NULL,NULL,NULL,NULL),(4,0,4,39,34,NULL,NULL),(4,0,5,56,64,NULL,NULL),(4,1,4,NULL,NULL,NULL,NULL),(4,1,5,NULL,NULL,NULL,NULL),(5,0,4,43,49,NULL,NULL),(5,0,5,62,65,NULL,NULL),(5,1,4,NULL,NULL,NULL,NULL),(5,1,5,NULL,NULL,NULL,NULL),(6,0,4,40,41,NULL,NULL),(6,0,5,50,53,NULL,NULL),(6,1,4,NULL,NULL,NULL,NULL),(6,1,5,NULL,NULL,NULL,NULL),(7,0,4,45,35,NULL,NULL),(7,0,5,57,54,NULL,NULL),(7,1,4,NULL,NULL,NULL,NULL),(7,1,5,NULL,NULL,NULL,NULL),(8,0,4,42,37,NULL,NULL),(8,0,5,55,59,NULL,NULL),(8,1,4,NULL,NULL,NULL,NULL),(8,1,5,NULL,58,NULL,NULL),(9,0,4,NULL,NULL,NULL,NULL),(9,0,5,58,52,1,4),(9,1,4,NULL,NULL,NULL,NULL),(9,1,5,NULL,NULL,NULL,NULL),(10,0,4,NULL,NULL,NULL,NULL),(10,0,5,NULL,NULL,NULL,NULL),(10,1,4,NULL,NULL,NULL,NULL),(10,1,5,NULL,NULL,NULL,NULL),(11,0,4,NULL,NULL,NULL,NULL),(11,0,5,NULL,NULL,NULL,NULL),(11,1,4,NULL,NULL,NULL,NULL),(11,1,5,NULL,NULL,NULL,NULL),(12,0,4,NULL,NULL,NULL,NULL),(12,0,5,NULL,NULL,NULL,NULL),(12,1,4,NULL,NULL,NULL,NULL),(12,1,5,NULL,NULL,NULL,NULL),(13,0,4,NULL,NULL,NULL,NULL),(13,0,5,52,NULL,NULL,NULL),(13,1,4,NULL,NULL,NULL,NULL),(13,1,5,NULL,NULL,NULL,NULL),(14,0,4,NULL,NULL,NULL,NULL),(14,0,5,NULL,NULL,NULL,NULL),(14,1,4,NULL,NULL,NULL,NULL),(14,1,5,NULL,NULL,NULL,NULL),(15,0,4,NULL,NULL,NULL,NULL),(15,0,5,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `player_has_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament` (
  `idTournament` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of tournament',
  `nameTournament` varchar(45) NOT NULL COMMENT 'Name of tournament',
  `nameGame` varchar(45) NOT NULL,
  `dateStart` date NOT NULL COMMENT 'Date begin',
  `dateEnd` date NOT NULL COMMENT 'Date end',
  `prizeTournament` int(11) NOT NULL,
  `Rule` varchar(1500) DEFAULT NULL,
  `TinyDescription` varchar(1500) DEFAULT NULL,
  `FullDescription` varchar(1500) DEFAULT NULL,
  `Status` int(11) DEFAULT '1' COMMENT '1: preparing, 0: playing',
  PRIMARY KEY (`idTournament`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` (`idTournament`, `nameTournament`, `nameGame`, `dateStart`, `dateEnd`, `prizeTournament`, `Rule`, `TinyDescription`, `FullDescription`, `Status`) VALUES (4,'tour3','LOL','2020-01-20','2020-01-20',1243214214,'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum ante nec quam volutpat, eget tincidunt nisi suscipit. Nam tempor enim in leo vehicula, vitae convallis massa sagittis. Mauris sed lorem vitae arcu laoreet lobortis vel ac arcu. Vestibulum hendrerit mauris luctus est tincidunt fermentum. Quisque dapibus eros nunc, id consectetur sem cursus posuere.</p>','<p>Duis risus elit, suscipit non felis ultrices, tincidunt laoreet metus. Mauris ullamcorper magna in nisi efficitur convallis. Nam posuere facilisis sapien quis mattis. Duis sed vulputate dolor. Vivamus at lacus odio. Fusce efficitur magna tortor, placerat mollis leo dapibus id. Donec volutpat, augue id venenatis fermentum, massa eros blandit ex, id ullamcorper diam erat a sem. Nulla facilisi. Maecenas vitae quam massa. Nulla porta rutrum sem.</p>','<p>Maecenas non ligula sapien. Nam dui purus, condimentum et cursus id, faucibus a neque. Quisque aliquet tortor felis, non viverra neque cursus sit amet. Proin volutpat metus viverra mauris scelerisque consequat. Aenean eu lorem id odio elementum dignissim. Cras dapibus, quam pharetra aliquet fringilla, nisi augue mattis leo, ac rhoncus enim sapien a metus. Vivamus maximus fringilla sodales. Phasellus placerat bibendum magna imperdiet condimentum. Fusce ultrices leo sit amet arcu commodo, a tincidunt leo iaculis. In lacinia finibus justo id suscipit. Nullam odio lorem, lobortis in justo ut, gravida porttitor turpis. Praesent ullamcorper vehicula velit in semper. Ut vehicula tellus quam, in ultricies diam sollicitudin id. Quisque sollicitudin nisi efficitur, dapibus elit in, ullamcorper quam. Nulla consequat nisi orci, at rutrum nunc vehicula eu.</p>',0),(5,'International','DOTA','2001-01-20','2031-01-20',200000000,'','','',0);
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'esport'
--

--
-- Dumping routines for database 'esport'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-09 21:48:03
