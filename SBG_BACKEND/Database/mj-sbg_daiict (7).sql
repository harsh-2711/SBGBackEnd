-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2020 at 10:38 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

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

CREATE TABLE `attachments` (
  `AttachmentId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `MessageId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `club`
--

CREATE TABLE `club` (
  `ClubId` int(11) NOT NULL,
  `ClubName` varchar(100) NOT NULL,
  `ClubEmail` varchar(100) NOT NULL,
  `Convener` varchar(100) DEFAULT NULL,
  `DConvener` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `club`
--

INSERT INTO `club` (`ClubId`, `ClubName`, `ClubEmail`, `Convener`, `DConvener`) VALUES
(1, 'Microsoft Club', 'mstc@daiict.ac.in', 'aman.sharma122111@gmail.com', NULL),
(6, 'Synapse Committee', 'synapse@daiict.ac.in', 'user@one.com', NULL),
(7, 'Sports committee', 'sports@daiict.ac.in', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `communication`
--

CREATE TABLE `communication` (
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

CREATE TABLE `event` (
  `EventId` varchar(50) NOT NULL,
  `EventName` varchar(100) NOT NULL,
  `VenueId` int(11) NOT NULL,
  `ClubId` int(11) NOT NULL,
  `StartDateTime` varchar(50) NOT NULL,
  `EndDateTime` varchar(50) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`EventId`, `EventName`, `VenueId`, `ClubId`, `StartDateTime`, `EndDateTime`, `StatusId`) VALUES
('1676d3e9-e7a4-42e8-b9b8-02a7af4ac3a0', 'Hack Infinity 2.0', 2, 6, '2020-04-29T08:11:04.991Z', '2020-04-29T08:11:04.991Z', 1),
('2da23406-eb24-49ae-97bf-47c92c04e59e', 'Hack Infinity', 50, 1, '2020-04-12T18:30:00.000Z', '2020-04-23T18:30:00.000Z', 1),
('46b5763b-d0a4-4a68-806d-065b9909fc5f', 'Synapse 2020', 51, 6, '2020-04-29T05:27:08.835Z', '2020-04-29T05:27:08.835Z', 1);

-- --------------------------------------------------------

--
-- Table structure for table `eventguest`
--

CREATE TABLE `eventguest` (
  `GuestId` int(11) NOT NULL,
  `GuestName` varchar(500) NOT NULL,
  `EventId` varchar(50) NOT NULL,
  `Description` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `eventsponsers` (
  `SponserId` int(11) NOT NULL,
  `EventId` varchar(50) NOT NULL,
  `SponserName` varchar(50) NOT NULL,
  `SponserLink` varchar(100) NOT NULL,
  `Description` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `UserName` varchar(100) NOT NULL,
  `PassWord` varchar(50) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Contact` bigint(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `IsReset` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`UserName`, `PassWord`, `Name`, `Contact`, `RoleId`, `IsReset`) VALUES
('201912120@daiict.ac.in', 'aman$123', 'Aman', 8320069325, 3, 0),
('aman.sharma122111@gmail.com', 'abc$123', 'Aman Sharma', 8320069325, 2, 0),
('user@one.com', 'user123', 'User One', 0, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(15) NOT NULL
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

CREATE TABLE `status` (
  `StatusId` int(11) NOT NULL,
  `StatusName` varchar(100) NOT NULL
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

CREATE TABLE `statuschangelog` (
  `LogId` int(11) NOT NULL,
  `EventId` int(11) NOT NULL,
  `BeforeStatus` int(11) DEFAULT NULL,
  `AfterStatus` int(11) NOT NULL,
  `DateTime` varchar(75) NOT NULL,
  `UserName` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statuschangelog`
--

INSERT INTO `statuschangelog` (`LogId`, `EventId`, `BeforeStatus`, `AfterStatus`, `DateTime`, `UserName`) VALUES
(1, 1, 1, 2, 'Tue Apr 28 2020 23:05:42', 'aman.sharma122111@gmail.com'),
(2, 1, 2, 3, 'Tue Apr 28 2020 23:11:03', 'aman.sharma122111@gmail.com'),
(3, 1, 2, 4, 'Tue Apr 28 2020 23:15:01', 'aman.sharma122111@gmail.com'),
(4, 1, 6, 7, 'Tue Apr 28 2020 23:38:03', 'aman.sharma122111@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `VenueId` int(11) NOT NULL,
  `VenueName` varchar(50) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `HasAc` tinyint(1) NOT NULL,
  `HasProj` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `venueman` (
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
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`AttachmentId`);

--
-- Indexes for table `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`ClubId`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`EventId`);

--
-- Indexes for table `eventguest`
--
ALTER TABLE `eventguest`
  ADD PRIMARY KEY (`GuestId`);

--
-- Indexes for table `eventsponsers`
--
ALTER TABLE `eventsponsers`
  ADD PRIMARY KEY (`SponserId`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`UserName`),
  ADD KEY `login_ibfk_1` (`RoleId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleId`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`StatusId`);

--
-- Indexes for table `statuschangelog`
--
ALTER TABLE `statuschangelog`
  ADD PRIMARY KEY (`LogId`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`VenueId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `club`
--
ALTER TABLE `club`
  MODIFY `ClubId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `eventguest`
--
ALTER TABLE `eventguest`
  MODIFY `GuestId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `eventsponsers`
--
ALTER TABLE `eventsponsers`
  MODIFY `SponserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `statuschangelog`
--
ALTER TABLE `statuschangelog`
  MODIFY `LogId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `VenueId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

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
