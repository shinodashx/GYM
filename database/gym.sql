-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: gym
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(255) DEFAULT NULL COMMENT 'Title',
  `content` varchar(255) DEFAULT NULL COMMENT 'Content',
  `update_time` datetime DEFAULT NULL COMMENT 'Update time',
  `user_id` int DEFAULT NULL COMMENT 'User ID',
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Announcement';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (35,'New Announcement','New Announcement','2023-04-24 19:59:27',13,''),(36,'New Announcement2','New Announcement2','2023-04-25 13:21:16',13,'uploads/common/cs5l1wcmipsjmplrcc.png'),(37,'New Announcement3','New Announcement3','2023-04-25 13:21:01',13,''),(38,'New Announcement4','New Announcement4','2023-04-24 20:22:19',13,'');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Bank name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Bank';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES (369,'ICBC'),(370,'ABC');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_response`
--

DROP TABLE IF EXISTS `comment_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_response` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parent_response_id` int DEFAULT NULL COMMENT 'PARENT_RESPONSE_ID',
  `title` varchar(255) DEFAULT NULL COMMENT 'title',
  `content` varchar(255) DEFAULT NULL COMMENT 'content',
  `user_id` int DEFAULT NULL COMMENT 'USER_ID',
  `creat_time` datetime DEFAULT NULL COMMENT 'creat_time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Comment_response;';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_response`
--

LOCK TABLES `comment_response` WRITE;
/*!40000 ALTER TABLE `comment_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (5,'CloseTime','22:00','time'),(6,'OpenTime','08:00','time'),(7,'Subscription','10','string');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Never gonna give you up','American golden music','https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4?authorization=bce-auth-v1/40f207e648424f47b2e3dfbb1014b1a5/2021-07-12T02:14:24Z/-1/host/530146520a1c89fb727fbbdb8a0e0c98ec69955459aed4b1c8e00839187536c9','uploads/common/csg2vrwbijqnhek7t2.jpg'),(2,'running course','teach you run to the USA','uploads/course/video/csgo65uyh3iocbih4s.mp4','uploads/common/csg2w959dpgjudhvmz.jpg'),(3,'deep squat','teach how to squat','uploads/course/video/csgo91ryt1sow5umma.mp4 ','uploads/common/csg2yu4qtpmlhnyjz0.jpg'),(4,'high jump','a course for how to jump higher','uploads/course/video/csgo9e2f1sfyh2nicz.mp4\n','uploads/common/csg2x6y15c9feocxhv.jpg'),(5,'swimming','teach you how to swim on the landscope','uploads/course/video/csgo9p7fhuloae8ie3.mp4','uploads/common/csg2whpjvtugzyqtz6.jpg'),(6,'sleep','how to sleep with high quality','uploads/course/video/csgoa02nbrmszzk3v0.mp4','uploads/common/csg2wvladij4qrvwfg.jpg');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int DEFAULT NULL COMMENT 'User ID',
  `credit` int DEFAULT NULL COMMENT 'Credit of User',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Credit ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES (1,13,700),(2,14,700),(3,15,700),(4,16,700),(5,17,700),(6,18,700),(7,19,700),(8,20,700),(9,21,700),(10,22,700),(11,23,700),(12,24,700),(13,25,700),(14,26,0),(15,27,0),(16,28,0),(17,29,0),(18,30,0),(19,31,0),(20,32,0),(21,33,0),(22,34,0),(23,35,0);
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int DEFAULT NULL COMMENT 'User id',
  `facility_id` int DEFAULT NULL COMMENT 'Facility Id',
  `score` varchar(255) DEFAULT NULL COMMENT 'Score',
  `description` varchar(255) DEFAULT NULL COMMENT 'Description',
  `anonymous` varchar(255) DEFAULT NULL COMMENT 'IS Anonymous',
  `images` varchar(255) DEFAULT NULL COMMENT 'Image urls',
  `videos` varchar(255) DEFAULT NULL COMMENT 'Videos urls',
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Evaluation';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
INSERT INTO `evaluation` VALUES (6,13,12,'3','Very good experience, I will recommend to my friends','0','uploads/common/csg2vrwbijqnhek7t2.jpg','','2023-05-04 00:00:00'),(7,13,15,'5','Very good experience, I will recommend to my friends','0','uploads/common/csg2w959dpgjudhvmz.jpg',NULL,'2023-05-07 19:32:48'),(8,13,18,'4',' best basketball place for us to play basketball',' ','uploads/common/csg2yu4qtpmlhnyjz0.jpg',NULL,'2023-05-07 21:13:20'),(9,13,18,'5','I think it is very good for me to play basketball like liuzhe',NULL,'uploads/common/csg2x6y15c9feocxhv.jpg',NULL,'2023-05-07 21:14:19'),(10,13,23,'5','I think I can play soccer like WZX ',' ','uploads/common/csg2whpjvtugzyqtz6.jpg',NULL,'2023-05-07 21:15:24'),(11,13,23,'5','I think I can play soccer like Messi',NULL,'uploads/common/csg2wvladij4qrvwfg.jpg',NULL,'2023-05-07 21:15:49'),(12,13,28,'4','I think I can play basket like chenyijun',' ','uploads/common/csg2zikipg8ezhd8cl.jpg',NULL,'2023-05-07 21:16:21'),(13,13,21,'4','this is the best place to swimming in  chengdu',NULL,'uploads/common/csg2z7gnikq3hogbt0.jpg',NULL,'2023-05-07 21:17:17'),(14,13,19,'5','I can play ping-pong in this place every day ',NULL,'uploads/common/csg2yf17syi6xqnfyv.jpg',NULL,'2023-05-07 21:18:10'),(15,13,16,'5','the facility in this bowling room is very good',NULL,'uploads/common/csg2yngihnoyqov0xe.jpg',NULL,'2023-05-07 21:18:46'),(16,15,15,'5','the best badminton place i have played in chengdu',NULL,'uploads/common/csg2xgy1axukstjf5x.jpg',NULL,'2023-05-07 21:19:19');
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation_response`
--

DROP TABLE IF EXISTS `evaluation_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_response` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parent_response_id` int DEFAULT NULL COMMENT 'reponse_id',
  `user_id` int DEFAULT NULL COMMENT 'response_user_id',
  `evaluation_id` int DEFAULT NULL COMMENT 'evaluation_id',
  `content` varchar(255) DEFAULT NULL COMMENT 'response_content',
  `update_time` datetime DEFAULT NULL COMMENT 'response_time',
  `images` varchar(255) DEFAULT NULL COMMENT 'Image urls',
  `videos` varchar(255) DEFAULT NULL COMMENT 'Videos urls',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Evaluation Response;';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_response`
--

LOCK TABLES `evaluation_response` WRITE;
/*!40000 ALTER TABLE `evaluation_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facility`
--

DROP TABLE IF EXISTS `facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facility` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Facility ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Facility Name',
  `description` varchar(900) DEFAULT NULL COMMENT 'Facility Description',
  `location` varchar(900) DEFAULT NULL COMMENT 'Facility Location',
  `images` varchar(255) DEFAULT NULL COMMENT 'Image urls',
  `tags` varchar(255) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Facility';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facility`
--

LOCK TABLES `facility` WRITE;
/*!40000 ALTER TABLE `facility` DISABLE KEYS */;
INSERT INTO `facility` VALUES (12,'Baseball Hall1','A baseball field, also known as a baseball diamond, is an outdoor playing area used for the sport of baseball. It consists of a diamond-shaped infield, which includes bases at each corner, and an outfield which surrounds the infield. The infield is typically made of dirt or clay, while the outfield is covered in grass. The field dimensions can vary depending on the level of play, but in general, the distance between the bases is 90 feet and the distance from the pitcher\'s mound to home plate is 60 feet, 6 inches. ','South side of the Gym','uploads/facility/crdk0cy0qxmrumsiga.jpg,uploads/facility/cshjkxzic38n1i6nni.jpg','1,2',33.937909,115.545879),(15,'Badminton court','Badminton court','In the center of the gym1','uploads/facility/crdk1c2lmyazgylyy4.png,uploads/facility/cs5kwq6o026z9pwpv7.png,uploads/facility/cshjlckzof54wrvihi.png','4,3',30.5477,104.07193),(16,'Bowling alley','Bowling alley','Inside Bowling alley','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','4,1',30.757343,103.970143),(18,'Basketball Playground','Basketball Playground','South Gym','uploads/facility/crt4a45pfjn4ln5vsv.jpg','1,2',30.764467,103.986327),(19,'Ping-pong','Ping-pong','Near the center of the gym','uploads/facility/crt4ap6crs4to0nyfn.jpg','1,3',30.764467,103.986327),(20,'In-room Ping-pong','Ping-pong in room','In the center of the gym','uploads/facility/crt4atyqcdfg865ern.jpg','1,4',30.764467,103.986327),(21,'Swimming Pool','Swimming Pool','In the center of the gym','uploads/facility/crt4bkj989jqvzrllw.jpeg','4',30.764467,103.986327),(22,'Electric-Sport','Gaming','In the center of the gym','uploads/facility/crt4by0lo858vvisdr.jpeg','4',30.764467,103.986327),(23,'Soccer Ball 1','Soccer Ball 1','In the center of the gym','uploads/facility/crt4by0lo858vvisdr.jpeg','5',30.764467,103.986327),(24,'Soccer Ball 2','Soccer Ball 2','In the center of the gym','uploads/facility/crt4by0lo858vvisdr.jpeg','5',30.764467,103.986327),(25,'Soccer Ball 3','Soccer Ball 3','In the center of the gym','uploads/facility/crt4by0lo858vvisdr.jpeg','5',30.764467,103.986327),(26,'Soccer Ball 4','Soccer Ball 4','In the center of the gym','uploads/facility/crt4by0lo858vvisdr.jpeg','5',30.764467,103.986327),(27,'Soccer Ball 5','Soccer Ball 5','In the center of the gym','uploads/facility/crt4by0lo858vvisdr.jpeg','5',30.764467,103.986327),(28,'Basketball 1','Basketball 1','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','6',30.764467,103.986327),(29,'Basketball 2','Basketball 2','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','6',30.764467,103.986327),(30,'Basketball 3','Basketball 3','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','6',30.764467,103.986327),(31,'Basketball 4','Basketball 4','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','6',30.764467,103.986327),(32,'Basketball 5','Basketball 5','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','6',30.764467,103.986327),(33,'Baseball Hall','Badminton 1','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','7',30.764467,103.986327),(34,'Badminton 2','Badminton 2','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','7',30.764467,103.986327),(35,'Badminton 3','Badminton 3','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','7',30.764467,103.986327),(36,'Badminton 4','Badminton 4','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','7',30.764467,103.986327),(37,'Badminton 5','Badminton 5','In the center of the gym','uploads/facility/cr67h1yt3dsi1at3ze.jpeg','7',30.764467,103.986327),(41,'Ping pong Course 1','Ping pong Course 1','Ping pong center','uploads/facility/crt4ap6crs4to0nyfn.jpg','999',30.764467,103.986327),(42,'Ping pong Course 2','Ping pong Course 2','Ping pong center','uploads/facility/crt4ap6crs4to0nyfn.jpg','999',30.764467,103.986327),(43,'Ping pong Course 3','Ping pong Course 3','Ping pong center','uploads/facility/crt4ap6crs4to0nyfn.jpg','999',30.764467,103.986327),(44,'Ping pong Course 3','Ping pong Course 3','Ping pong center','uploads/facility/crt4ap6crs4to0nyfn.jpg','999',30.764467,103.986327);
/*!40000 ALTER TABLE `facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facility_place`
--

DROP TABLE IF EXISTS `facility_place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facility_place` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `facility_id` int DEFAULT NULL COMMENT 'Facility ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Place Name',
  `description` varchar(900) DEFAULT NULL COMMENT 'Place Description',
  `cost` decimal(24,6) DEFAULT NULL COMMENT 'Place order code',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Facility Place';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facility_place`
--

LOCK TABLES `facility_place` WRITE;
/*!40000 ALTER TABLE `facility_place` DISABLE KEYS */;
INSERT INTO `facility_place` VALUES (6,12,'BaseBall_1','BaseBall_1',101.000000),(9,12,'BaseBall_2','BaseBall_2',10.000000),(10,12,'BaseBall_3','BaseBall_3',10.000000),(12,19,'Ping Pong Activity','First Ping pong Activity',200.000000),(13,12,'Competition  ','Competition 1',20.000000),(14,12,'BaseBall Course','BaseBall Course ',10.000000),(15,15,'Badminton 1','Badminton 1',2.000000),(16,15,'Course','Course',10.000000),(17,18,'basketball 1','first place',10.000000),(19,41,'Course1','Course1',10.000000);
/*!40000 ALTER TABLE `facility_place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facility_score`
--

DROP TABLE IF EXISTS `facility_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facility_score` (
  `facility_id` int NOT NULL COMMENT 'Facility ID',
  `score` decimal(24,6) DEFAULT NULL COMMENT 'Current Score',
  PRIMARY KEY (`facility_id`),
  UNIQUE KEY `facility_id` (`facility_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Facility Score';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facility_score`
--

LOCK TABLES `facility_score` WRITE;
/*!40000 ALTER TABLE `facility_score` DISABLE KEYS */;
/*!40000 ALTER TABLE `facility_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `place_id` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `amount` decimal(24,6) DEFAULT NULL,
  `order_code` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `parent_order_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (68,13,6,'2023-05-07 21:34:09','2023-05-08 18:30:00','2023-05-08 19:30:00',101.000000,'20230507569731051',3,1,''),(69,13,6,'2023-05-07 23:50:46','2023-05-10 18:30:00','2023-05-10 20:30:00',161.600000,'20230507102471805',1,0.8,''),(70,13,6,'2023-05-07 23:51:01','2023-05-12 18:30:00','2023-05-12 20:30:00',161.600000,'20230507147034346',1,0.8,''),(71,13,6,'2023-05-07 23:51:13','2023-05-16 18:30:00','2023-05-16 19:30:00',80.800000,'20230507422593499',1,0.8,''),(72,13,16,'2023-05-08 21:01:15','2023-05-10 21:00:00','2023-05-10 22:00:00',8.000000,'20230508579058477',1,0.8,''),(73,13,6,'2023-05-09 13:22:21','2023-05-11 13:00:00','2023-05-11 14:00:00',80.800000,'20230509103163632',1,0.8,''),(74,13,19,'2023-05-09 14:55:50','2023-05-21 19:30:00','2023-05-21 21:30:00',16.000000,'20230509138451432',5,0.8,''),(75,13,6,'2023-05-09 15:04:05','2023-05-25 16:30:00','2023-05-25 19:30:00',242.400000,'20230509864451584',1,0.8,'220230509855731512'),(76,13,6,'2023-05-09 15:04:05','2023-06-01 16:30:00','2023-06-01 19:30:00',242.400000,'20230509874167713',1,0.8,'220230509855731512'),(77,13,6,'2023-05-09 15:04:05','2023-06-08 16:30:00','2023-06-08 19:30:00',242.400000,'20230509881094983',1,0.8,'220230509855731512'),(78,13,6,'2023-05-09 15:04:05','2023-06-15 16:30:00','2023-06-15 19:30:00',242.400000,'20230509888327186',1,0.8,'220230509855731512'),(79,13,6,'2023-05-09 15:04:05','2023-06-22 16:30:00','2023-06-22 19:30:00',242.400000,'20230509895305462',1,0.8,'220230509855731512'),(80,13,6,'2023-05-09 15:04:05','2023-06-29 16:30:00','2023-06-29 19:30:00',242.400000,'20230509902172613',1,0.8,'220230509855731512'),(81,13,6,'2023-05-09 15:04:05','2023-07-06 16:30:00','2023-07-06 19:30:00',242.400000,'20230509908772536',1,0.8,'220230509855731512'),(82,13,6,'2023-05-09 15:05:30','2023-05-12 16:30:00','2023-05-12 17:30:00',80.800000,'20230509110686530',1,0.8,'220230509100000374'),(83,13,6,'2023-05-09 15:05:30','2023-05-19 16:30:00','2023-05-19 17:30:00',80.800000,'20230509119701952',1,0.8,'220230509100000374'),(84,13,6,'2023-05-09 15:05:30','2023-05-26 16:30:00','2023-05-26 17:30:00',80.800000,'20230509139549137',1,0.8,'220230509100000374'),(85,13,6,'2023-05-09 15:05:30','2023-06-02 16:30:00','2023-06-02 17:30:00',80.800000,'20230509148633825',1,0.8,'220230509100000374'),(86,13,6,'2023-05-09 15:05:30','2023-06-09 16:30:00','2023-06-09 17:30:00',80.800000,'20230509161635542',1,0.8,'220230509100000374'),(87,13,6,'2023-05-09 15:05:30','2023-06-16 16:30:00','2023-06-16 17:30:00',80.800000,'20230509168940981',1,0.8,'220230509100000374'),(88,13,6,'2023-05-09 15:05:30','2023-06-23 16:30:00','2023-06-23 17:30:00',80.800000,'20230509175038501',1,0.8,'220230509100000374');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `wallet_id` int NOT NULL COMMENT 'Wallet ID',
  `order_id` int NOT NULL COMMENT 'Order ID',
  `payment_code` varchar(255) NOT NULL COMMENT 'Payment code',
  `time` datetime NOT NULL COMMENT 'Payment Time',
  `amount` decimal(24,6) NOT NULL COMMENT 'Payment Amount',
  `payment_type` int NOT NULL COMMENT 'Payment type',
  `status` int NOT NULL COMMENT 'Payment status',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Payment';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (161,11,68,'20230507503163324','2023-05-07 21:34:21',101.000000,2,1),(162,11,69,'20230507548867753','2023-05-07 23:50:49',161.600000,2,1),(163,11,70,'20230507176692735','2023-05-07 23:51:03',161.600000,2,1),(164,11,71,'20230507336711968','2023-05-07 23:51:15',80.800000,2,1),(165,11,72,'20230508523403891','2023-05-08 21:01:19',8.000000,2,1),(166,11,73,'20230509621640525','2023-05-09 13:22:25',80.800000,2,1),(167,11,74,'20230509348278905','2023-05-09 14:56:07',16.000000,1,3),(168,11,74,'20230509348278905','2023-05-09 14:59:24',16.000000,3,1),(169,11,75,'20230509844320575','2023-05-09 15:04:20',242.400000,2,1),(170,11,76,'20230509878193814','2023-05-09 15:04:20',242.400000,2,1),(171,11,77,'20230509909217608','2023-05-09 15:04:20',242.400000,2,1),(172,11,78,'20230509944823879','2023-05-09 15:04:20',242.400000,2,1),(173,11,79,'20230509975913206','2023-05-09 15:04:20',242.400000,2,1),(174,11,80,'202305095530108','2023-05-09 15:04:20',242.400000,2,1),(175,11,81,'2023050966848134','2023-05-09 15:04:20',242.400000,2,1),(176,11,82,'20230509528494078','2023-05-09 15:05:33',80.800000,2,1),(177,11,83,'20230509568846157','2023-05-09 15:05:33',80.800000,2,1),(178,11,84,'20230509613154162','2023-05-09 15:05:33',80.800000,2,1),(179,11,85,'20230509663543133','2023-05-09 15:05:33',80.800000,2,1),(180,11,86,'20230509706834351','2023-05-09 15:05:33',80.800000,2,1),(181,11,87,'20230509755500703','2023-05-09 15:05:33',80.800000,2,1),(182,11,88,'20230509808488708','2023-05-09 15:05:33',80.800000,2,1);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `order_id` int DEFAULT NULL COMMENT 'Order Id',
  `receipt_path` varchar(255) DEFAULT NULL COMMENT 'PDF Receipt path',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Receipt';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (20,68,'receipts/pdf/1320230507569731051.pdf');
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `subscription_type` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (7,13,'2023-05-07 23:10:28','2023-06-06 23:10:28',1,2),(8,13,'2023-05-07 23:21:14','2023-06-06 23:21:14',1,2),(9,13,'2023-05-07 23:23:16','2023-06-06 23:23:16',1,2),(10,13,'2023-05-07 23:23:25','2023-06-06 23:23:25',1,2),(11,13,'2023-05-07 23:24:14','2023-06-06 23:24:14',1,2),(12,13,'2023-05-08 12:48:38','2024-05-07 12:48:38',2,2),(13,13,'2023-05-08 20:57:01','2024-05-07 20:57:01',2,0);
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_permission`
--

DROP TABLE IF EXISTS `subscription_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_permission` (
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_permission`
--

LOCK TABLES `subscription_permission` WRITE;
/*!40000 ALTER TABLE `subscription_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscription_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_type`
--

DROP TABLE IF EXISTS `subscription_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_type` (
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `days` int DEFAULT NULL,
  `permissions` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_type`
--

LOCK TABLES `subscription_type` WRITE;
/*!40000 ALTER TABLE `subscription_type` DISABLE KEYS */;
INSERT INTO `subscription_type` VALUES (1,'monthly',10,30,'0'),(2,'yearly',300,365,'0');
/*!40000 ALTER TABLE `subscription_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'ball'),(2,'gym'),(3,'outdoor'),(4,'rooms'),(5,'soccer'),(6,'basketball'),(7,'badminton'),(999,'activity');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_approves`
--

DROP TABLE IF EXISTS `topic_approves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_approves` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int DEFAULT NULL COMMENT 'USER_ID',
  `topic_id` int DEFAULT NULL COMMENT 'TOPIC_ID',
  `type` int DEFAULT NULL COMMENT 'TYPE',
  `update_time` datetime DEFAULT NULL COMMENT 'create_time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Topicapproves;';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_approves`
--

LOCK TABLES `topic_approves` WRITE;
/*!40000 ALTER TABLE `topic_approves` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_approves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_comment`
--

DROP TABLE IF EXISTS `topic_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_comment` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int DEFAULT NULL COMMENT 'USER_ID',
  `topic_id` int DEFAULT NULL COMMENT 'TOPIC_ID',
  `parent_comment_id` int DEFAULT NULL COMMENT 'Parent comment ID',
  `title` varchar(255) DEFAULT NULL COMMENT 'Comment_title',
  `content` varchar(255) DEFAULT NULL COMMENT 'Comment_conrtent',
  `approve` varchar(255) DEFAULT NULL COMMENT 'comment_approve',
  `disapprove` varchar(255) DEFAULT NULL COMMENT 'comment_disapprove',
  `update_time` datetime DEFAULT NULL COMMENT 'creat_time',
  `images` varchar(255) DEFAULT NULL COMMENT 'Image urls',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Topic_comment;';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_comment`
--

LOCK TABLES `topic_comment` WRITE;
/*!40000 ALTER TABLE `topic_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_comment_approves`
--

DROP TABLE IF EXISTS `topic_comment_approves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_comment_approves` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `type` int DEFAULT NULL COMMENT 'TYPE',
  `update_time` datetime DEFAULT NULL COMMENT 'Update time',
  `user_id` int DEFAULT NULL COMMENT 'USER_ID',
  `comment_id` int DEFAULT NULL COMMENT 'topic_comment_ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Topiccommentsapproves;';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_comment_approves`
--

LOCK TABLES `topic_comment_approves` WRITE;
/*!40000 ALTER TABLE `topic_comment_approves` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_comment_approves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL COMMENT 'ID',
  `user_id` int DEFAULT NULL COMMENT 'USER_ID',
  `content` varchar(255) DEFAULT NULL COMMENT 'content',
  `title` varchar(255) DEFAULT NULL COMMENT 'title',
  `update_time` datetime DEFAULT NULL COMMENT 'time',
  `approve_count` int DEFAULT NULL COMMENT 'Approve count',
  `disapprove_count` int DEFAULT NULL COMMENT 'Disapprove count',
  `images` varchar(255) DEFAULT NULL COMMENT 'Image urls',
  `videos` varchar(255) DEFAULT NULL COMMENT 'Video urls',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Topics;';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'USER ID',
  `username` varchar(90) NOT NULL COMMENT 'USERNAME',
  `password` varchar(255) DEFAULT NULL COMMENT 'PASSWORD',
  `avatar` varchar(255) DEFAULT NULL COMMENT 'AVATAR URL',
  `email` varchar(255) DEFAULT NULL COMMENT 'EMAIL ADDRESS',
  `phone` varchar(255) DEFAULT NULL COMMENT 'PHONE NUMBER',
  `gender` int DEFAULT NULL COMMENT 'GENDER',
  `update_time` datetime DEFAULT NULL COMMENT 'CREATE AT',
  `role` int NOT NULL DEFAULT '0' COMMENT 'ROLE',
  `login_time` datetime DEFAULT NULL COMMENT 'LAST LOGIN TIME',
  `is_coach` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='User';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (13,'2332','9d33f193ceef90bb5ee3189c1d4dfaf4','uploads/avatar/csg4r0zhxubjf5olrt.png','1323827835@qq.com','17713199318',2,'2023-02-16 17:18:49',0,'2023-05-09 15:06:21',0),(14,'23323232','e77dbaf6759253c7c6d0efc5690369c7','uploads/avatar/default.png','c.qkbelaw@qq.com','13117230925',1,'2023-02-23 16:47:20',1,'2023-02-23 16:47:39',0),(15,'123456','40aa6972ef2749a4f97d7e031629c4a9','uploads/avatar/cqxnymp9kkx1sehzjx.png','@@@@@@','1818919123',0,'2023-02-27 13:36:32',0,'2023-03-04 22:20:28',0),(16,'sblzshx123123','40aa6972ef2749a4f97d7e031629c4a9','uploads/avatar/default.png','1564165','1841898956',0,'2023-03-05 14:39:52',0,NULL,0),(17,'sbshxlz','40aa6972ef2749a4f97d7e031629c4a9','uploads/avatar/default.png','1564819680561','11891196',NULL,'2023-03-05 14:41:36',0,NULL,0),(18,'23312','e77dbaf6759253c7c6d0efc5690369c7','uploads/avatar/default.png','23322332@qq.com','1333333333',1,'2023-03-06 20:48:29',0,NULL,0),(19,'15196561123','40aa6972ef2749a4f97d7e031629c4a9','uploads/avatar/default.png','123456@qq.com','859164564',0,'2023-03-07 21:22:51',1,NULL,0),(20,'wzh907','bd4bfb3c7cb64aa7d6ed1f567e6e7761','uploads/avatar/default.png','1263049548@qq.com','18337851615',1,'2023-03-08 22:40:50',0,'2023-03-08 22:41:07',0),(21,'wzh0907','0440c02f6f0789e228f8465f09400e35','uploads/avatar/default.png','sc202zw@leeds.ac.uk','18382229527',NULL,'2023-03-14 20:32:46',0,'2023-03-14 20:33:02',0),(22,'48496486','25f9e794323b453885f5181f1b624d0b','uploads/avatar/default.png','sc20h2l@leeds.ac.uk','15882004207',NULL,'2023-03-25 15:56:24',0,NULL,0),(23,'4849648','25f9e794323b453885f5181f1b624d0b','uploads/avatar/default.png','sc202l@leeds.ac.uk','15882004202',NULL,'2023-03-25 15:57:43',0,NULL,0),(24,'王梓卉','860c6edc8cc922f738d2a36a55846c52','uploads/avatar/default.png','12630049548@qq.com','18337851618',NULL,'2023-03-26 13:49:00',0,NULL,0),(25,'sc20h2l11','40aa6972ef2749a4f97d7e031629c4a9','uploads/avatar/default.png','1234l56@qq.com','15882006307',NULL,'2023-04-09 23:52:20',0,NULL,0),(26,'songhaoxuan','9d33f193ceef90bb5ee3189c1d4dfaf4','uploads/avatar/default.png','2547855365@qq.co','15773664529',NULL,'2023-04-11 15:33:55',0,'2023-04-11 15:35:09',0),(27,'shx250','9d33f193ceef90bb5ee3189c1d4dfaf4','uploads/avatar/default.png','156111115@qq.co','15447885439',NULL,'2023-04-11 15:37:55',0,'2023-05-08 20:14:54',0),(28,'shxsb','9d33f193ceef90bb5ee3189c1d4dfaf4','uploads/avatar/default.png','2979833965@qq.com','15685487556',3,'2023-04-14 17:28:37',0,'2023-04-14 22:03:48',0),(29,'sbshxa','9d33f193ceef90bb5ee3189c1d4dfaf4','uploads/avatar/default.png','156164189894189@qq.com','15447885239',NULL,'2023-04-21 23:45:45',0,'2023-04-21 23:45:51',0),(30,'lz2shx','9d33f193ceef90bb5ee3189c1d4dfaf4','uploads/avatar/default.png','124582354@qq.com','15447889635',NULL,'2023-04-25 15:50:06',0,'2023-04-25 16:08:33',0),(32,'1234','e10adc3949ba59abbe56e057f20f883e','uploads/avatar/default.png','2332@qq.com','121212121212',1,'2023-05-04 22:57:36',0,NULL,0),(33,'lz','e10adc3949ba59abbe56e057f20f883e','uploads/avatar/default.png','11@qq.com','11111111111',1,'2023-05-04 22:58:36',0,'2023-05-04 22:58:58',0),(34,'王姐','25d55ad283aa400af464c76d713c07ad','uploads/avatar/default.png','123@qq.com','13113113131',1,'2023-05-07 20:28:03',0,'2023-05-07 20:28:12',0),(35,'OneRain233','2496b7e58b5d7d725f8c8bc251daa27c','uploads/avatar/csgvrcf2ye8uesnegj.png','onerain233@duck.com','13326294741',0,'2023-05-08 20:03:39',0,'2023-05-08 20:08:22',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int DEFAULT NULL COMMENT 'User ID',
  `amount` decimal(24,6) DEFAULT NULL COMMENT 'Money amount',
  `status` int DEFAULT NULL COMMENT 'Wallet status',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Wallet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (11,13,18520.600000,0),(12,14,0.000000,0),(13,15,0.000000,0),(14,16,0.000000,0),(15,17,0.000000,0),(16,18,0.000000,0),(17,19,0.000000,0),(18,20,0.000000,0),(19,21,0.000000,0),(20,22,0.000000,0),(21,23,0.000000,0),(22,24,0.000000,0),(23,25,0.000000,0),(24,26,99980.000000,0),(25,27,899.000000,0),(26,28,0.000000,0),(27,29,0.000000,0),(28,30,0.000000,0),(29,31,0.000000,0),(30,32,0.000000,0),(31,33,0.000000,0),(32,34,0.000000,0),(33,35,0.000000,0);
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_card`
--

DROP TABLE IF EXISTS `wallet_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_card` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `bank_id` int DEFAULT NULL COMMENT 'Bank ID of the card',
  `wallet_id` int DEFAULT NULL COMMENT 'Wallet ID of the card',
  `card_account` varchar(255) DEFAULT NULL COMMENT 'Card number',
  `phone` varchar(255) DEFAULT NULL COMMENT 'Phone of the card',
  `amount` decimal(24,6) DEFAULT NULL COMMENT 'Money amount',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Wallet Card';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_card`
--

LOCK TABLES `wallet_card` WRITE;
/*!40000 ALTER TABLE `wallet_card` DISABLE KEYS */;
INSERT INTO `wallet_card` VALUES (9,368,13,'傻逼宋昊轩','傻逼刘哲',0.000000),(21,370,11,'4551819189189','15454228546',779.200000),(22,370,11,'151656561156','15685487556',1000.000000),(23,370,11,'156156156156156160','15447882456',984.000000),(24,369,11,'13453298','13245679813',1000.000000),(25,369,33,'66666666','13326294741',0.000000),(26,369,11,'123123123','17713199318',0.000000),(27,369,11,'84545','17713199318',0.000000);
/*!40000 ALTER TABLE `wallet_card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-09 15:57:43
