-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th4 05, 2025 lúc 01:44 PM
-- Phiên bản máy phục vụ: 9.1.0
-- Phiên bản PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quiz_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `answer_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_id` int UNSIGNED NOT NULL,
  `answer_text` text NOT NULL,
  `is_correct` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `answers_question_id_foreign` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=416 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `answers`
--

INSERT INTO `answers` (`answer_id`, `question_id`, `answer_text`, `is_correct`, `createdAt`, `updatedAt`) VALUES
(292, 1, '7', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(293, 1, '-7', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(294, 1, '0', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(295, 1, '14', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(296, 2, '3', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(297, 2, '-3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(298, 2, '6', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(299, 2, '0', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(300, 3, 'x ≥ 3', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(301, 3, 'x ≤ 3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(302, 3, 'x > 3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(303, 3, 'x < 3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(304, 4, '4', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(305, 4, '-4', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(306, 4, '7', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(307, 4, '0', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(308, 5, '0', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(309, 5, '3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(310, 5, '-3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(311, 5, '6', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(312, 6, '2 và 3', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(313, 6, '1 và -6', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(314, 6, '-2 và -3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(315, 6, '5 và 6', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(316, 7, 'Tổng và tích của nghiệm', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(317, 7, 'Chỉ tổng nghiệm', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(318, 7, 'Chỉ tích nghiệm', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(319, 7, 'Không liên quan đến nghiệm', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(320, 8, 'Parabol', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(321, 8, 'Đường thẳng', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(322, 8, 'Đường tròn', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(323, 8, 'Hyperbol', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(324, 9, '15x^2 - 4x + 1', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(325, 9, '10x^2 - 2x', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(326, 9, '5x^2 + 2x - 4', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(327, 9, '25x^3 - 6x', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(328, 10, '7', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(329, 10, '3', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(330, 10, '5', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(331, 10, '10', 0, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(332, 11, 'Số chẵn', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(333, 11, 'Số lẻ', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(334, 11, 'Số nguyên tố', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(335, 11, 'Số vô tỉ', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(336, 12, '3x^2 + 2', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(337, 12, 'x^2 + 2x', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(338, 12, '2x + 3', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(339, 12, 'x^3 + 2', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(340, 13, '1 và 3', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(341, 13, '2 và 3', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(342, 13, '-1 và 3', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(343, 13, '4 và 5', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(344, 14, '0', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(345, 14, '1', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(346, 14, '-1', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(347, 14, 'Vô cùng', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(348, 15, '180 độ', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(349, 15, '360 độ', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(350, 15, '90 độ', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(351, 15, '120 độ', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(352, 16, 'Parabol', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(353, 16, 'Đường thẳng', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(354, 16, 'Hyperbol', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(355, 16, 'Hình tròn', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(356, 17, 'πr²', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(357, 17, '2πr', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(358, 17, 'r²', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(359, 17, 'πr', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(360, 18, '30', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(361, 18, '10', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(362, 18, '15', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(363, 18, '25', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(364, 19, 'a² + 2ab + b²', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(365, 19, 'a² - b²', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(366, 19, 'a² + b²', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(367, 19, 'a + b', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(368, 20, '2', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(369, 20, '1', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(370, 20, '10', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(371, 20, '100', 0, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(372, 21, 'Số dương', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(373, 21, 'Số âm', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(374, 21, 'Số 0', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(375, 21, 'Không xác định', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(376, 22, 'cos(x)', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(377, 22, '-cos(x)', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(378, 22, 'sin(x)', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(379, 22, '-sin(x)', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(380, 23, '-3 và 2', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(381, 23, '3 và -2', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(382, 23, '-1 và 6', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(383, 23, '1 và -6', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(384, 24, '1', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(385, 24, '0', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(386, 24, 'Vô cực', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(387, 24, 'Không xác định', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(388, 25, '2πr', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(389, 25, 'πr²', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(390, 25, 'r²', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(391, 25, 'πr', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(392, 26, 'Vô cực', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(393, 26, '0', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(394, 26, '1', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(395, 26, '-1', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(396, 27, 'Phép tịnh tiến', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(397, 27, 'Phép đồng dạng', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(398, 27, 'Phép quay', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(399, 27, 'Phép chiếu', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(400, 28, 'Phép chiếu song song', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(401, 28, 'Phép quay', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(402, 28, 'Phép dời hình', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(403, 28, 'Phép co giãn', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(404, 29, 'e^x', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(405, 29, 'x * e^x', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(406, 29, 'ln(x)', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(407, 29, '1/x', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(408, 30, '4', 1, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(409, 30, '8', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(410, 30, '2', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(411, 30, '-4', 0, '2025-03-31 17:47:57', '2025-03-31 17:47:57'),
(412, 31, 'Canxi (Ca)', 1, '2025-04-02 15:08:44', '2025-04-02 15:08:44'),
(413, 31, 'Oxi (O)', 0, '2025-04-02 15:08:44', '2025-04-02 15:08:44'),
(414, 31, 'Nhôm (Al)', 0, '2025-04-02 15:08:44', '2025-04-02 15:08:44'),
(415, 31, 'Lưu huỳnh (S)', 0, '2025-04-02 15:08:44', '2025-04-02 15:08:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `examquestion`
--

DROP TABLE IF EXISTS `examquestion`;
CREATE TABLE IF NOT EXISTS `examquestion` (
  `exam_id` int UNSIGNED NOT NULL,
  `question_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`question_id`,`exam_id`),
  KEY `examquestion_exam_id_foreign` (`exam_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exams`
--

DROP TABLE IF EXISTS `exams`;
CREATE TABLE IF NOT EXISTS `exams` (
  `exam_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `time` int UNSIGNED NOT NULL DEFAULT '60',
  `created_by` int UNSIGNED NOT NULL,
  `subsubject_id` int UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`exam_id`),
  KEY `exams_created_by_foreign` (`created_by`),
  KEY `exams_subsubject_id_foreign` (`subsubject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `exams`
--

INSERT INTO `exams` (`exam_id`, `title`, `description`, `time`, `created_by`, `subsubject_id`, `createdAt`, `updatedAt`) VALUES
(2, 'Đề thi thử Toán 12', 'Đề thi thử THPT Quốc gia môn Toán', 60, 1, 3, '2025-03-27 00:00:00', '2025-03-27 00:00:00'),
(3, 'Kiểm tra Vật lý 11 - Chương 1', 'Đề kiểm tra 45 phút môn Vật lý lớp 11', 60, 1, 5, '2025-03-27 00:00:00', '2025-03-27 00:00:00'),
(4, 'Đề kiểm tra Vật lý 10 - Chương 1', 'Đề kiểm tra 45 phút môn Vật lý lớp 10', 60, 1, 4, '2025-03-28 00:00:00', '2025-03-28 00:00:00'),
(5, 'Đề thi thử Vật lý 12', 'Đề thi thử THPT Quốc gia môn Vật lý', 60, 1, 6, '2025-03-28 00:00:00', '2025-03-28 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `question_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_id` int UNSIGNED NOT NULL,
  `question_text` text NOT NULL,
  `difficulty` enum('easy','medium','hard') NOT NULL,
  `created_by` int UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `questions_created_by_foreign` (`created_by`),
  KEY `questions_subject_id_foreign` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `questions`
--

INSERT INTO `questions` (`question_id`, `subject_id`, `question_text`, `difficulty`, `created_by`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Giá trị của biểu thức | -7 | là bao nhiêu?', 'easy', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(2, 1, 'Nghiệm của phương trình 2x - 6 = 0 là gì?', 'easy', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(3, 1, 'Tập xác định của hàm số f(x) = sqrt(x - 3) là gì?', 'medium', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(4, 1, 'Hệ số góc của đường thẳng y = 4x - 7 là bao nhiêu?', 'easy', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(5, 1, 'Tìm giá trị nhỏ nhất của hàm số f(x) = x^2 - 6x + 9.', 'hard', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(6, 1, 'Phương trình x^2 - 5x + 6 = 0 có bao nhiêu nghiệm?', 'medium', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(7, 1, 'Định lý Viète cho biết điều gì về nghiệm của phương trình bậc hai?', 'medium', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(8, 1, 'Đồ thị của hàm số y = x^2 có dạng gì?', 'easy', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(9, 1, 'Đạo hàm của hàm số y = 5x^3 - 2x^2 + x - 4 là gì?', 'hard', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(10, 1, 'Giá trị lớn nhất của hàm số f(x) = -x^2 + 5x + 3 trên đoạn [0,4] là bao nhiêu?', 'hard', 1, '2025-03-31 17:44:06', '2025-03-31 17:44:06'),
(11, 1, 'Tích của hai số thực liên tiếp luôn là số gì?', 'easy', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(12, 1, 'Đạo hàm của hàm số y = x^3 + 2x là gì?', 'medium', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(13, 1, 'Phương trình x^2 - 4x + 3 = 0 có nghiệm nào?', 'easy', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(14, 1, 'Giới hạn của dãy số 1/n khi n tiến đến vô cùng là bao nhiêu?', 'medium', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(15, 1, 'Tổng các góc trong của một tam giác bằng bao nhiêu độ?', 'easy', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(16, 1, 'Hàm số y = -x^2 + 4x - 3 có đồ thị là gì?', 'hard', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(17, 1, 'Công thức tính diện tích hình tròn là gì?', 'easy', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(18, 1, 'Số nào chia hết cho cả 2, 3 và 5?', 'medium', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(19, 1, 'Giá trị của biểu thức (a+b)^2 là gì?', 'easy', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(20, 1, 'Logarit của 100 cơ số 10 là bao nhiêu?', 'medium', 1, '2025-03-31 17:46:28', '2025-03-31 17:46:28'),
(21, 1, 'Phép nhân hai số âm cho kết quả gì?', 'easy', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(22, 1, 'Đạo hàm của hàm số y = sin(x) là gì?', 'medium', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(23, 1, 'Phương trình x^2 + x - 6 = 0 có nghiệm nào?', 'easy', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(24, 1, 'Tổng vô hạn của cấp số nhân 1/2, 1/4, 1/8, ... là bao nhiêu?', 'medium', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(25, 1, 'Công thức tính chu vi hình tròn là gì?', 'easy', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(26, 1, 'Giới hạn của hàm số y = 1/x khi x tiến đến 0 từ phía dương là gì?', 'hard', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(27, 1, 'Phép biến đổi nào bảo toàn khoảng cách?', 'easy', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(28, 1, 'Phép chiếu vuông góc là gì?', 'medium', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(29, 1, 'Đạo hàm của y = e^x là gì?', 'easy', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(30, 1, 'Căn bậc hai của 16 là gì?', 'medium', 1, '2025-03-31 17:47:56', '2025-03-31 17:47:56'),
(31, 8, 'Nguyên tử nào sau đây có số proton nhiều nhất?', 'medium', 1, '2025-04-02 15:08:44', '2025-04-02 15:08:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `results`
--

DROP TABLE IF EXISTS `results`;
CREATE TABLE IF NOT EXISTS `results` (
  `result_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `exam_id` int UNSIGNED NOT NULL,
  `score` double NOT NULL,
  `submitted_at` datetime NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `results_exam_id_foreign` (`exam_id`),
  KEY `results_user_id_foreign` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `subject_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `subjects`
--

INSERT INTO `subjects` (`subject_id`, `name`) VALUES
(1, 'Toán'),
(2, 'Vật lý'),
(3, 'Hoá học'),
(5, 'Sinh học'),
(6, 'Lịch sử'),
(7, 'Địa lý'),
(8, 'Tin học'),
(9, 'Ngoại ngữ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subsubjects`
--

DROP TABLE IF EXISTS `subsubjects`;
CREATE TABLE IF NOT EXISTS `subsubjects` (
  `subsubjects_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(255) NOT NULL,
  `subject_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`subsubjects_id`),
  KEY `subsubjects_subject_id_foreign` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `subsubjects`
--

INSERT INTO `subsubjects` (`subsubjects_id`, `subject_name`, `subject_id`) VALUES
(1, 'Toán 10', 1),
(2, 'Toán 11', 1),
(3, 'Toán 12', 1),
(4, 'Vật Lý 10', 2),
(5, 'Vật Lý 11', 2),
(6, 'Vật lý 12', 2),
(8, 'Hoá học 10', 3),
(9, 'Hoá học 11', 3),
(10, 'Hoá học 12', 3),
(11, 'Sinh học 10', 5),
(12, 'Sinh học 11', 5),
(13, 'Sinh học 12', 5),
(14, 'Lịch sử 10', 6),
(15, 'Lịch sử 11', 6),
(16, 'Lịch sử 12', 6),
(17, 'Địa lý 10', 7),
(18, 'Địa lý 11', 7),
(19, 'Địa lý 12', 7),
(20, 'Tin học 10', 8),
(21, 'Tin học 11', 8),
(22, 'Tin học 12', 8),
(23, 'Tiếng anh 10', 9),
(24, 'Tiếng anh 11', 9),
(25, 'Tiếng anh 12', 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','teacher','admin') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `createdAt`, `updatedAt`, `email`) VALUES
(1, 'teacher1', '$2b$10$5flUjHj7OLSOm3G2dcYvIu6c6WMDIPtYWa/HI513Sdu3/JFBbNFgW', 'teacher', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'teacher1@example.com'),
(6, 'khai dep trai', '$2b$10$5flUjHj7OLSOm3G2dcYvIu6c6WMDIPtYWa/HI513Sdu3/JFBbNFgW', 'student', '2025-03-28 04:02:12', '2025-03-28 04:02:28', 'genjisss3103@gmail.com'),
(8, 'khai', '$2b$10$J3rZA14wY27SKTEw6Xg8UOdQjRWKwZtd13Lvr7LqmS5mp6iJiCJVi', 'student', '2025-04-01 11:53:52', '2025-04-02 15:44:00', 'abc@gmail.com');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

--
-- Các ràng buộc cho bảng `examquestion`
--
ALTER TABLE `examquestion`
  ADD CONSTRAINT `examquestion_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  ADD CONSTRAINT `examquestion_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

--
-- Các ràng buộc cho bảng `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `exams_subsubject_id_foreign` FOREIGN KEY (`subsubject_id`) REFERENCES `subsubjects` (`subsubjects_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `questions_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subsubjects` (`subsubjects_id`);

--
-- Các ràng buộc cho bảng `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  ADD CONSTRAINT `results_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `subsubjects`
--
ALTER TABLE `subsubjects`
  ADD CONSTRAINT `subsubjects_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
