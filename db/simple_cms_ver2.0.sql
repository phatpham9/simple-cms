-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2015 at 12:59 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `simple_cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
`id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `slug` varchar(256) NOT NULL,
  `description` text,
  `parent` varchar(256) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `description`, `parent`, `isDeleted`, `created`, `updated`) VALUES
(1, '#dwd', '', '', '', 0, '2015-12-21 17:00:00', '0000-00-00 00:00:00'),
(2, '#aaa', '', '', '', 0, '2015-12-21 17:00:00', '0000-00-00 00:00:00'),
(3, '234234234234', '', NULL, NULL, 1, '2015-12-24 20:47:28', '2015-12-24 20:48:15'),
(4, '22323232323', '', NULL, NULL, 1, '2015-12-24 20:48:23', '2015-12-24 20:48:30'),
(5, '#aaawwww', '', NULL, NULL, 0, '2015-12-24 20:56:05', '2015-12-24 20:56:05'),
(6, '#aaaa', '', NULL, NULL, 1, '2015-12-24 20:56:33', '2015-12-24 20:56:40'),
(7, 'oke', '', NULL, NULL, 0, '2015-12-24 20:56:47', '2015-12-24 20:56:47'),
(8, 'conde', '', NULL, NULL, 0, '2015-12-24 20:56:56', '2015-12-24 20:56:56'),
(9, 'fuck', '', NULL, NULL, 0, '2015-12-24 20:57:03', '2015-12-24 20:57:03'),
(10, 'fuck adadawd', '', NULL, NULL, 0, '2015-12-24 21:25:03', '2015-12-24 21:25:03'),
(11, 'fkcu awdaw awdawd', '', NULL, NULL, 0, '2015-12-24 21:27:16', '2015-12-24 21:27:16'),
(12, 'adawd awd awdawd', '', NULL, NULL, 0, '2015-12-24 21:27:57', '2015-12-24 21:27:57'),
(13, '232323 2323232 2323223232232 2323', '232323-2323232-2323223232232-2323', NULL, NULL, 0, '2015-12-24 21:30:36', '2015-12-24 21:32:18'),
(14, 'awdaw awdawd awdaw', '', NULL, NULL, 1, '2015-12-24 21:33:19', '2015-12-24 21:36:30'),
(15, '4342342 234234 23423423423', '4342342-234234-23423423423', NULL, NULL, 1, '2015-12-24 21:35:59', '2015-12-24 21:36:28');

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) COLLATE utf8_bin NOT NULL DEFAULT '0',
  `ip_address` varchar(16) COLLATE utf8_bin NOT NULL DEFAULT '0',
  `user_agent` varchar(150) COLLATE utf8_bin NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE IF NOT EXISTS `login_attempts` (
`id` int(11) NOT NULL,
  `ip_address` varchar(40) COLLATE utf8_bin NOT NULL,
  `login` varchar(50) COLLATE utf8_bin NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `login_attempts`
--

INSERT INTO `login_attempts` (`id`, `ip_address`, `login`, `time`) VALUES
(1, '::1', 'chau_professor', '2015-12-20 03:04:21');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
`id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `items` int(11) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
`id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `slug` varchar(256) NOT NULL,
  `description` text,
  `content` text,
  `isStaticPage` tinyint(1) DEFAULT '0',
  `author` int(11) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT '0',
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `slug`, `description`, `content`, `isStaticPage`, `author`, `isPublished`, `date`, `isDeleted`, `created`, `updated`) VALUES
(1, 'demo demo', 'demo-demo', '', '', 0, 0, 0, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', '2015-12-22 22:17:08'),
(2, 'awdawdawd wadawdawd', 'awdawdawd-wadawdawd', NULL, '<p>awdawdawdawd</p>', 0, NULL, 1, '2015-12-22 01:57:22', 1, '2015-12-22 07:57:34', '2015-12-22 22:17:35'),
(3, 'this is demo', 'this-is-demo', NULL, '<pre><h2 [removed]="color: rgb(51, 51, 51);background-color: rgb(255, 255, 255);">Before moving on it should be noted that the rule setting function can be passed an array if you prefer to set all your rules in one action. If you use this approach you must name your array keys as indicated:</p>&lt;!--EndFragment--&gt;<br/><br/></pre>', 0, NULL, 1, '2015-12-22 02:20:48', 0, '2015-12-22 08:30:40', '2015-12-24 07:29:52'),
(4, 'this is a demo', 'this-is-a-demo', NULL, '<h5><u><br/><br/>&lt;!--StartFragment--&gt;</u></h5><h2 [removed]="color: rgb(51, 51, 51);background-color: rgb(255, 255, 255);"><u>Before moving on it should be noted that the rule setting function can be passed an array if you prefer to set all your rules in one action. If you use this approach you must name your array keys as indicated:</u></p>&lt;!--EndFragment--&gt;<p><u><br/></u></p><p><br/></p>', 1, NULL, 1, '2015-12-22 02:31:29', 0, '2015-12-22 08:31:59', '2015-12-22 08:31:59'),
(5, 'this is a demo 222', 'this-is-a-demo-222wdawd', NULL, '<p>awdawdawdawd</p>', 0, NULL, 1, '2015-12-22 02:32:54', 0, '2015-12-22 08:33:40', '2015-12-24 07:32:14'),
(6, 'this awdaw awdawd', 'this-awdaw-awdawd', NULL, '<p>awdawdawdawdawdawdawd</p>', 0, NULL, 1, '2015-12-22 02:34:17', 1, '2015-12-22 08:34:31', '2015-12-22 22:17:53'),
(7, 'awdawdaw awdawdawd', 'awdawdaw-awdawdawd', NULL, '<p>awdawdawdadawd</p>', 0, NULL, 1, '2015-12-22 02:35:53', 1, '2015-12-22 08:35:58', '2015-12-22 22:22:50'),
(8, 'awdaw awdawd awdawdawd awdawd awdawd', 'awdaw-awdawd-awdawdawd-awdawd-awdawd', NULL, '<p>awdawdawdawdawdawd awdawdawd awdwad awdawd wdawd awdawd awdawd awdawd </p>', 1, NULL, 1, '2015-12-22 02:50:31', 1, '2015-12-22 08:50:46', '2015-12-22 09:33:17'),
(9, 'awdawdawd adawdawdawd', 'awdawdawd-adawdawdawd', NULL, '<p>awdawdawdawdawdawd awdawdawdawd awdawdawawd ădawdawd</p>', 0, NULL, 1, '2015-12-23 04:21:59', 1, '2015-12-22 22:22:31', '2015-12-22 22:22:45'),
(10, 'awdawd ădawdawd', 'awdawd-dawdawd', NULL, '<p>ădawdawdawdawd</p>', 0, NULL, 1, '2015-12-23 04:57:34', 0, '2015-12-22 22:58:34', '2015-12-22 22:58:34'),
(11, 'ădawdawădawdawdawd', 'dawdaw-dawdawdawd', NULL, '<p>ădawdawd</p>', 0, NULL, 1, '2015-12-23 04:59:00', 0, '2015-12-22 22:59:07', '2015-12-22 22:59:07'),
(12, 'awdawdaw ădawdawd', 'awdawdaw-dawdawd', 'ădawdawdaw', '<p>ădawdawdawdawdawdawd</p>', 0, NULL, 1, '2015-12-23 05:01:12', 0, '2015-12-22 23:01:23', '2015-12-22 23:01:23'),
(13, '12312312 123123123', '12312312-123123123', NULL, '<p>123123</p>', 0, NULL, 1, '2015-12-22 20:42:00', 0, '2015-12-23 02:42:36', '2015-12-23 02:42:36'),
(14, '231231 12312312 123123', '231231-12312312-123123', NULL, '<p>123123123</p>', 0, NULL, 1, '2015-12-22 20:55:23', 0, '2015-12-23 02:56:19', '2015-12-23 02:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE IF NOT EXISTS `setting` (
  `id` varchar(40) NOT NULL,
  `value` text NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `value`, `updated`, `created`) VALUES
('general', '{"siteName":"Phat Pham 123121213232323","title":"Geek Blog - Phat Pham","homepage":{"heading":"Geek Blog","subheading":"Fullstack Web Development"},"meta":{"type":"website","url":"http://phatpham.com","description":"A fullstack developer based in Saigon, Vietnam, who has passion for web and mobile development.","author":"Phat Pham <me@phatpham.com>","keywords":"web, mobile, fullstack, developer, geek, blog, phat pham"},"social":{"github":"https://github.com/phatpham9","linkedin":"https://linkedin.com/in/phatpham9","facebook":"https://facebook.com/profile.php?id=100000512194320","instagram":"https://instagram.com/phatpham9"}}', '2015-12-23 17:51:49', '0000-00-00 00:00:00'),
('navigation', '[{"type":"page","url":"about-me","text":"About me","$$hashKey":"006"},{"type":"page","url":"tech-stacks","text":"Stacks","$$hashKey":"007"},{"type":"page","url":"projects","text":"Projects","$$hashKey":"008"},{"type":"page","url":"contact","text":"Contact","$$hashKey":"009"},{"type":"url","url":"demo","text":"abc","$$hashKey":"00A"},{"type":"url","url":"123123","text":"123123","$$hashKey":"00H"},{"type":"url","url":"12312","text":"3123123","$$hashKey":"00J"}]', '2015-12-23 04:01:07', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `roles` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT '1',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `ban_reason` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `isEnabled` tinyint(1) NOT NULL,
  `new_password_key` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `new_password_requested` datetime DEFAULT NULL,
  `new_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `new_email_key` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `last_ip` varchar(40) COLLATE utf8_bin NOT NULL,
  `last_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `roles`, `email`, `activated`, `banned`, `ban_reason`, `isDeleted`, `isEnabled`, `new_password_key`, `new_password_requested`, `new_email`, `new_email_key`, `last_ip`, `last_login`, `created`, `modified`) VALUES
(1, 'planet001', '$2a$08$32YPv7RAl5w//xg/6ElHC.nSpS/IqQtEwRiFcDHelCIHwoRocZ1s2', '', 'khanghuyh92@gmail.com6666666', 1, 0, NULL, 1, 1, NULL, NULL, NULL, NULL, '::1', '2015-12-24 06:03:28', '2015-12-19 18:52:24', '2015-12-24 01:12:26'),
(2, 'planet002', '$2a$08$LYy5jH8tOt0Ze0TybB1q7OnhMSrStesoGAmMVkvN1P3CauvAgqmia', '', 'planet002@gmail.com', 0, 0, NULL, 0, 0, NULL, NULL, NULL, '16cd7929c87e5d7b6c91a58efb0ad0f1', '::1', '0000-00-00 00:00:00', '2015-12-21 05:54:14', '2015-12-24 03:40:43'),
(3, 'planet003', '$2a$08$fXrNNkDlVukt67Asw9v0Tec71mCwD/XidUsgq8cXPpQseey.DNAbC', '', 'asdqwklej@gmail.com', 0, 0, NULL, 0, 0, NULL, NULL, NULL, 'b692cac6b734e30b9e18730ce4f6b88f', '::1', '0000-00-00 00:00:00', '2015-12-21 05:58:53', '2015-12-24 03:40:40'),
(4, 'planet004', '$2a$08$cK1pH634pBzKt1WzTosQhexHpfXC4SJ5o8tZ2FnjgEYISHwlISGNe', '', 'planet003@gmail.com', 0, 1, NULL, 1, 0, NULL, NULL, NULL, '13acc57579aba716ceee60fcf9fba7a7', '::1', '0000-00-00 00:00:00', '2015-12-21 06:01:02', '2015-12-23 01:58:45'),
(5, '', '$2a$08$utCdjH3EPhUzZ8xU0qzJ4uAXEpOmuH8kY5fwSnzPKaWYMUB7M/lhK', '', 'chau.duong1192@gmail.com', 1, 0, NULL, 0, 0, NULL, NULL, NULL, NULL, '::1', '2015-12-25 03:35:03', '2015-12-23 09:37:36', '2015-12-25 02:35:03'),
(6, '', '$2a$08$hpDbDWQAmenkE1CFkYWM9uW/I.4d3kniAOkIh1yeFPJpaHvwP5Jt.', '', 'chauduong1192@gmail.com', 1, 0, NULL, 0, 0, NULL, NULL, NULL, NULL, '::1', '2015-12-24 14:10:32', '2015-12-23 09:38:29', '2015-12-24 13:10:32'),
(7, '', '$2a$08$BoLzxnfirpzpGF12IAXx.e428WnU3/43NnYClcs5X0Z.c/H8wgnwm', '', 'awdawdaw@awdawd.com', 1, 0, NULL, 0, 0, NULL, NULL, NULL, NULL, '::1', '0000-00-00 00:00:00', '2015-12-23 09:41:50', '2015-12-23 08:41:50'),
(8, '', '$2a$08$d0Rl.fFQIZPyjlrnIKF/4u4EQCwjT6d9i98/X.XyPD2qH6ZsG/5B6', '', '232323232@awd.com', 1, 0, NULL, 0, 0, NULL, NULL, NULL, NULL, '::1', '0000-00-00 00:00:00', '2015-12-23 09:45:45', '2015-12-23 08:45:45'),
(9, '', '$2a$08$s5YE7wzfv/SCkoByp3H4DuB3IUnx.74oX..C1kyKMqaf2HrjgAgFS', '', 'awadawd@adw.com', 1, 0, NULL, 1, 0, NULL, NULL, NULL, NULL, '::1', '0000-00-00 00:00:00', '2015-12-23 09:46:47', '2015-12-23 10:50:26'),
(10, '', '$2a$08$5IdRPcVlpYdgSwXEe6Aw/uvZR8w3kgRzf1U0Kh0lKiErSK8B2QJoa', '', 'awdawdawd@awdawdaw.com', 1, 0, NULL, 1, 0, NULL, NULL, NULL, NULL, '::1', '0000-00-00 00:00:00', '2015-12-23 10:01:40', '2015-12-23 10:50:24'),
(11, '', '$2a$08$y8W07m4DeoYqyiz7iRLAgeU6Ci36oJq52cIudJtK3dzEJ4advDDKa', '', '3434343@awdawdawd.com', 1, 0, NULL, 1, 0, NULL, NULL, NULL, NULL, '::1', '0000-00-00 00:00:00', '2015-12-23 10:05:16', '2015-12-23 10:50:21'),
(12, '', '$2a$08$hVWIFGpnDczo4.lLn85mdOL0rBMg8OhPuUIlALsDT/7OV0icEw8xe', '', 'awdawdaw@awdawdawdawdaw.com', 1, 0, NULL, 1, 1, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '2015-12-23 12:25:49', '2015-12-23 10:50:18'),
(13, '', '$2a$08$Rm/DH6c6X2BWvwg86psuLutJR0xNojXJe7FWZao77BuDt8xDC3qUm', '', 'awdawdawd@awdawd.com', 1, 0, NULL, 1, 1, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '2015-12-23 12:35:35', '2015-12-23 05:38:49'),
(14, '', '$2a$08$P3yy1t4t587F4DftYSuj/OqulFEpVKF9dib300kKicY6vsZ4r8S1u', '', 'awdawdaw@awdawdawdawdawd.comawdawdawd', 1, 0, NULL, 1, 1, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '2015-12-23 12:37:31', '2015-12-23 05:38:46'),
(16, '', '$2a$08$VRmUo6V1yCM/Ce8XY/p0MufxP.nUJO1BLYemuZANrzwYXrBkuH7/6', '', 'awdawdw@awdawdawd.com', 1, 0, NULL, 1, 1, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '2015-12-23 18:07:39', '2015-12-24 01:12:31'),
(17, '', '$2a$08$r2kTnbx1W8JqAekHLEPbLeC31hWhX05c2LmsBIyR7dEZdp16eWtcO', '', 'awdawdaw@awdawdaw.com', 1, 0, NULL, 1, 1, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '2015-12-23 18:11:27', '2015-12-24 01:10:55');

-- --------------------------------------------------------

--
-- Table structure for table `user_autologin`
--

CREATE TABLE IF NOT EXISTS `user_autologin` (
  `key_id` char(32) COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `user_agent` varchar(150) COLLATE utf8_bin NOT NULL,
  `last_ip` varchar(40) COLLATE utf8_bin NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE IF NOT EXISTS `user_profiles` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `country` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `website` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `user_id`, `country`, `website`) VALUES
(1, 5, NULL, NULL),
(2, 6, NULL, NULL),
(3, 7, NULL, NULL),
(4, 8, NULL, NULL),
(5, 9, NULL, NULL),
(6, 10, NULL, NULL),
(7, 11, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
 ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_autologin`
--
ALTER TABLE `user_autologin`
 ADD PRIMARY KEY (`key_id`,`user_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
