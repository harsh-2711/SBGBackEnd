-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 02, 2020 at 06:59 AM
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
  `AttachmentId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `MessageId` int(11) NOT NULL,
  PRIMARY KEY (`AttachmentId`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`AttachmentId`, `Name`, `MessageId`) VALUES
(4, 'sbg_daiict.sql', 15),
(5, 'SBG_DAIICT_USECASE - Copy.pdf', 17),
(6, 'SBG_DAIICT_USECASE.pdf', 17),
(7, 'SBG-DAIICT_Activity1.pdf', 17),
(8, 'SBG_DAIICT_USECASE.pdf', 20),
(9, 'player.txt', 37);

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
(1, 'Microsoft Club', 'mstc@daiict.ac.in', 'club_convener@daiict.ac.in', 'aman.sharma122111@gmail.com'),
(6, 'Synapse Committee', 'synapse@daiict.ac.in', '201912120@daiict.ac.in', 'aman.sharma122111@gmail.com'),
(7, 'Sports committee', 'sports@daiict.ac.in', '201912120@daiict.ac.in', 'user@one.com');

-- --------------------------------------------------------

--
-- Table structure for table `communication`
--

DROP TABLE IF EXISTS `communication`;
CREATE TABLE IF NOT EXISTS `communication` (
  `MessageId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(75) NOT NULL,
  `MessageText` longtext NOT NULL,
  `ReplyTo` varchar(50) DEFAULT NULL,
  `EventId` varchar(100) NOT NULL,
  `MessageDirection` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `IsNotified` tinyint(1) NOT NULL,
  PRIMARY KEY (`MessageId`)
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `communication`
--

INSERT INTO `communication` (`MessageId`, `UserName`, `MessageText`, `ReplyTo`, `EventId`, `MessageDirection`, `DateTime`, `IsNotified`) VALUES
(38, 'SBG Convener', 'ok', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 11, '2020-05-01 13:42:57', 0),
(37, 'Dean Students', '', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 8, '2020-05-01 13:40:27', 0),
(35, 'Dean Students', 'Hey', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 8, '2020-05-01 13:34:45', 0),
(36, 'Dean Students', 'Hello', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 8, '2020-05-01 13:35:00', 0),
(39, 'SBG Convener', 'Done Sir', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 11, '2020-05-01 13:43:15', 0),
(40, 'SBG Convener', 'Provide  me a detailed Description ', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 9, '2020-05-01 13:44:42', 0),
(41, 'Dean Students', 'ok good', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 8, '2020-05-01 15:11:29', 0),
(42, 'Dean Students', 'Hello Whats going on\nHey ', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 8, '2020-05-01 15:37:19', 0),
(43, 'Club Convener', 'Yes Sure', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 10, '2020-05-02 12:11:16', 0),
(44, 'Club Convener', 'Hey ', NULL, '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 10, '2020-05-02 12:24:37', 0),
(45, 'SBG Convener', 'Hey Dean Whats up!', NULL, '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 11, '2020-05-02 12:27:45', 0),
(46, 'Dean Students', 'Hey', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 8, '2020-05-02 12:28:46', 0);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `EventId` varchar(50) NOT NULL,
  `EventName` varchar(100) NOT NULL,
  `VenueId` int(11) NOT NULL,
  `ClubId` int(11) NOT NULL,
  `StartDateTime` varchar(50) NOT NULL,
  `EndDateTime` varchar(50) NOT NULL,
  `StatusId` int(11) NOT NULL,
  PRIMARY KEY (`EventId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`EventId`, `EventName`, `VenueId`, `ClubId`, `StartDateTime`, `EndDateTime`, `StatusId`) VALUES
('9858ad86-98da-4baf-8761-a875db572676', 'Synapse 2021', 50, 6, '2020-04-29T10:26:40.246Z', '2020-04-29T10:26:40.246Z', 12),
('3875586f-45b1-4ab3-84e7-09773d267d73', 'Synapse 2021', 50, 6, '2020-04-29T10:26:40.246Z', '2020-04-29T10:26:40.246Z', 7),
('1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'Hack Infinity 2.0', 2, 1, '2020-04-29T08:11:04.991Z', '2020-04-29T08:11:04.991Z', 1),
('2da23406-eb24-49ae-97bf-47c92c04e59e', 'Hack Infinity', 50, 1, '2020-04-12T18:30:00.000Z', '2020-04-23T18:30:00.000Z', 3),
('46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Synapse 2020', 51, 6, '2020-04-29T05:27:08.835Z', '2020-04-29T05:27:08.835Z', 3),
('0704e4d3-eafc-4e6c-a3c9-4526107d309e', 'Some Event', 1, 1, '2020-05-01T05:31:33.298Z', '2020-04-30T19:34:00.000Z', 1);

-- --------------------------------------------------------

--
-- Table structure for table `eventguest`
--

DROP TABLE IF EXISTS `eventguest`;
CREATE TABLE IF NOT EXISTS `eventguest` (
  `GuestId` int(11) NOT NULL AUTO_INCREMENT,
  `GuestName` varchar(500) NOT NULL,
  `EventId` varchar(50) NOT NULL,
  `Description` longtext NOT NULL,
  PRIMARY KEY (`GuestId`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventguest`
--

INSERT INTO `eventguest` (`GuestId`, `GuestName`, `EventId`, `Description`) VALUES
(16, 'Amit Trivedi', '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Amit Trivedi is an Indian film score composer, singer and lyricist. As a contemporary music director, he is well known for his versatility; his work ranges from angry rock, authentic classical, honey-soaked melodies to novel fusion musi'),
(15, 'Malhar Thakar', '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Malhar Thakar is an Indian actor who primarily works in the Gujarati film industry and theatre. After nine years in theatre, he eventually broke into film roles. His debut film as the lead role was Chhello Divas which was commercially successfu'),
(30, 'Sundar Pichai', '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Pichai Sundararajan, also known as Sundar Pichai, is an Indian American business executive, the chief executive officer of Alphabet Inc. and its subsidiary Google LLC. Pichai began his career as a materials engineer and joined Google as a management executive in 2004'),
(31, 'Satya Nandela ', '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Satya Narayana Nadella is an Indian American business executive. He is the chief executive officer of Microsoft, succeeding Steve Ballmer in 2014. Before becoming CEO, he was the executive vice president of Microsoft\'s cloud and enterprise group, responsible for building and running the company\'s computing platforms'),
(29, 'Azim Premji', '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'Azim Hashim Premji is an Indian business tycoon, investor, engineer, and philanthropist, who is the chairman of Wipro Limited. He is informally known as the Czar of the Indian IT Industry.'),
(28, 'Francisco D\'Souza', '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'Francisco D\'Souza is an Indian American entrepreneur and businessman, who is the former CEO and Vice Chairman of Cognizant — a Fortune 200 global professional services company — co-founded the NASDAQ-100 company in 1994'),
(27, 'Shantanu Narayen', '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'Shantanu Narayen is an Indian American business executive. He is the chairman, president, and chief executive officer of Adobe Inc. Prior to this, he was the president and chief operating officer since 2005.');

-- --------------------------------------------------------

--
-- Table structure for table `eventsponsers`
--

DROP TABLE IF EXISTS `eventsponsers`;
CREATE TABLE IF NOT EXISTS `eventsponsers` (
  `SponserId` int(11) NOT NULL AUTO_INCREMENT,
  `EventId` varchar(50) NOT NULL,
  `SponserName` varchar(50) NOT NULL,
  `SponserLink` varchar(100) NOT NULL,
  `Description` varchar(500) NOT NULL,
  PRIMARY KEY (`SponserId`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventsponsers`
--

INSERT INTO `eventsponsers` (`SponserId`, `EventId`, `SponserName`, `SponserLink`, `Description`) VALUES
(11, '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Redbull', 'https://www.redbull.com/', 'Red Bull is an energy drink, the manufacturer owned by the British-Dutch company Unilever and Austrian company Red Bull GmbH. Red Bull has the highest market share of any energy drink in the world, wi'),
(12, '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Realme', 'https://www.realme.com/in/', 'Realme is a Shenzhen-based Chinese smartphone manufacturer. The brand was officially established on May 4, 2018 by Sky Li. Realme also produces a wide range of other products such as headphones, fitne'),
(13, '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Jio Saavn', 'https://www.jiosaavn.com/', 'JioSaavn is the Indian online music streaming service and a digital distributor of Bollywood, English and other regional Indian music across the world. Since it was founded in 2007 as Saavn, the compa'),
(31, '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Coding Blocks', 'https://codingblocks.com/', 'Coding Blocks was founded in 2014 with a mission to create skilled Software Engineers for our country and the world. We are here to bridge the gap between the quality of skills demanded by industry and the quality of skills imparted by conventional institutes'),
(30, '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Microsoft', 'https://www.microsoft.com/en-in', 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.'),
(29, '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'Google', 'https://www.google.com/', 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware'),
(27, '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'IBM', 'https://www.ibm.com/', 'International Business Machines Corporation is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries'),
(28, '1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'HP', 'https://www8.hp.com/in/en/home.html', 'The Hewlett-Packard Company, or Hewlett-Packard, was an American multinational information technology company headquartered in Palo Alto, California.');

-- --------------------------------------------------------

--
-- Table structure for table `interested`
--

DROP TABLE IF EXISTS `interested`;
CREATE TABLE IF NOT EXISTS `interested` (
  `EventId` varchar(50) NOT NULL,
  `UserName` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interested`
--

INSERT INTO `interested` (`EventId`, `UserName`) VALUES
('3875586f-45b1-4ab3-84e7-09773d267d73', 'aman.sharma122111@gmail.com');

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
('201912120@daiict.ac.in', 'aman$123', 'Aman', 8320069325, 3, 0),
('aman.sharma122111@gmail.com', 'abc$123', 'Aman Sharma', 8320069325, 3, 0),
('club_convener@daiict.ac.in', '123456', 'Club Convener', 7485965496, 4, 0),
('club_dy_convener@daiict.ac.in', '123456', 'Club Dy. Convener', 85748596542, 5, 0),
('convener_sbg@daiict.ac.in', '123456', 'SBG Convener', 9785963245, 1, 0),
('dean@daiict.ac.in', '123456', 'Dean Students', 9696857485, 2, 0),
('dy_convener_sbg@daiict.ac.in', '123456', 'SBG Dy. Convener', 7485963214, 8, 0),
('secretary_sbg@daiict.ac.in', '123456', 'SBG Secretary', 8596745632, 7, 0),
('student@daiict.ac.in', '123456', 'Maulik Jadav', 9685745632, 3, 0),
('treasurer_sbg@daiict.ac.in', '123456', 'SBG Treasurer', 8585748596, 6, 0),
('user@one.com', 'user123', 'User One', 0, 3, 0);

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
(1, 'SBGConvener'),
(2, 'Dean'),
(3, 'Student'),
(4, 'Convener'),
(5, 'Deputy Convener'),
(6, 'SBGTreasurer'),
(7, 'SBGSecretary'),
(8, 'SBGDyConvener');

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
(4, 'RejectedByDean'),
(5, 'ReportPending'),
(6, 'ReportSubmitted'),
(7, 'Finished'),
(8, 'MessageFromDeanToSBG'),
(9, 'MessageFromSBGToClub'),
(10, 'MessageFromClubToSBG'),
(11, 'MessageFromSBGToDean'),
(12, 'RejectedBySBG');

-- --------------------------------------------------------

--
-- Table structure for table `statuschangelog`
--

DROP TABLE IF EXISTS `statuschangelog`;
CREATE TABLE IF NOT EXISTS `statuschangelog` (
  `LogId` int(11) NOT NULL AUTO_INCREMENT,
  `EventId` varchar(50) NOT NULL,
  `BeforeStatus` int(11) DEFAULT NULL,
  `AfterStatus` int(11) NOT NULL,
  `DateTime` varchar(75) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  PRIMARY KEY (`LogId`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statuschangelog`
--

INSERT INTO `statuschangelog` (`LogId`, `EventId`, `BeforeStatus`, `AfterStatus`, `DateTime`, `UserName`) VALUES
(1, '1', 1, 2, 'Tue Apr 28 2020 23:05:42', 'aman.sharma122111@gmail.com'),
(2, '1', 2, 3, 'Tue Apr 28 2020 23:11:03', 'aman.sharma122111@gmail.com'),
(3, '1', 2, 4, 'Tue Apr 28 2020 23:15:01', 'aman.sharma122111@gmail.com'),
(4, '1', 6, 7, 'Tue Apr 28 2020 23:38:03', 'aman.sharma122111@gmail.com'),
(5, '2', 0, 2, 'Thu Apr 30 2020 10:16:41', 'SBG Convener'),
(6, '9858', 0, 4, 'Thu Apr 30 2020 11:21:22', 'SBG Convener'),
(7, '1676', 0, 4, 'Thu Apr 30 2020 11:24:05', 'SBG Convener'),
(8, '1676', 0, 2, 'Thu Apr 30 2020 11:26:17', 'SBG Convener'),
(9, '3875586', 0, 4, 'Thu Apr 30 2020 11:26:47', 'SBG Convener'),
(10, '3875586', 0, 4, 'Thu Apr 30 2020 11:27:18', 'SBG Convener'),
(11, '1676', 0, 3, 'Thu Apr 30 2020 11:46:52', 'Dean Students'),
(12, '3875586', 0, 12, 'Thu Apr 30 2020 12:15:47', 'SBG Convener'),
(13, '46', 0, 2, 'Thu Apr 30 2020 12:19:52', 'SBG Convener'),
(14, '2', 0, 3, 'Thu Apr 30 2020 12:20:30', 'Dean Students'),
(15, '2', 0, 2, 'Thu Apr 30 2020 12:31:47', 'SBG Convener'),
(16, '9858', 0, 12, 'Thu Apr 30 2020 12:32:00', 'SBG Convener'),
(17, '3875586', 0, 12, 'Thu Apr 30 2020 12:32:11', 'SBG Convener'),
(18, '1676', 0, 2, 'Thu Apr 30 2020 12:32:28', 'SBG Convener'),
(19, '46', 0, 2, 'Thu Apr 30 2020 12:32:34', 'SBG Convener'),
(20, '2', 0, 3, 'Thu Apr 30 2020 12:32:54', 'Dean Students'),
(21, '1676', 0, 4, 'Thu Apr 30 2020 12:33:39', 'Dean Students'),
(22, '0704e4d3-eafc-4e6c-a3c9-4526107d309e', 1, 2, 'Fri May 01 2020 11:06:09', 'convener_sbg@daiict.ac.in');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

DROP TABLE IF EXISTS `subscriber`;
CREATE TABLE IF NOT EXISTS `subscriber` (
  `ClubId` int(11) NOT NULL,
  `UserName` varchar(75) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`ClubId`, `UserName`) VALUES
(6, 'aman.sharma122111@gmail.com'),
(7, 'aman.sharma122111@gmail.com');

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
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `venue`
--

INSERT INTO `venue` (`VenueId`, `VenueName`, `Capacity`, `HasAc`, `HasProj`) VALUES
(1, 'CEP207', 40, 1, 1),
(2, 'LAB001', 120, 0, 1),
(50, 'Mini-Auditorium(CEP)', 70, 1, 1),
(51, 'OAT', 500, 0, 0);

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
(1, 'maulik@gmail.com', 'Maulik Jadav'),
(3, 'maulik@gmail.com', 'Maulik Jadav'),
(1, 'sharma.aman1298@gmail.com', 'Aman Sharma'),
(50, 'prabhunath@gmail.com', 'Prabhunath Sharma'),
(51, 'prabhunath@daiict.ac.in', 'Prabhu Nath');

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
