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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` (`idAccount`, `username`, `password`, `email`) VALUES (1,'admin1','root','someone@example.com');
INSERT INTO `account` (`idAccount`, `username`, `password`, `email`) VALUES (2,'admin2','root','someone@example.com');
INSERT INTO `account` (`idAccount`, `username`, `password`, `email`) VALUES (3,'admin3','root','someone@example.com');
INSERT INTO `account` (`idAccount`, `username`, `password`, `email`) VALUES (4,'admin123','$2a$10$CSwY2h83i/VjVUMpNGBfG.jzAb1VSloF//KMMRNM/KBp8JL3pg9SO','masa23vn@gmail.com');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailmatch`
--

DROP TABLE IF EXISTS `detailmatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailmatch` (
  `idDetailMatch` int(11) AUTO_INCREMENT NOT NULL,
  `kill` int(11) DEFAULT NULL,
  `died` int(11) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `highlight` varchar(100) DEFAULT NULL COMMENT 'link hình ảnh',
  `match_roundMatch` int(11) NOT NULL COMMENT 'ID of match in branch',
  `match_branch` int(11) NOT NULL COMMENT '0: win branch\n 1: lose branch 2: final',
  `match_tournament_idTournament` int(11) NOT NULL,
  PRIMARY KEY (`idDetailMatch`,`match_roundMatch`,`match_branch`,`match_tournament_idTournament`),
  KEY `fk_detailmatch_match1_idx` (`match_roundMatch`,`match_branch`,`match_tournament_idTournament`),
  CONSTRAINT `fk_detailmatch_match1` FOREIGN KEY (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`) REFERENCES `match` (`roundMatch`, `branch`, `tournament_idTournament`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailmatch`
--

LOCK TABLES `detailmatch` WRITE;
/*!40000 ALTER TABLE `detailmatch` DISABLE KEYS */;
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
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (1,0,'2019-12-12 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (1,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (1,1,'2019-12-20 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (1,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (1,2,'2020-01-11 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (1,2,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (2,0,'2019-12-13 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (2,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (2,1,'2019-12-21 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (2,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (2,2,'2020-01-12 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (2,2,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (3,0,'2019-12-14 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (3,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (3,1,'2019-12-23 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (3,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (4,0,'2019-12-15 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (4,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (4,1,'2019-12-24 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (4,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (5,0,'2019-12-16 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (5,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (5,1,'2019-12-29 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (5,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (6,0,'2019-12-17 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (6,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (6,1,'2019-12-30 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (6,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (7,0,'2019-12-18 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (7,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (7,1,'2019-12-31 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (7,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (8,0,'2019-12-19 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (8,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (8,1,'2020-01-01 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (8,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (9,0,'2019-12-25 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (9,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (9,1,'2020-01-02 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (9,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (10,0,'2019-12-26 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (10,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (10,1,'2020-01-03 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (10,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (11,0,'2019-12-27 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (11,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (11,1,'2020-01-06 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (11,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (12,0,'2019-12-28 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (12,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (12,1,'2020-01-07 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (12,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (13,0,'2020-01-04 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (13,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (13,1,'2020-01-08 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (13,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (14,0,'2020-01-05 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (14,0,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (14,1,'2020-01-10 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (14,1,NULL,0,2);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (15,0,'2020-01-09 00:00:00',0,1);
INSERT INTO `match` (`roundMatch`, `branch`, `dateMatch`, `statusMatch`, `tournament_idTournament`) VALUES (15,0,NULL,0,2);
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
INSERT INTO `overview` (`mostkillPlayer`, `Champion`, `viewers`, `Discription`, `tournament_idTournament`) VALUES (6,3,7,'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',1);
INSERT INTO `overview` (`mostkillPlayer`, `Champion`, `viewers`, `Discription`, `tournament_idTournament`) VALUES (6,1,5,'Fusce consequat. Nulla nisl. Nunc nisl.',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (1,'blerwell0','Berny Lerwell','2019-03-12',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (2,'tmuirden1','Teri Muirden','2019-10-24',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (3,'jsmallacombe2','Jule Smallacombe','2019-06-01',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (4,'djeremaes3','Demeter Jeremaes','2019-05-12',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (5,'oroj4','Ollie Roj','2019-04-17',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (6,'ndurnford5','Nadeen Durnford','2019-07-07',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (7,'priccetti6','Penn Riccetti','2019-05-23',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (8,'dwegener7','Dewain Wegener','2019-05-05',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (9,'aabsolom8','Abagail Absolom','2019-01-15',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (10,'cantoniewski9','Charlie Antoniewski','2019-10-08',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (11,'tcoldmana','Teddy Coldman','2018-12-18',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (12,'gedgesonb','Gwennie Edgeson','2019-11-17',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (13,'tkedwardc','Terry Kedward','2019-11-30',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (14,'caggissd','Cad Aggiss','2018-12-13',0,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (15,'gdee','Gertruda De Michetti','2018-12-15',6,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (16,'ajosipovitzf','Alexei Josipovitz','2019-08-27',10,1);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (17,'tmateog','Tamiko Mateo','2019-03-13',2,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (18,'kbrammerh','Karon Brammer','2019-09-12',10,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (19,'ahuegetti','Addy Huegett','2018-12-26',8,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (20,'iolenanej','Ivan O\'Lenane','2019-11-25',10,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (21,'tmateog','Tamiko Mateo','2019-03-13',2,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (22,'kbrammerh','Karon Brammer','2019-09-12',10,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (23,'ahuegetti','Addy Huegett','2018-12-26',8,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (24,'iolenanej','Ivan O\'Lenane','2019-11-25',10,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (25,'blerwell0','Berny Lerwell','2019-03-12',0,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (26,'tmuirden1','Teri Muirden','2019-10-24',0,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (27,'jsmallacombe2','Jule Smallacombe','2019-06-01',0,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (28,'djeremaes3','Demeter Jeremaes','2019-05-12',0,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (29,'oroj4','Ollie Roj','2019-04-17',0,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (30,'ndurnford5','Nadeen Durnford','2019-07-07',0,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (31,'priccetti6','Penn Riccetti','2019-05-23',0,2);
INSERT INTO `player` (`idPlayer`, `usernamePlayer`, `realnamePlayer`, `DoB`, `statusPlayer`, `tournament_idTournament`) VALUES (32,'dwegener7','Dewain Wegener','2019-05-05',0,2);
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
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (1,0,1,1,2,1,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (1,0,2,17,25,2,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (1,1,1,1,3,0,8);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (1,1,2,17,26,2,5);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (1,2,1,15,10,12,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (1,2,2,NULL,NULL,NULL,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (2,0,1,3,4,3,4);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (2,0,2,18,26,4,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (2,1,1,5,7,9,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (2,1,2,19,20,3,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (2,2,1,4,8,3,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (2,2,2,NULL,NULL,NULL,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (3,0,1,5,6,5,6);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (3,0,2,19,27,2,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (3,1,1,9,11,2,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (3,1,2,21,30,1,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (4,0,1,7,8,7,8);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (4,0,2,20,28,0,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (4,1,1,14,16,4,5);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (4,1,2,23,24,0,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (5,0,1,9,10,1,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (5,0,2,21,29,0,7);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (5,1,1,3,13,6,7);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (5,1,2,26,32,0,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (6,0,1,11,12,3,5);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (6,0,2,22,30,3,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (6,1,1,5,12,8,9);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (6,1,2,19,29,3,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (7,0,1,13,14,2,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (7,0,2,23,31,1,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (7,1,1,11,6,10,11);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (7,1,2,30,27,0,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (8,0,1,15,16,2,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (8,0,2,24,32,1,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (8,1,1,16,2,12,13);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (8,1,2,24,18,0,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (9,0,1,2,4,1,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (9,0,2,25,18,2,0);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (9,1,1,13,12,0,1);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (9,1,2,32,19,3,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (10,0,1,6,8,2,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (10,0,2,27,28,2,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (10,1,1,6,2,12,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (10,1,2,27,18,1,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (11,0,1,10,12,45,7);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (11,0,2,29,22,1,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (11,1,1,12,4,4,5);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (11,1,2,32,NULL,NULL,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (12,0,1,13,15,8,9);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (12,0,2,31,32,3,2);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (12,1,1,6,10,6,7);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (12,1,2,18,NULL,NULL,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (13,0,1,4,8,1,3);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (13,0,2,25,28,2,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (13,1,1,4,10,8,9);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (13,1,2,NULL,NULL,NULL,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (14,0,1,10,15,3,4);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (14,0,2,22,31,NULL,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (14,1,1,10,8,1,0);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (14,1,2,NULL,NULL,NULL,NULL);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (15,0,1,8,15,5,6);
INSERT INTO `player_has_match` (`match_roundMatch`, `match_branch`, `match_tournament_idTournament`, `player_idPlayer1`, `player_idPlayer2`, `score1`, `score2`) VALUES (15,0,2,NULL,NULL,NULL,NULL);
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
  `Status` int(11) DEFAULT 1 COMMENT '1: preparing, 0: playing',
  PRIMARY KEY (`idTournament`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` (`idTournament`, `nameTournament`, `nameGame`, `dateStart`, `dateEnd`, `prizeTournament`, `Rule`, `TinyDescription`, `FullDescription`) VALUES (1,'tour1','LOL','2020-05-01','2019-12-31',1000000,'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum ante nec quam volutpat, eget tincidunt nisi suscipit. Nam tempor enim in leo vehicula, vitae convallis massa sagittis. Mauris sed lorem vitae arcu laoreet lobortis vel ac arcu. Vestibulum hendrerit mauris luctus est tincidunt fermentum. Quisque dapibus eros nunc, id consectetur sem cursus posuere. Donec eleifend elementum pulvinar. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dapibus efficitur molestie. Donec fermentum libero in consectetur dignissim. Aliquam vitae est sed nibh consequat condimentum.</p>','<p>Duis risus elit, suscipit non felis ultrices, tincidunt laoreet metus. Mauris ullamcorper magna in nisi efficitur convallis. Nam posuere facilisis sapien quis mattis. Duis sed vulputate dolor. Vivamus at lacus odio. Fusce efficitur magna tortor, placerat mollis leo dapibus id. Donec volutpat, augue id venenatis fermentum, massa eros blandit ex, id ullamcorper diam erat a sem. Nulla facilisi. Maecenas vitae quam massa. Nulla porta rutrum sem.</p>','<p>Maecenas non ligula sapien. Nam dui purus, condimentum et cursus id, faucibus a neque. Quisque aliquet tortor felis, non viverra neque cursus sit amet. Proin volutpat metus viverra mauris scelerisque consequat. Aenean eu lorem id odio elementum dignissim. Cras dapibus, quam pharetra aliquet fringilla, nisi augue mattis leo, ac rhoncus enim sapien a metus. Vivamus maximus fringilla sodales. Phasellus placerat bibendum magna imperdiet condimentum. Fusce ultrices leo sit amet arcu commodo, a tincidunt leo iaculis. In lacinia finibus justo id suscipit. Nullam odio lorem, lobortis in justo ut, gravida porttitor turpis. Praesent ullamcorper vehicula velit in semper. Ut vehicula tellus quam, in ultricies diam sollicitudin id. Quisque sollicitudin nisi efficitur, dapibus elit in, ullamcorper quam. Nulla consequat nisi orci, at rutrum nunc vehicula eu.</p>');
INSERT INTO `tournament` (`idTournament`, `nameTournament`, `nameGame`, `dateStart`, `dateEnd`, `prizeTournament`, `Rule`, `TinyDescription`, `FullDescription`) VALUES (2,'tour2','CSGO','2020-03-04','2020-01-28',20000000,'','','');
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

-- Dump completed on 2019-12-29 17:03:38
