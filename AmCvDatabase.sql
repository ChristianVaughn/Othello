-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2019 at 07:16 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--
CREATE Database IF NOT EXISTS demo;

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `gameMode` varchar(50) NOT NULL,
  `gridSize` int(11) NOT NULL,
  `gameDuration` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `profilePicture` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `username`, `gameMode`, `gridSize`, `gameDuration`, `score`, `profilePicture`, `created_at`) VALUES
(11, 'Cvaughn55', 'Hard CPU', 8, 63, 34, 'profilepics/Cvaughn55.png', '2019-12-09 10:13:44'),
(12, 'Cvaughn55', 'Hard CPU', 4, 7, 0, 'profilepics/Cvaughn55.png', '2019-12-09 13:03:16'),
(13, 'Bulldog', 'Hard CPU', 4, 7, 14, 'profilepics/Bulldog.png', '2019-12-09 13:12:42'),
(14, 'Bulldog', '2p Game', 4, 9, 14, 'profilepics/Bulldog.png', '2019-12-09 13:13:02'),
(15, 'Sonic', 'Hard CPU', 4, 6, 3, 'profilepics/Sonic.jpg', '2019-12-09 13:15:48'),
(16, 'Pichu', 'Easy CPU', 4, 8, 9, 'profilepics/Pichu.png', '2019-12-09 13:17:22'),
(17, 'PkFire', 'Hard CPU', 4, 8, 8, 'profilepics/PkFire.jpg', '2019-12-10 08:22:12'),
(18, 'Cvaughn55', 'Easy CPU', 4, 8, 3, 'profilepics/Cvaughn55.png', '2019-12-10 09:31:57'),
(19, 'Cvaughn55', 'Hard CPU', 4, 6, 3, 'profilepics/Cvaughn55.png', '2019-12-10 09:32:47'),
(20, 'Cvaughn55', '2p Game', 4, 18, 6, 'profilepics/Cvaughn55.png', '2019-12-10 09:33:40'),
(21, 'Cvaughn55', '2p Game', 4, 17, 7, 'profilepics/Cvaughn55.png', '2019-12-10 09:34:06'),
(22, 'Cvaughn55', '2p Game', 4, 11, 8, 'profilepics/Cvaughn55.png', '2019-12-10 09:34:25'),
(23, 'Cvaughn55', '2p Game', 4, 11, 8, 'profilepics/Cvaughn55.png', '2019-12-10 09:34:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `age` varchar(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `location` varchar(50) NOT NULL,
  `pfp` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `age`, `gender`, `location`, `pfp`, `created_at`) VALUES
(1, 'Cvaughn55', '$2y$10$vObaaruQn/cotwIGT0zEvu4n90QgWdLcKgO/bXJKR2h6.OGW5niiy', 'Christian', 'Vaughn', '21', 'Male', 'Mars', 'Cvaughn55.png', '2019-12-08 20:00:48'),
(2, 'UndoWzrd', '$2y$10$JI9qDae/ZrsVJ0gGiJTmr.E2q7Lg2wLD.3phjIyCCSKQMRjCoDD46', '123123', '123123', '12', '123', '12312', 'UndoWzrd.jpg', '2019-12-08 20:03:45'),
(3, 'Bulldog', '$2y$10$AMi8d79BdsPAj6v3YGfIouXgLgKbOTvZbK5ML1BHLGAESHgi08NJC', 'victor', 'E', '12', 'Male', 'USA', 'Bulldog.png', '2019-12-09 13:12:23'),
(4, 'Sonic', '$2y$10$1mTiQElFYg10ARAraF9wVevCpNdTE1pwaSa5XNyQIlB.mFsPg2/iq', '123123', '123123', '12', 'Male', 'USA', 'Sonic.jpg', '2019-12-09 13:15:26'),
(5, 'Pichu', '$2y$10$26a.WIG..cEdPtnH4dJTmuXTJSgQPTt2Ua69KAW8MkUUVv9ojdhUO', '123123', '123123', '12', 'MAle', 'USA', 'Pichu.png', '2019-12-09 13:17:03'),
(6, 'PkFire', '$2y$10$jeHOv0LLLKKWb3yxWk60/OnruKifMoVRwYGAMflpAR2r3ujPQ4rpa', 'Billy', 'Bobbington', '12', 'Male', 'USA', 'PkFire.jpg', '2019-12-10 08:20:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
