-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: readly
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `purchase_link` varchar(255) DEFAULT NULL,
  `total_page` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL,
  `following_id` int NOT NULL,
  `followed_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_followers_1` (`following_id`),
  KEY `FK_members_TO_followers_2` (`followed_id`),
  CONSTRAINT `FK_members_TO_followers_1` FOREIGN KEY (`following_id`) REFERENCES `members` (`id`),
  CONSTRAINT `FK_members_TO_followers_2` FOREIGN KEY (`followed_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_members` (
  `id` int NOT NULL,
  `member_id` int NOT NULL,
  `group_id` int NOT NULL,
  `role` enum('L','M') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_group_members_1` (`member_id`),
  KEY `FK_groups_TO_group_members_1` (`group_id`),
  CONSTRAINT `FK_groups_TO_group_members_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `FK_members_TO_group_members_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group_tags`
--

DROP TABLE IF EXISTS `group_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_tags` (
  `id` int NOT NULL,
  `group_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_groups_TO_group_tags_1` (`group_id`),
  KEY `FK_tags_TO_group_tags_1` (`tag_id`),
  CONSTRAINT `FK_groups_TO_group_tags_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `FK_tags_TO_group_tags_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `is_inviting` enum('a','r') DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `max_participants` int DEFAULT NULL,
  `group_image` varchar(50) DEFAULT NULL,
  `room_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL,
  `member_id` int NOT NULL,
  `timecapsule_item_id` int NOT NULL,
  `time_capsule_item_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_likes_1` (`member_id`),
  KEY `FK_timecapsule_items_TO_likes_1` (`timecapsule_item_id`),
  KEY `FK5j93j3luaxnjd7uxcf8mbslca` (`time_capsule_item_id`),
  CONSTRAINT `FK5j93j3luaxnjd7uxcf8mbslca` FOREIGN KEY (`time_capsule_item_id`) REFERENCES `timecapsule_items` (`id`),
  CONSTRAINT `FK_members_TO_likes_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  CONSTRAINT `FK_timecapsule_items_TO_likes_1` FOREIGN KEY (`timecapsule_item_id`) REFERENCES `timecapsule_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL,
  `login_id` varchar(255) DEFAULT NULL,
  `login_pwd` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `member_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `point` int DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `join_date` timestamp NULL DEFAULT NULL,
  `gender` enum('F','M') DEFAULT NULL,
  `social` enum('G','I','K','R') DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `photocards`
--

DROP TABLE IF EXISTS `photocards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photocards` (
  `id` int NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `visibility` enum('A','E') DEFAULT NULL,
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  `photocard_image` varchar(1000) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `photo_card_image` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_photocards_1` (`member_id`),
  KEY `FK_books_TO_photocards_1` (`book_id`),
  CONSTRAINT `FK_books_TO_photocards_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FK_members_TO_photocards_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proceedings`
--

DROP TABLE IF EXISTS `proceedings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proceedings` (
  `id` int NOT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_groups_TO_proceedings_1` (`group_id`),
  CONSTRAINT `FK_groups_TO_proceedings_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `read_books`
--

DROP TABLE IF EXISTS `read_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `read_books` (
  `id` int NOT NULL,
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  `current_page` int DEFAULT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_read_books_1` (`member_id`),
  KEY `FK_books_TO_read_books_1` (`book_id`),
  KEY `FK_groups_TO_read_books_1` (`group_id`),
  CONSTRAINT `FK_books_TO_read_books_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FK_groups_TO_read_books_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `FK_members_TO_read_books_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `visibility` enum('A','E') DEFAULT NULL,
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_reviews_1` (`member_id`),
  KEY `FK_books_TO_reviews_1` (`book_id`),
  CONSTRAINT `FK_books_TO_reviews_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FK_members_TO_reviews_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL,
  `tag_name` varchar(10) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timecapsule`
--

DROP TABLE IF EXISTS `timecapsule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timecapsule` (
  `id` int NOT NULL,
  `release_date` timestamp NULL DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `member_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_timecapsule_1` (`member_id`),
  CONSTRAINT `FK_members_TO_timecapsule_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timecapsule_items`
--

DROP TABLE IF EXISTS `timecapsule_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timecapsule_items` (
  `id` int NOT NULL,
  `timecapsule_id` int NOT NULL,
  `photocard_id` int NOT NULL,
  `reviews_id` int NOT NULL,
  `item_type` enum('P','R') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_photocards_TO_timecapsule_items_1` (`photocard_id`),
  KEY `FK_reviews_TO_timecapsule_items_1` (`reviews_id`),
  KEY `FK2m96ibb27drto4qh4xypy3k50` (`timecapsule_id`),
  CONSTRAINT `FK2m96ibb27drto4qh4xypy3k50` FOREIGN KEY (`timecapsule_id`) REFERENCES `timecapsules` (`id`),
  CONSTRAINT `FK_photocards_TO_timecapsule_items_1` FOREIGN KEY (`photocard_id`) REFERENCES `photocards` (`id`),
  CONSTRAINT `FK_reviews_TO_timecapsule_items_1` FOREIGN KEY (`reviews_id`) REFERENCES `reviews` (`id`),
  CONSTRAINT `FK_timecapsule_TO_timecapsule_items_1` FOREIGN KEY (`timecapsule_id`) REFERENCES `timecapsule` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timecapsules`
--

DROP TABLE IF EXISTS `timecapsules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timecapsules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `end_date` date DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjjsqsvl7690xnkhdh3ch2bdd5` (`member_id`),
  CONSTRAINT `FKjjsqsvl7690xnkhdh3ch2bdd5` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-30 10:37:19
