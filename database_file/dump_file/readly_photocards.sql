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
-- Dumping data for table `photocards` 
--

LOCK TABLES `photocards` WRITE;
/*!40000 ALTER TABLE `photocards` DISABLE KEYS */;
INSERT INTO `photocards` VALUES 
(1, 'Photocard for book 1', 'A', 1, 1, 'https://image.aladin.co.kr/product/34361/47/coversum/k462932903_1.jpg', '2024-08-01'),
(2, 'Photocard for book 2', 'A', 2, 2, 'https://image.aladin.co.kr/product/34292/25/coversum/k692932177_1.jpg', '2024-08-01'),
(3, 'Photocard for book 3', 'E', 3, 3, 'https://image.aladin.co.kr/product/34233/47/coversum/k212931234_2.jpg', '2024-08-01'),
(4, 'Photocard for book 4', 'A', 4, 4, 'https://image.aladin.co.kr/product/33010/94/coversum/8917239501_1.jpg', '2024-08-01'),
(5, 'Photocard for book 5', 'E', 5, 5, 'https://image.aladin.co.kr/product/34366/35/coversum/k952932003_1.jpg', '2024-08-01'),
(6, 'Photocard for book 6', 'A', 6, 6, 'https://image.aladin.co.kr/product/34053/16/coversum/893004168x_2.jpg', '2024-08-01'),
(7, 'Photocard for book 7', 'A', 7, 7, 'https://image.aladin.co.kr/product/34121/16/coversum/s812931190_1.jpg', '2024-08-01'),
(8, 'Photocard for book 8', 'E', 8, 8, 'https://image.aladin.co.kr/product/33010/92/coversum/8917239498_1.jpg', '2024-08-01'),
(9, 'Photocard for book 9', 'A', 9, 9, 'https://image.aladin.co.kr/product/34291/69/coversum/k482932175_1.jpg', '2024-08-01'),
(10, 'Photocard for book 10', 'A', 10, 10, 'https://image.aladin.co.kr/product/33258/31/coversum/8988474910_1.jpg', '2024-08-01'),
(11, 'Photocard for book 11', 'E', 11, 11, 'https://image.aladin.co.kr/product/33648/90/coversum/k172939414_1.jpg', '2024-08-01'),
(12, 'Photocard for book 12', 'A', 12, 12, 'https://image.aladin.co.kr/product/33799/80/coversum/k052930572_1.jpg', '2024-08-01');
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

-- Dump completed on 2024-07-31 14:36:11