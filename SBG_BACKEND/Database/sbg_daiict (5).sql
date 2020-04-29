-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2020 at 06:51 AM
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
('9b3d7a33-8ce9-4d2c-a2d1-756f710a978d', 'Hack Infinity', 2, 1, '2020-04-29T04:46:22.294Z', '2020-04-29T04:46:22.294Z', 1),
('467bbd38-f33e-483d-8ee5-75f8640d5696', 'Synapse 2020', 50, 6, '2020-04-21T04:40:50.000Z', '2020-04-28T04:40:50.000Z', 1);

-- --------------------------------------------------------

--
-- Table structure for table `eventguest`
--

CREATE TABLE `eventguest` (
  `GuestId` int(11) NOT NULL,
  `GuestName` varchar(100) NOT NULL,
  `EventId` varchar(50) NOT NULL,
  `Description` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventguest`
--

INSERT INTO `eventguest` (`GuestId`, `GuestName`, `EventId`, `Description`) VALUES
(12, 'Sumeet Verma', '9b3d7a33-8ce9-4d2c-a2d1-756f710a978d', 'Best ranked coder in India and DA-IICT alumni\n\nhttps://codeforces.com/profile/Sumeet.Varma'),
(11, 'Nucleya', '467bbd38-f33e-483d-8ee5-75f8640d5696', 'Udyan Sagar, better known by his stage name Nucleya, is an Indian electronic music producer.'),
(10, 'Amit Trivedi', '467bbd38-f33e-483d-8ee5-75f8640d5696', 'Amit Trivedi is an Indian film score composer, singer and lyricist. As a contemporary music director, he is well known for his versatility; his work ranges from angry rock, authentic classical, honey-soaked melodies to novel fusion music.');

-- --------------------------------------------------------

--
-- Table structure for table `eventsponsers`
--

CREATE TABLE `eventsponsers` (
  `SponserId` int(11) NOT NULL,
  `EventId` varchar(50) NOT NULL,
  `SponserName` varchar(50) NOT NULL,
  `SponserLink` varchar(100) NOT NULL,
  `Description` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventsponsers`
--

INSERT INTO `eventsponsers` (`SponserId`, `EventId`, `SponserName`, `SponserLink`, `Description`) VALUES
(12, '467bbd38-f33e-483d-8ee5-75f8640d5696', 'Redbool', 'https://www.redbull.com/', 'Red Bull is an energy drink, the manufacturer owned by the British-Dutch company Unilever and Austrian company Red Bull GmbH. Red Bull has the highest market share of any energy drink in the world, wi'),
(13, '9b3d7a33-8ce9-4d2c-a2d1-756f710a978d', 'Coding Ninjas', 'https://www.codingninjas.com/', 'Coding Ninjas is a place that trains passionate people in various technologies. Our core programs are intensive, immersive training that transforms people into outstanding developers. '),
(11, '467bbd38-f33e-483d-8ee5-75f8640d5696', 'Realme', 'https://www.realme.com/in/', 'Realme is a Shenzhen-based Chinese smartphone manufacturer. The brand was officially established on May 4, 2018 by Sky Li. Realme also produces a wide range of other products such as headphones, fitne'),
(14, '9b3d7a33-8ce9-4d2c-a2d1-756f710a978d', 'Microsoft', 'https://www.microsoft.com/en-in', 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer ele');

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
  `BeforeStatus` int(11) NOT NULL,
  `AfterStatus` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `UserName` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(1, 'CEP207', 40, 0, 1),
(2, 'LAB001', 120, 0, 1),
(49, 'Lab003', 70, 1, 0),
(50, 'OAT', 500, 0, 0);

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
(1, 'sharma.aman1298@gmail.com', 'Aman Sharma'),
(3, 'maulik@gmail.com', 'Maulik Jadav'),
(1, 'maulik@gmail.com', 'Maulik Jadav'),
(50, 'rajendra_shah@daiict.ac.in', 'Rajendra Shah'),
(50, 'prabhu_nath@daiict.ac.in', 'Prabhu Nath ');

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
  MODIFY `GuestId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `eventsponsers`
--
ALTER TABLE `eventsponsers`
  MODIFY `SponserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `VenueId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
