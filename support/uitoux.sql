-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.10.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table uitoux.cart
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_id` varchar(10) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table uitoux.cart: ~0 rows (approximately)
INSERT INTO `cart` (`cart_id`, `prod_id`, `user_id`) VALUES
	(1, '2', '1'),
	(2, '1', '1');

-- Dumping structure for table uitoux.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table uitoux.categories: ~3 rows (approximately)
INSERT INTO `categories` (`category_id`, `category_name`) VALUES
	(1, 'Power Tools'),
	(2, 'Hand Tools'),
	(3, 'Plumbing');

-- Dumping structure for table uitoux.products
CREATE TABLE IF NOT EXISTS `products` (
  `prod_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(10) NOT NULL,
  `prod_name` varchar(100) NOT NULL,
  `part_code` varchar(100) NOT NULL,
  `discount_price` decimal(10,2) NOT NULL,
  `fixed_price` decimal(10,2) NOT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`prod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table uitoux.products: ~2 rows (approximately)
INSERT INTO `products` (`prod_id`, `category_id`, `prod_name`, `part_code`, `discount_price`, `fixed_price`, `status`) VALUES
	(1, '1', 'Motor oil Level 5', 'SKU: 573-493B6-C', 452.00, 573.00, 'featured'),
	(2, '2', 'Body Level 4', 'SKU: 575-496B6-C', 452.00, 573.00, 'normal');

-- Dumping structure for table uitoux.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_id` varchar(50) NOT NULL,
  `stars` varchar(10) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table uitoux.reviews: ~2 rows (approximately)
INSERT INTO `reviews` (`review_id`, `prod_id`, `stars`, `user_id`) VALUES
	(1, '1', '5', '1'),
	(2, '1', '4', '2');

-- Dumping structure for table uitoux.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table uitoux.users: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
