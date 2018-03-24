-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2017 at 06:42 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `personId` int(22) NOT NULL,
  `companyName` varchar(22) DEFAULT NULL,
  `firstName` varchar(11) NOT NULL,
  `lastName` varchar(11) NOT NULL,
  `email` varchar(33) NOT NULL,
  `password` varchar(33) DEFAULT NULL,
  `phone` varchar(22) NOT NULL,
  `image` varchar(99) DEFAULT NULL,
  `address` varchar(44) NOT NULL,
  `city` varchar(22) NOT NULL,
  `state` varchar(22) NOT NULL,
  `zip` int(11) NOT NULL,
  `country` varchar(22) NOT NULL,
  `userType` varchar(11) NOT NULL,
  `adminId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`personId`, `companyName`, `firstName`, `lastName`, `email`, `password`, `phone`, `image`, `address`, `city`, `state`, `zip`, `country`, `userType`, `adminId`) VALUES
(1, 'Gadget & Gear', 'Rabin', 'Mallick', 'rabin@gmail.com', '12345', '01727665544', '1.jpg', 'Mirpur, Dhaka', 'Dhaka', 'Bangladesh', 1229, 'Bangladesh', 'admin', NULL),
(2, NULL, 'Ziaul', 'Islam', 'ziaul@gmail.com', NULL, '01939658824', NULL, 'Dhanmondi, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'customer', 1),
(3, 'Gadget & Gear', 'Rupam', 'Mallick', 'rupam@yahoo.com', '112233', '01727665522', '3.jpg', 'Uttara, Dhaka', 'Dhaka', 'Bangladesh', 1229, 'Bangladesh', 'employee', 1),
(4, NULL, 'Zahidul', 'Islam', 'zahidul@yahoo.com', '123123', '01727665533', NULL, 'Gulshan, Dhaka', 'Dhaka', 'Bangladesh', 1229, 'Bangladesh', 'employee', 1),
(5, NULL, 'Mainul', 'Hasan', 'mainul@yahoo.com', NULL, '01727558894', NULL, 'Banani, Dhaka', 'Dhaka', 'Bangladesh', 1213, 'Bangladesh', 'customer', 1),
(7, NULL, 'Mushfiq', 'rahman', 'mushfiq@gmail.com', NULL, '01939658554', NULL, 'Mirpur, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'customer', 1),
(8, NULL, 'Minhaj', 'Islam', 'minhaj@gmail.com', NULL, '01939658824', NULL, 'Mirpur, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'customer', 1),
(9, 'Tech Plaza', 'Pulok', 'Mallick', 'pulok@yahoo.com', '123123', '01727684433', NULL, 'Mirpur, Dhaka', 'Dhaka', 'Bangladesh', 1229, 'Bangladesh', 'admin', NULL),
(10, 'NEO Tech', 'Mashrafe', 'Anwar', 'mashrafe@gmail.com', '123123', '1939658824', NULL, 'Dhanmondi, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'admin', NULL),
(11, 'Pran Food Ltd', 'Mustafizur', 'rahman', 'mustafizur@gmail.com', '121212', '01939658554', NULL, 'Gulshan, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'admin', NULL),
(12, 'ACI Pharma Ltd', 'Moinak', 'Paul', 'moinak@yahoo.com', '123456', '01727665233', NULL, 'Gulshan, Dhaka', 'Dhaka', 'Bangladesh', 1229, 'Bangladesh', 'admin', NULL),
(13, 'Tech & Gadget', 'Khairul', 'Kobir', 'khairul@gmail.com', '12345', '01939658824', NULL, 'Mirpur, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'admin', NULL),
(14, 'Bangladesh Bank', 'Ziaul', 'Islam', 'ziaul@gmail.com', '12345', '1939658824', NULL, 'Dhanmondi, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'admin', NULL),
(15, 'Bangladesh Bank', 'Ziaul', 'Islam', 'ziaul@gmail.com', '123123', '1939658824', NULL, 'Dhanmondi, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'admin', NULL),
(16, 'Tech Plaza', 'Kabir', 'Khan', 'kabir@yahoo.com', '123123', '1939658824', NULL, 'Dhanmondi, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'employee', 9),
(18, 'Gadget & Gear', 'Latif', 'Islam', 'latif@yahoo.com', '12345', '01727665511', NULL, 'Mirpur, Dhaka', 'Dhaka', 'Bangladesh', 1229, 'Bangladesh', 'employee', 1),
(19, 'Tech Plaza', 'Ziaul', 'Islam', 'ziaul@gmail.com', '12345', '01939658824', NULL, 'Dhanmondi, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'employee', 9),
(20, NULL, 'Zia', 'Islam', 'zia@gmail.com', NULL, '01939658824', NULL, 'Dhanmondi, Dhaka', 'Dhaka', 'Bangladesh', 1209, 'Bangladesh', 'customer', 9),
(21, NULL, 'Mainul', 'Hasan', 'mainul@yahoo.com', NULL, '01727558894', NULL, 'Gulshan, Dhaka', 'Dhaka', 'Bangladesh', 1213, 'Bangladesh', 'customer', 9),
(22, NULL, 'Abid', 'Hasan', 'abid@gmail.com', NULL, '01727558894', NULL, 'Uttara, Dhaka', 'Dhaka', 'Bangladesh', 1230, 'Bangladesh', 'customer', 9);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` int(22) NOT NULL,
  `itemName` varchar(22) NOT NULL,
  `category` varchar(22) NOT NULL,
  `manufacturer` varchar(22) NOT NULL,
  `supplier` varchar(22) NOT NULL,
  `buyingPrice` varchar(11) NOT NULL,
  `sellingPrice` varchar(11) NOT NULL,
  `quantity` varchar(11) NOT NULL,
  `adminId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `itemName`, `category`, `manufacturer`, `supplier`, `buyingPrice`, `sellingPrice`, `quantity`, `adminId`) VALUES
(1, 'Samsung S6', 'Smartphone', 'Samsung BD', 'Samsung', '40000', '50000', '20', 1),
(2, 'Iphone X', 'Smartphone', 'Iphone BD', 'Iphone', '80000', '10000', '40', 1),
(3, 'Micromax Canvas 2', 'Smartphone', 'Micromax BD', 'Micromax', '8000', '11000', '50', 1),
(4, 'Samsung', 'Smartphone', 'Samsung BD', 'Samsung', '10000', '15000', '10', 9),
(5, 'Micromax Mobile', 'Smartphone', 'Micromax BD', 'Micromax', '8000', '12000', '30', 9),
(6, 'Motorola', 'Smartphone', 'Motorola BD Ltd', 'Motorola', '15000', '20000', '19', 1),
(7, 'Canon EOS 700D', 'DSLR Camera', 'Canon BD Ltd', 'Canon', '30000', '40000', '19', 1),
(8, 'Samsun 18\" LCD Display', 'Monitor', 'Samsung BD', 'Samsung', '8000', '9000', '20', 1),
(9, 'Canon EOS 1300D', 'DSLR Camera', 'Canon BD Ltd', 'Canon', '28000', '32000', '20', 1),
(10, 'Intel Core i5', 'Processor', 'Intel BD', 'Intel Inc', '13000', '16000', '29', 1),
(11, 'Intel Core i7', 'Processor', 'Intel BD', 'Intel Inc', '30000', '34000', '25', 1),
(12, 'Motorola Moto X4', 'Smartphone', 'Motorola BD Ltd', 'Motorola', '30000', '34000', '15', 1),
(13, 'Intel Core I5', 'Processor', 'Intel BD', 'Intel Inc', '14000', '15000', '15', 9);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `invoiceNumber` int(22) NOT NULL,
  `date` varchar(22) NOT NULL,
  `time` varchar(11) NOT NULL,
  `adminId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`invoiceNumber`, `date`, `time`, `adminId`) VALUES
(1, '19-9-2017', '10 : 33', 1),
(2, '19-9-2017', '10 : 33', 1),
(3, '19-9-2017', '10 : 39', 9),
(4, '19-9-2017', '10 : 40', 9),
(5, '19-9-2017', '10 : 42', 9);

-- --------------------------------------------------------

--
-- Table structure for table `sold`
--

CREATE TABLE `sold` (
  `productId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `invoiceNumber` int(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sold`
--

INSERT INTO `sold` (`productId`, `customerId`, `quantity`, `invoiceNumber`) VALUES
(1, 2, 1, 1),
(7, 2, 1, 1),
(8, 2, 1, 1),
(10, 2, 1, 1),
(2, 5, 1, 2),
(7, 5, 1, 2),
(4, 20, 1, 3),
(5, 20, 1, 3),
(13, 20, 1, 3),
(5, 21, 1, 4),
(13, 21, 1, 4),
(4, 22, 1, 5),
(5, 22, 1, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`personId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD UNIQUE KEY `invoiceNumber` (`invoiceNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `personId` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `invoiceNumber` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
