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
(2, 'Very insightful.', 'A', 5, 2, '2024-07-31 11:00:00'),
(3, 'Not my type.', 'E', 7, 3, '2024-07-31 12:00:00'),
(4, 'Highly recommend.', 'A', 4, 4, '2024-07-31 13:00:00'),
(5, 'Quite boring.', 'E', 11, 5, '2024-07-31 14:00:00'),
(6, 'Informative read.', 'A', 3, 6, '2024-07-31 15:00:00'),
(7, 'Loved the narrative.', 'A', 10, 7, '2024-07-31 16:00:00'),
(8, 'Not bad.', 'E', 8, 8, '2024-07-31 17:00:00'),
(9, 'Could be better.', 'A', 12, 9, '2024-07-31 18:00:00'),
(10, 'Excellent resource.', 'A', 2, 10, '2024-07-31 19:00:00'),
(11, 'Good for beginners.', 'A', 6, 11, '2024-07-31 20:00:00'),
(12, 'Well-written.', 'A', 9, 12, '2024-07-31 21:00:00'),
(13, 'Engaging story.', 'A', 11, 13, '2024-07-31 22:00:00'),
(14, 'Too complex.', 'E', 4, 14, '2024-07-31 23:00:00'),
(15, 'Loved the characters.', 'A', 7, 15, '2024-08-01 00:00:00'),
(16, 'Not for everyone.', 'E', 1, 16, '2024-08-01 01:00:00'),
(17, 'Boring plot.', 'E', 3, 17, '2024-08-01 02:00:00'),
(18, 'Very engaging.', 'A', 6, 18, '2024-08-01 03:00:00'),
(19, 'A masterpiece.', 'A', 12, 19, '2024-08-01 04:00:00'),
(20, 'Not worth it.', 'E', 2, 20, '2024-08-01 05:00:00'),
(21, 'Great characters.', 'A', 5, 21, '2024-08-01 06:00:00'),
(22, 'Amazing!', 'A', 8, 22, '2024-08-01 07:00:00'),
(23, 'Just okay.', 'E', 10, 23, '2024-08-01 08:00:00'),
(24, 'Fantastic read.', 'A', 9, 24, '2024-08-01 09:00:00'),
(25, 'Very boring.', 'E', 4, 25, '2024-08-01 10:00:00'),
(26, 'Loved it.', 'A', 11, 26, '2024-08-01 11:00:00'),
(27, 'Could not finish.', 'E', 3, 27, '2024-08-01 12:00:00'),
(28, 'Highly entertaining.', 'A', 7, 28, '2024-08-01 13:00:00'),
(29, 'Disappointing.', 'E', 2, 29, '2024-08-01 14:00:00'),
(30, 'Incredibly boring.', 'E', 5, 30, '2024-08-01 15:00:00'),
(31, 'Very educational.', 'A', 6, 31, '2024-08-01 16:00:00'),
(32, 'Just brilliant.', 'A', 12, 32, '2024-08-01 17:00:00'),
(33, 'Not my style.', 'E', 1, 33, '2024-08-01 18:00:00'),
(34, 'Loved every bit.', 'A', 4, 34, '2024-08-01 19:00:00'),
(35, 'Dull read.', 'E', 10, 35, '2024-08-01 20:00:00'),
(36, 'Very inspiring.', 'A', 9, 36, '2024-08-01 21:00:00'),
(37, 'Too dull.', 'E', 3, 37, '2024-08-01 22:00:00'),
(38, 'Great insights.', 'A', 11, 38, '2024-08-01 23:00:00'),
(39, 'Highly valuable.', 'A', 6, 39, '2024-08-02 00:00:00'),
(40, 'Not my favorite.', 'E', 2, 40, '2024-08-02 01:00:00'),
(41, 'Loved the twists.', 'A', 5, 41, '2024-08-02 02:00:00'),
(42, 'Quite informative.', 'A', 8, 42, '2024-08-02 03:00:00'),
(43, 'Too slow.', 'E', 4, 43, '2024-08-02 04:00:00'),
(44, 'Fantastic characters.', 'A', 9, 44, '2024-08-02 05:00:00'),
(45, 'Very deep.', 'A', 7, 45, '2024-08-02 06:00:00'),
(46, 'Not for me.', 'E', 3, 46, '2024-08-02 07:00:00'),
(47, 'Great for everyone.', 'A', 12, 47, '2024-08-02 08:00:00'),
(48, 'Too complex for me.', 'E', 1, 48, '2024-08-02 09:00:00'),
(49, 'Highly engaging.', 'A', 11, 49, '2024-08-02 10:00:00'),
(50, 'Very detailed.', 'A', 4, 50, '2024-08-02 11:00:00'),
(51, 'Boring in parts.', 'E', 2, 51, '2024-08-02 12:00:00'),
(52, 'Amazing journey.', 'A', 6, 52, '2024-08-02 13:00:00'),
(53, 'Not my kind.', 'E', 7, 53, '2024-08-02 14:00:00'),
(54, 'Loved the ending.', 'A', 5, 54, '2024-08-02 15:00:00'),
(55, 'Highly recommend.', 'A', 10, 55, '2024-08-02 16:00:00'),
(56, 'Very thought-provoking.', 'A', 3, 56, '2024-08-02 17:00:00'),
(57, 'Too dull to finish.', 'E', 11, 57, '2024-08-02 18:00:00'),
(58, 'Fantastic story.', 'A', 8, 58, '2024-08-02 19:00:00'),
(59, 'Not worth the time.', 'E', 9, 59, '2024-08-02 20:00:00'),
(60, 'Loved every moment.', 'A', 4, 60, '2024-08-02 21:00:00'),
(61, 'Very inspiring read.', 'A', 6, 61, '2024-08-02 22:00:00'),
(62, 'Difficult to follow.', 'E', 12, 62, '2024-08-02 23:00:00'),
(63, 'Highly detailed.', 'A', 7, 63, '2024-08-03 00:00:00'),
(64, 'Not very engaging.', 'E', 5, 64, '2024-08-03 01:00:00'),
(65, 'Loved the plot.', 'A', 2, 65, '2024-08-03 02:00:00'),
(66, 'Very educational.', 'A', 1, 66, '2024-08-03 03:00:00'),
(67, 'Quite boring.', 'E', 9, 67, '2024-08-03 04:00:00'),
(68, 'Fantastic insights.', 'A', 10, 68, '2024-08-03 05:00:00'),
(69, 'Could not put down.', 'A', 3, 69, '2024-08-03 06:00:00'),
(70, 'Too long.', 'E', 11, 70, '2024-08-03 07:00:00'),
(71, 'Loved every page.', 'A', 12, 71, '2024-08-03 08:00:00'),
(72, 'Not what I expected.', 'E', 8, 72, '2024-08-03 09:00:00'),
(73, 'Highly recommend to all.', 'A', 6, 73, '2024-08-03 10:00:00'),
(74, 'Just fantastic.', 'A', 4, 74, '2024-08-03 11:00:00'),
(75, 'Very tedious.', 'E', 2, 75, '2024-08-03 12:00:00'),
(76, 'Highly insightful.', 'A', 5, 76, '2024-08-03 13:00:00'),
(77, 'Loved the writing.', 'A', 7, 77, '2024-08-03 14:00:00'),
(78, 'Not my type.', 'E', 1, 78, '2024-08-03 15:00:00'),
(79, 'Very engaging.', 'A', 3, 79, '2024-08-03 16:00:00'),
(80, 'Too complicated.', 'E', 10, 80, '2024-08-03 17:00:00'),
(81, 'Loved the theme.', 'A', 6, 81, '2024-08-03 18:00:00'),
(82, 'Very boring.', 'E', 4, 82, '2024-08-03 19:00:00'),
(83, 'Highly informative.', 'A', 2, 83, '2024-08-03 20:00:00'),
(84, 'Could be better.', 'E', 8, 84, '2024-08-03 21:00:00'),
(85, 'Great concepts.', 'A', 9, 85, '2024-08-03 22:00:00'),
(86, 'Not my favorite.', 'E', 12, 86, '2024-08-03 23:00:00'),
(87, 'Fantastic read.', 'A', 5, 87, '2024-08-04 00:00:00'),
(88, 'Very boring.', 'E', 1, 88, '2024-08-04 01:00:00'),
(89, 'Loved the characters.', 'A', 4, 89, '2024-08-04 02:00:00'),
(90, 'Too repetitive.', 'E', 7, 90, '2024-08-04 03:00:00'),
(91, 'Highly entertaining.', 'A', 10, 91, '2024-08-04 04:00:00'),
(92, 'Not engaging.', 'E', 11, 92, '2024-08-04 05:00:00'),
(93, 'Loved the storyline.', 'A', 8, 93, '2024-08-04 06:00:00'),
(94, 'Too boring.', 'E', 3, 94, '2024-08-04 07:00:00'),
(95, 'Very informative.', 'A', 6, 95, '2024-08-04 08:00:00'),
(96, 'Not my style.', 'E', 2, 96, '2024-08-04 09:00:00'),
(97, 'Great insights.', 'A', 9, 97, '2024-08-04 10:00:00'),
(98, 'Could not relate.', 'E', 5, 98, '2024-08-04 11:00:00'),
(99, 'Fantastic writing.', 'A', 12, 99, '2024-08-04 12:00:00'),
(100, 'Not interesting.', 'E', 1, 100, '2024-08-04 13:00:00');
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

-- Dump completed on 2024-08-04 14:00:00