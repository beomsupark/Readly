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
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES 
(1, 'Great book!', 'A', 1, 1, '2024-07-31 10:00:00'),
(2, 'Very insightful.', 'A', 2, 2, '2024-07-31 11:00:00'),
(3, 'Not my type.', 'E', 3, 3, '2024-07-31 12:00:00'),
(4, 'Highly recommend.', 'A', 4, 4, '2024-07-31 13:00:00'),
(5, 'Quite boring.', 'E', 5, 5, '2024-07-31 14:00:00'),
(6, 'Informative read.', 'A', 6, 6, '2024-07-31 15:00:00'),
(7, 'Loved the narrative.', 'A', 7, 7, '2024-07-31 16:00:00'),
(8, 'Not bad.', 'E', 8, 8, '2024-07-31 17:00:00'),
(9, 'Could be better.', 'A', 9, 9, '2024-07-31 18:00:00'),
(10, 'Excellent resource.', 'A', 10, 10, '2024-07-31 19:00:00'),
(11, 'Good for beginners.', 'A', 11, 11, '2024-07-31 20:00:00'),
(12, 'Well-written.', 'A', 12, 12, '2024-07-31 21:00:00');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-31 22:00:00
