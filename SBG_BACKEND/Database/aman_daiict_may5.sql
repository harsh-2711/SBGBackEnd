-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 05, 2020 at 11:04 AM
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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`AttachmentId`, `Name`, `MessageId`) VALUES
(1, 'status.sql', 19),
(2, 'status (1).sql', 30),
(3, 'student.txt', 45);

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
(1, 'Microsoft Club', 'mstc@daiict.ac.in', 'user@one.com', '201912120@daiict.ac.in'),
(6, 'Synapse Committee', 'synapse@daiict.ac.in', '201912120@daiict.ac.in', 'aman.sharma122111@gmail.com'),
(7, 'Sports committee', 'sports@daiict.ac.in', '201912120@daiict.ac.in', 'user@one.com'),
(11, 'Business Club', 'bussiness@daiict.ac.in', '201912120@daiict.ac.in', 'aman.sharma122111@gmail.com');

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
(39, 'SBG Convener', 'Because........That\'s why', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 11, '2020-05-04 12:23:30', 0),
(38, 'Club Convener', 'Because........That\'s why', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 10, '2020-05-04 12:23:04', 0),
(37, 'SBG Convener', 'Why is this event taking so much days ?', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 9, '2020-05-04 12:20:16', 0),
(36, 'Dean Students', 'Why is this event taking so much days ?', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 8, '2020-05-04 12:19:27', 0),
(35, 'SBG Convener', 'hi\n\n\nhoe are you\nI am fine', NULL, '2da23406-eb24-49ae-97bf-47c92c04e59e', 11, '2020-05-01 15:32:55', 0),
(34, 'Dean Students', 'Hegkadsjf adfsg\n g sdzfg\nze gfeivj lzgojgvioidsjf \nasdf aeorejoijv zexsr4gjuz;9esgujerjg\nare fer809u g9wexfoterh ofhesng\narw fij9p4w8ufjzWGju ;aseo9jgresr\n', NULL, '3875586f-45b1-4ab3-84e7-09773d267d73', 8, '2020-05-01 15:13:12', 0),
(33, 'SBG Convener', 'I am fine sir', NULL, '3875586f-45b1-4ab3-84e7-09773d267d73', 11, '2020-05-01 15:08:13', 0),
(32, 'Dean Students', 'How Are you ?', NULL, '3875586f-45b1-4ab3-84e7-09773d267d73', 8, '2020-05-01 15:05:17', 0),
(31, 'Dean Students', 'Hi', NULL, '3875586f-45b1-4ab3-84e7-09773d267d73', 8, '2020-05-01 15:05:09', 0),
(40, 'Dean Students', 'hey  whats going on', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 8, '2020-05-05 13:50:14', 0),
(41, 'SBG Convener', 'Nothing', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 11, '2020-05-05 13:51:12', 0),
(42, 'SBG Convener', 'hey alright', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 9, '2020-05-05 13:51:35', 0),
(43, 'Synapse Committee', 'yes', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 10, '2020-05-05 13:52:13', 0),
(44, 'Synapse Committee', 'cool', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 10, '2020-05-05 13:52:18', 0),
(45, 'Synapse Committee', '', NULL, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 10, '2020-05-05 13:52:38', 0),
(46, 'Sports Committee', 'woooo', NULL, '51ad6c81-2d44-45d8-a098-d712b940a647', 10, '2020-05-05 13:55:33', 0);

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

DROP TABLE IF EXISTS `complaint`;
CREATE TABLE IF NOT EXISTS `complaint` (
  `ComplaintId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) NOT NULL,
  `ComplaintTitle` varchar(100) NOT NULL,
  `ComplaintText` varchar(1000) NOT NULL,
  `Status` int(11) NOT NULL,
  `IsAnonymous` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateTime` datetime NOT NULL,
  PRIMARY KEY (`ComplaintId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`ComplaintId`, `UserName`, `ComplaintTitle`, `ComplaintText`, `Status`, `IsAnonymous`, `DateTime`) VALUES
(11, 'user@one.com', 'AC not working', 'Please karva do', 13, '0', '2020-05-02 15:36:49'),
(12, 'user@one.com', 'Water Cooler not working', 'Please repair ASAP', 13, '1', '2020-05-02 16:32:20'),
(13, 'user@one.com', 'Bas Testing maate', 'sdf', 13, '0', '2020-05-02 16:47:14'),
(14, 'user@one.com', 'Quarantine not gettting finished ', 'Not so Good', 13, '1', '2020-05-02 17:06:41'),
(15, 'aman.sharma122111@gmail.com', 'not a good Event', 'Event was not good as out expectation', 13, '0', '2020-05-04 22:05:07');

-- --------------------------------------------------------

--
-- Table structure for table `complaintcomments`
--

DROP TABLE IF EXISTS `complaintcomments`;
CREATE TABLE IF NOT EXISTS `complaintcomments` (
  `ComplaintId` int(11) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Text` varchar(1000) NOT NULL,
  `DateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complaintcomments`
--

INSERT INTO `complaintcomments` (`ComplaintId`, `UserName`, `Text`, `DateTime`) VALUES
(12, 'user@one.com', 'sfdg', '2020-05-02 16:43:39'),
(12, 'user@one.com', 'sdfg', '2020-05-02 16:43:44'),
(12, 'user@one.com', 'Hey', '2020-05-02 16:44:18'),
(14, 'user@one.com', 'asdfasdf\nasdfasdf\nadsfasdf', '2020-05-02 17:25:33'),
(14, 'user@one.com', 'New Comment', '2020-05-02 17:26:03'),
(15, 'aman.sharma122111@gmail.com', 'hey', '2020-05-04 22:05:38'),
(15, 'aman.sharma122111@gmail.com', 'good', '2020-05-04 22:05:46'),
(15, 'aman.sharma122111@gmail.com', 'yes', '2020-05-04 22:06:00');

-- --------------------------------------------------------

--
-- Table structure for table `complainttags`
--

DROP TABLE IF EXISTS `complainttags`;
CREATE TABLE IF NOT EXISTS `complainttags` (
  `ComplaintId` int(11) NOT NULL,
  `ClubId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complainttags`
--

INSERT INTO `complainttags` (`ComplaintId`, `ClubId`) VALUES
(1, 6),
(2, 1),
(3, 1),
(4, 1),
(4, 6),
(5, 1),
(5, 6),
(6, 6),
(6, 1),
(7, 1),
(8, 6),
(9, 6),
(10, 6),
(11, 6),
(12, 1),
(13, 1),
(14, 1),
(14, 6),
(14, 7),
(15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `complaintvotes`
--

DROP TABLE IF EXISTS `complaintvotes`;
CREATE TABLE IF NOT EXISTS `complaintvotes` (
  `ComplaintId` int(11) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Vote` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
('6b769463-7f46-4d23-9ad1-b74cf3f48a15', 'Synapse 2020', 51, 6, '2020-05-06T06:45:40.000Z', '2020-05-13T06:45:40.000Z', 3),
('51ad6c81-2d44-45d8-a098-d712b940a647', 'Seminar on Sports Activity', 51, 7, '2020-05-07T10:45:00.000Z', '2020-05-06T23:30:00.000Z', 12);

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
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventguest`
--

INSERT INTO `eventguest` (`GuestId`, `GuestName`, `EventId`, `Description`) VALUES
(16, 'Amit Trivedi', '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Amit Trivedi is an Indian film score composer, singer and lyricist. As a contemporary music director, he is well known for his versatility; his work ranges from angry rock, authentic classical, honey-soaked melodies to novel fusion musi'),
(15, 'Malhar Thakar', '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Malhar Thakar is an Indian actor who primarily works in the Gujarati film industry and theatre. After nine years in theatre, he eventually broke into film roles. His debut film as the lead role was Chhello Divas which was commercially successfu'),
(34, 'Satya Nadella', '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Satya Narayana Nadella is an Indian American business executive. He is the chief executive officer of Microsoft, succeeding Steve Ballmer in 2014. '),
(35, 'Sundar Pichai', '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Pichai Sundararajan, also known as Sundar Pichai, is an Indian American business executive, the chief executive officer of Alphabet Inc. and its subsidiary Google LLC. '),
(36, 'Nucleya', '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 'EDM/DJ'),
(37, 'Amit Trivedi', '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 'Singer'),
(38, 'Malhar Thakar', '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 'Actor'),
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
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventsponsers`
--

INSERT INTO `eventsponsers` (`SponserId`, `EventId`, `SponserName`, `SponserLink`, `Description`) VALUES
(11, '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Redbull', 'https://www.redbull.com/', 'Red Bull is an energy drink, the manufacturer owned by the British-Dutch company Unilever and Austrian company Red Bull GmbH. Red Bull has the highest market share of any energy drink in the world, wi'),
(12, '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Realme', 'https://www.realme.com/in/', 'Realme is a Shenzhen-based Chinese smartphone manufacturer. The brand was officially established on May 4, 2018 by Sky Li. Realme also produces a wide range of other products such as headphones, fitne'),
(13, '46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Jio Saavn', 'https://www.jiosaavn.com/', 'JioSaavn is the Indian online music streaming service and a digital distributor of Bollywood, English and other regional Indian music across the world. Since it was founded in 2007 as Saavn, the compa'),
(36, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 'Redbull', 'https://redbull.com', 'Energy Drink'),
(37, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 'Realme', 'https://realme.in', 'Students who has realme devices will get realme tshirt'),
(34, '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Microsoft', 'https://www.microsoft.com/en-in', 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington.'),
(35, '2da23406-eb24-49ae-97bf-47c92c04e59e', 'Coding Blocks', 'https://codingblocks.com/', 'Coding Blocks was founded in 2014 with a mission to create skilled Software Engineers for our country and the world.'),
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
  `Contact` bigint(11) DEFAULT NULL,
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
('bussiness@daiict.ac.in', '123456', 'Business Club', NULL, 4, 0),
('convener_sbg@daiict.ac.in', '123456', 'SBG Convener', 9785963245, 1, 0),
('dean@daiict.ac.in', '123456', 'Dean Students', 9696857485, 2, 0),
('dy_convener_sbg@daiict.ac.in', '123456', 'SBG Dy. Convener', 7485963214, 8, 0),
('mstc@daiict.ac.in', '123456', 'Microsoft Club', 8759612333, 4, 0),
('sbg@daiict.ac.in', '123456', 'SBG', 7896541236, 9, 0),
('secretary_sbg@daiict.ac.in', '123456', 'SBG Secretary', 8596745632, 7, 0),
('sports@daiict.ac.in', '123456', 'Sports Committee', 789654795, 4, 0),
('student@daiict.ac.in', '123456', 'Maulik Jadav', 9685745632, 3, 0),
('synapse@daiict.ac.in', '123456', 'Synapse Committee', 8546698547, 4, 0),
('treasurer_sbg@daiict.ac.in', '123456', 'SBG Treasurer', 8585748596, 6, 0),
('user@one.com', 'user123', 'User One', 0, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `lostfound`
--

DROP TABLE IF EXISTS `lostfound`;
CREATE TABLE IF NOT EXISTS `lostfound` (
  `ItemId` int(11) NOT NULL AUTO_INCREMENT,
  `Description` mediumtext NOT NULL,
  `ItemName` varchar(75) DEFAULT NULL,
  `DateTime` varchar(50) DEFAULT NULL,
  `Image` varchar(50) DEFAULT NULL,
  `UserName` varchar(50) NOT NULL,
  `Place` varchar(75) DEFAULT NULL,
  `TempStatus` tinyint(1) NOT NULL,
  `FinalStatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ItemId`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lostfound`
--

INSERT INTO `lostfound` (`ItemId`, `Description`, `ItemName`, `DateTime`, `Image`, `UserName`, `Place`, `TempStatus`, `FinalStatus`) VALUES
(8, 'Black in colour', 'Watch', 'Wed May 06 2020 02:00:00', 'file.png', '201912120@daiict.ac.in', 'RC', 1, 1);

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
(4, 'Club'),
(6, 'SBGTreasurer'),
(7, 'SBGSecretary'),
(8, 'SBGDyConvener'),
(9, 'SBG');

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
(12, 'RejectedBySBG'),
(13, 'ComplaintAdded'),
(14, 'ComplaintInProcess'),
(15, 'ComplaintResolved');

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
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statuschangelog`
--

INSERT INTO `statuschangelog` (`LogId`, `EventId`, `BeforeStatus`, `AfterStatus`, `DateTime`, `UserName`) VALUES
(74, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 2, 3, 'Mon May 04 2020 12:23:48', 'dean@daiict.ac.in'),
(73, '6b769463-7f46-4d23-9ad1-b74cf3f48a15', 1, 2, 'Mon May 04 2020 12:18:40', 'convener_sbg@daiict.ac.in'),
(75, '51ad6c81-2d44-45d8-a098-d712b940a647', 1, 12, 'Tue May 05 2020 13:56:36', 'convener_sbg@daiict.ac.in');

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
(49, 'maulik9211@gmail.com', 'Prabhunath Sharma'),
(1, 'maulik9211@gmail.com', 'Maulik Jadav'),
(3, 'maulik9211@gmail.com', 'Maulik Jadav'),
(1, 'maulik9211@gmail.com', 'Aman Sharma'),
(50, 'maulik9211@gmail.com', 'Prabhunath Sharma'),
(51, 'maulik9211@gmail.com', 'Prabhu Nath'),
(1, 'maulik9211@gmail.com', 'Prabhunath Sharma');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
