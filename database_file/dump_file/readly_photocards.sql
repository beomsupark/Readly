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
-- Table structure for table `photocards`
--

DROP TABLE IF EXISTS `photocards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photocards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `visibility` enum('A','E') DEFAULT NULL,
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  `photocard_image` varchar(1000) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_members_TO_photocards_1` (`member_id`),
  KEY `FK_books_TO_photocards_1` (`book_id`),
  CONSTRAINT `FK_books_TO_photocards_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FK_members_TO_photocards_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photocards`
--

LOCK TABLES `photocards` WRITE;
/*!40000 ALTER TABLE `photocards` DISABLE KEYS */;
INSERT INTO `photocards` VALUES (1,'Photocard for book 1','A',1,1,'https://image.aladin.co.kr/product/34361/47/coversum/k462932903_1.jpg','2024-08-01 00:00:00'),(2,'Photocard for book 2','A',2,2,'https://image.aladin.co.kr/product/34292/25/coversum/k692932177_1.jpg','2024-08-01 00:00:00'),(3,'Photocard for book 3','E',3,3,'https://image.aladin.co.kr/product/34233/47/coversum/k212931234_2.jpg','2024-08-01 00:00:00'),(4,'Photocard for book 4','A',4,4,'https://image.aladin.co.kr/product/33010/94/coversum/8917239501_1.jpg','2024-08-01 00:00:00'),(5,'Photocard for book 5','E',5,5,'https://image.aladin.co.kr/product/34366/35/coversum/k952932003_1.jpg','2024-08-01 00:00:00'),(6,'Photocard for book 6','A',6,6,'https://image.aladin.co.kr/product/34053/16/coversum/893004168x_2.jpg','2024-08-01 00:00:00'),(7,'Photocard for book 7','A',7,7,'https://image.aladin.co.kr/product/34121/16/coversum/s812931190_1.jpg','2024-08-01 00:00:00'),(8,'Photocard for book 8','E',8,8,'https://image.aladin.co.kr/product/33010/92/coversum/8917239498_1.jpg','2024-08-01 00:00:00'),(9,'Photocard for book 9','A',9,9,'https://image.aladin.co.kr/product/34291/69/coversum/k482932175_1.jpg','2024-08-01 00:00:00'),(10,'Photocard for book 10','A',10,10,'https://image.aladin.co.kr/product/33258/31/coversum/8988474910_1.jpg','2024-08-01 00:00:00'),(11,'Photocard for book 11','E',11,11,'https://image.aladin.co.kr/product/33648/90/coversum/k172939414_1.jpg','2024-08-01 00:00:00'),(12,'Photocard for book 12','A',12,12,'https://image.aladin.co.kr/product/33799/80/coversum/k052930572_1.jpg','2024-08-01 00:00:00'),(13,'Photocard for book 1','A',1,1,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/201429657-%EC%83%9D%EC%84%B1ai%EB%A1%9C-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%82%B8-%EC%8B%A0%EB%B9%84%EB%A1%9C%EC%9A%B4-%EB%8F%99%ED%99%94%EA%B0%99%EC%9D%80-%EB%B6%84%EC%9C%84%EA%B8%B0%EC%9D%98-%EB%82%98%EB%AC%B4%EC%99%80-%EB%8B%AC.jpg','2024-07-31 15:00:00'),(14,'Photocard for book 2','A',2,2,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/201581567-%EB%8F%99%ED%99%94%EA%B0%99%EC%9D%80-%EC%9E%90%EC%97%B0-%EB%85%B9%EC%83%89-%ED%99%98%EA%B2%BD-%EB%B0%B0%EA%B2%BD-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EC%83%9D%EC%84%B1-ai.jpg','2024-07-31 15:00:00'),(15,'Photocard for book 3','E',3,3,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/2aee4e0b-57ef-4ca7-89b3-3fe87a70bf27.png','2024-07-31 15:00:00'),(16,'Photocard for book 4','A',4,4,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/31e8c877-bd65-4819-bfaa-b7d0f33ec5ca.png','2024-07-31 15:00:00'),(17,'Photocard for book 5','E',5,5,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/5c17c676-6865-4f9b-9253-d908134fe0de.png','2024-07-31 15:00:00'),(18,'Photocard for book 6','A',6,6,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/736a752a-9e03-412c-ad79-0fae1fe66cd2.png','2024-07-31 15:00:00'),(19,'Photocard for book 7','A',7,7,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/ai-generated-8650258_1280.png','2024-07-31 15:00:00'),(20,'Photocard for book 8','E',8,8,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/b5132d4d-9fc1-411f-b8b3-462ffe12d7d1.png','2024-07-31 15:00:00'),(21,'Photocard for book 9','A',9,9,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/f8ec975d-6570-49ad-9d22-eba3143deeed.png','2024-07-31 15:00:00'),(22,'Photocard for book 10','A',10,10,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/fairytale-castle-hilltop-generative-ai_918839-2978.jpg','2024-07-31 15:00:00'),(23,'Photocard for book 11','E',11,11,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/ff3ee37b-3bf1-4695-846a-daa8bfbab9c5.png','2024-07-31 15:00:00'),(24,'Photocard for book 12','A',12,12,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(1).jpg','2024-07-31 15:00:00'),(25,'Photocard for book 13','A',5,13,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(2).jpg','2024-08-01 15:00:00'),(26,'Photocard for book 14','E',3,14,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(3).jpg','2024-08-01 15:00:00'),(27,'Photocard for book 15','A',7,15,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(4).jpg','2024-08-01 15:00:00'),(28,'Photocard for book 16','E',2,16,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(5).jpg','2024-08-01 15:00:00'),(29,'Photocard for book 17','A',9,17,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(6).jpg','2024-08-01 15:00:00'),(30,'Photocard for book 18','A',4,18,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(7).jpg','2024-08-01 15:00:00'),(31,'Photocard for book 19','E',11,19,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(8).jpg','2024-08-01 15:00:00'),(32,'Photocard for book 20','A',1,20,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/jbuJO1706360331.jpg','2024-08-01 15:00:00'),(33,'Photocard for book 21','A',8,21,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images.jpg','2024-08-01 15:00:00'),(34,'Photocard for book 22','E',10,22,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/58s09342m1bppw6ieihi.jpg','2024-08-01 15:00:00'),(35,'Photocard for book 23','A',12,23,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg','2024-08-01 15:00:00'),(36,'Photocard for book 24','A',6,24,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(10).jpg','2024-08-01 15:00:00'),(37,'Photocard for book 25','E',5,25,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/images+(9).jpg','2024-08-01 15:00:00'),(38,'Photocard for book 26','A',3,26,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/main_section_1_img2.jpg','2024-08-01 15:00:00'),(39,'Photocard for book 27','A',2,27,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C+(1).jpg','2024-08-01 15:00:00'),(40,'Photocard for book 28','E',1,28,'https://c207-bucket.s3.ap-southeast-2.amazonaws.com/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0','2024-08-01 15:00:00');
/*!40000 ALTER TABLE `photocards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-08 15:49:48
