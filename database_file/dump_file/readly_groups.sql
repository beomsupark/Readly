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
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`title`, `description`, `is_inviting`, `created_date`, `max_participants`, `current_participants`, `room_id`)
VALUES 
('Group 1', 'Description for Group 1', 'a', '2024-08-01 10:00:00', 10, 2, 'room1'),
('Group 2', 'Description for Group 2', 'a', '2024-08-01 11:00:00', 15, 2, 'room2'),
('Group 3', 'Description for Group 3', 'a', '2024-08-01 12:00:00', 20, 3, 'room3'),
('Group 4', 'Description for Group 4', 'a', '2024-08-01 13:00:00', 12, 4, 'room4'),
('Group 5', 'Description for Group 5', 'a', '2024-08-01 14:00:00', 25, 5, 'room5'),
('Group 6', 'Description for Group 6', 'a', '2024-08-01 15:00:00', 30, 6, 'room6'),
('Group 7', 'Description for Group 7', 'a', '2024-08-01 16:00:00', 8, 7, 'room7'),
('Group 8', 'Description for Group 8', 'a', '2024-08-01 17:00:00', 22, 8, 'room8'),
('Group 9', 'Description for Group 9', 'a', '2024-08-01 18:00:00', 18, 9, 'room9'),
('Group 10', 'Description for Group 10', 'a', '2024-08-01 19:00:00', 16, 10, 'room10'),
('Group 11', 'Description for Group 11', 'a', '2024-08-01 20:00:00', 14, 11, 'room11'),
('Group 12', 'Description for Group 12', 'r', '2024-08-01 21:00:00', 12, 12, 'room12');