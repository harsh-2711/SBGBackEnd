-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 28, 2020 at 08:29 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sbg_daiict`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
CREATE TABLE IF NOT EXISTS `attachments` (
  `AttachmentId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `MessageId` int(11) NOT NULL,
  PRIMARY KEY (`AttachmentId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
CREATE TABLE IF NOT EXISTS `club` (
  `ClubId` int(11) NOT NULL AUTO_INCREMENT,
  `ClubName` varchar(100) NOT NULL,
  `ClubEmail` varchar(100) NOT NULL,
  `Convener` varchar(100) DEFAULT NULL,
  `DConvener` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ClubId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `club`
--

INSERT INTO `club` (`ClubId`, `ClubName`, `ClubEmail`, `Convener`, `DConvener`) VALUES
(5, 'Microsoft Club', 'mstc@daiict.ac.in', 'aman.sharma122111@gmail.com', NULL),
(6, 'Synapse Committee', 'synapse@daiict.ac.in', 'user@one.com', NULL),
(7, 'Sports committee', 'sports@daiict.ac.in', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `communication`
--

DROP TABLE IF EXISTS `communication`;
CREATE TABLE IF NOT EXISTS `communication` (
  `MessageId` int(11) NOT NULL,
  `MessageText` longtext NOT NULL,
  `ReplyTo` longtext NOT NULL,
  `EventId` int(11) NOT NULL,
  `MessageDirection` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `IsNotified` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `EventId` int(11) NOT NULL,
  `VenueId` int(11) NOT NULL,
  `ClubId` int(11) NOT NULL,
  `StartDateTime` varchar(50) NOT NULL,
  `EndDateTime` varchar(50) NOT NULL,
  `StatusId` int(11) NOT NULL,
  PRIMARY KEY (`EventId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `eventguest`
--

DROP TABLE IF EXISTS `eventguest`;
CREATE TABLE IF NOT EXISTS `eventguest` (
  `GuestName` varchar(100) NOT NULL,
  `EventId` int(11) NOT NULL,
  `Description` longtext NOT NULL,
  PRIMARY KEY (`GuestName`,`EventId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `eventsponsers`
--

DROP TABLE IF EXISTS `eventsponsers`;
CREATE TABLE IF NOT EXISTS `eventsponsers` (
  `EventId` int(11) NOT NULL,
  `SponserName` varchar(50) NOT NULL,
  `SponserLink` varchar(100) NOT NULL,
  PRIMARY KEY (`EventId`,`SponserName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `UserName` varchar(100) NOT NULL,
  `PassWord` varchar(50) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Contact` bigint(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `IsReset` tinyint(1) NOT NULL,
  PRIMARY KEY (`UserName`),
  KEY `login_ibfk_1` (`RoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`UserName`, `PassWord`, `Name`, `Contact`, `RoleId`, `IsReset`) VALUES
('aman.sharma122111@gmail.com', 'abc$123', 'Aman Sharma', 8320069325, 2, 0),
('user@one.com', 'user123', 'User One', 0, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(15) NOT NULL,
  PRIMARY KEY (`RoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`RoleId`, `RoleName`) VALUES
(1, 'SBG'),
(2, 'Dean'),
(3, 'Student'),
(4, 'Convener'),
(5, 'Deputy Convener'),
(6, 'Treasurer'),
(7, 'Secretary');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `StatusId` int(11) NOT NULL,
  `StatusName` varchar(100) NOT NULL,
  PRIMARY KEY (`StatusId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`StatusId`, `StatusName`) VALUES
(1, 'EventRaised'),
(2, 'ForwardedBySBG'),
(3, 'Approve'),
(4, 'Reject'),
(5, 'ReportPending'),
(6, 'ReportSubmitted'),
(7, 'Finished'),
(8, 'MessageFromDeanToSBG'),
(9, 'MessageFromSBGToClub'),
(10, 'MessageFromClubToSBG'),
(11, 'MessageFromSBGToDean');

-- --------------------------------------------------------

--
-- Table structure for table `statuschangelog`
--

DROP TABLE IF EXISTS `statuschangelog`;
CREATE TABLE IF NOT EXISTS `statuschangelog` (
  `LogId` int(11) NOT NULL,
  `EventId` int(11) NOT NULL,
  `BeforeStatus` int(11) NOT NULL,
  `AfterStatus` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `UserName` varchar(100) NOT NULL,
  PRIMARY KEY (`LogId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
CREATE TABLE IF NOT EXISTS `venue` (
  `VenueId` int(11) NOT NULL AUTO_INCREMENT,
  `VenueName` varchar(50) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `HasAc` tinyint(1) NOT NULL,
  `HasProj` tinyint(1) NOT NULL,
  PRIMARY KEY (`VenueId`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `venue`
--

INSERT INTO `venue` (`VenueId`, `VenueName`, `Capacity`, `HasAc`, `HasProj`) VALUES
(1, 'CEP207', 40, 0, 1),
(3, 'LAB001', 120, 0, 1),
(49, 'Lab003', 70, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `venueman`
--

DROP TABLE IF EXISTS `venueman`;
CREATE TABLE IF NOT EXISTS `venueman` (
  `VenueId` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `venueman`
--

INSERT INTO `venueman` (`VenueId`, `Email`, `Name`) VALUES
(49, 'abc@gmail.com', 'Prabhunath Sharma'),
(1, 'sharma.aman1298@gmail.com', 'Aman Sharma'),
(3, 'maulik@gmail.com', 'Maulik Jadav'),
(1, 'maulik@gmail.com', 'Maulik Jadav');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `role` (`RoleId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
