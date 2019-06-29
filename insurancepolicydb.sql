/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : insurancepolicydb

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-06-29 23:19:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_info
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `real_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_pwd` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_frozen` int(11) DEFAULT NULL,
  `update_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar_src` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin_info
-- ----------------------------
INSERT INTO `admin_info` VALUES ('30b13970-0052-11e9-8735-190581b1698c', 'wujie admin', 'admin', '000000', '000', '0', 'admin', 'admin', '13112345543', '5b6ea240-6c88-11e9-98f2-9f79f029079a', '2018-12-15 10:14:21.000000', '2019-05-02 11:14:13.000000');

-- ----------------------------
-- Table structure for client_info
-- ----------------------------
DROP TABLE IF EXISTS `client_info`;
CREATE TABLE `client_info` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `client_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `telephone` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of client_info
-- ----------------------------
INSERT INTO `client_info` VALUES ('30b13970-0052-11e9-8735-190581b1698c', '武汉', '钟正', '0', '15527188176', '2019-06-07', '2019-06-07 10:27:15', null);

-- ----------------------------
-- Table structure for custom_info
-- ----------------------------
DROP TABLE IF EXISTS `custom_info`;
CREATE TABLE `custom_info` (
  `id` varchar(255) NOT NULL,
  `custom_name` varchar(255) DEFAULT NULL,
  `custom_sex` int(8) DEFAULT NULL,
  `custom_birth` date DEFAULT NULL,
  `custom_tel` varchar(11) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of custom_info
-- ----------------------------
INSERT INTO `custom_info` VALUES ('ca7bb950-9291-11e9-80e2-5385c6f67f03', '打的', '1', '2012-02-22', '1232', '2019-06-19 20:57:27.000000', '2019-06-22 00:02:12.000000', '1');
INSERT INTO `custom_info` VALUES ('4f642ae0-942b-11e9-8ecd-7f58a0beba9f', '大东方神大哥', '1', '2019-06-21', '3333', '2019-06-21 21:48:54.000000', '2019-06-21 22:30:32.000000', '1');

-- ----------------------------
-- Table structure for file_info
-- ----------------------------
DROP TABLE IF EXISTS `file_info`;
CREATE TABLE `file_info` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `file_type` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mime_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `file_path` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `update_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of file_info
-- ----------------------------

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `id` varchar(255) NOT NULL,
  `client_id` varchar(255) NOT NULL COMMENT '客户ID',
  `user_id` varchar(255) NOT NULL COMMENT '业务员ID',
  `insurance_policy_no` varchar(19) DEFAULT NULL COMMENT '保险单号',
  `insurance_name` varchar(64) DEFAULT NULL COMMENT '险种',
  `insurance_company` varchar(255) DEFAULT NULL COMMENT '保险公司',
  `insured_time` datetime DEFAULT NULL COMMENT '投保时间',
  `payment_duration` int(11) DEFAULT NULL COMMENT '缴费年限',
  `insured_sum` decimal(13,2) DEFAULT NULL COMMENT '保额',
  `insurance` decimal(13,2) DEFAULT NULL COMMENT '保费',
  `mark` varchar(1000) DEFAULT NULL COMMENT '备注',
  `order_channel` varchar(64) DEFAULT NULL COMMENT '订单渠道',
  `policyholder_name` varchar(64) DEFAULT NULL COMMENT '投保人姓名',
  `policyholder_sex` int(2) DEFAULT NULL COMMENT '投保人性别',
  `policyholder_birthday` date DEFAULT NULL COMMENT '投保人生日',
  `policyholder_telephone` varchar(11) DEFAULT NULL COMMENT '投保人电话',
  `insured_name` varchar(64) DEFAULT NULL COMMENT '被保人姓名',
  `insured_sex` int(2) DEFAULT NULL COMMENT '被保人性别',
  `insured_birthday` date DEFAULT NULL COMMENT '被保人生日',
  `insured_telephone` varchar(11) DEFAULT NULL COMMENT '被保人电话',
  `beneficiary_name` varchar(64) DEFAULT NULL COMMENT '受益人姓名',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('1cc58330-967f-11e9-87d6-e5130cf4051d', '1', '30b13970-0052-11e9-8735-190581b1698d', '11', '11', '11', '2019-01-24 08:00:00', '1', '3.00', '3.33', '打', '1', '2323', '1', '2019-06-24', '2323', '打的', '1', '2019-06-24', '2333', '131', '2019-06-24 20:53:49', '2019-06-24 21:12:30');
INSERT INTO `order_info` VALUES ('1cc58330-967f-11e9-87d6-e5130cf4051e', '1', '30b13970-0052-11e9-8735-190581b1698d', '11', '11', '11', '2018-06-24 08:00:00', '1', '3.00', '3.33', '打', '1', '2323', '1', '2019-06-24', '2323', '打的', '1', '2019-06-24', '2333', '131', '2019-06-24 20:53:49', '2019-06-24 21:12:30');
INSERT INTO `order_info` VALUES ('1cc58330-967f-11e9-87d6-e5130cf4051f', '1', '30b13970-0052-11e9-8735-190581b1698d', '22', '11', '11', '2019-06-24 08:00:00', '1', '3.00', '3.33', '打', '1', '2323', '1', '2019-06-24', '2323', '打的', '1', '2019-06-24', '2333', '131', '2019-06-24 20:53:49', '2019-06-24 21:12:30');

-- ----------------------------
-- Table structure for thumbup_info
-- ----------------------------
DROP TABLE IF EXISTS `thumbup_info`;
CREATE TABLE `thumbup_info` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of thumbup_info
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `headimgurl` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `realname` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `telephone` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `company` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('30b13970-0052-11e9-8735-190581b1698c', '武汉', '中国', '', '钟正', null, '哈哈', '湖北', '0', '15527188176', '2019-06-07', '2019-06-28 21:29:16', '2019-06-07 10:27:15', '中国人保');
INSERT INTO `user_info` VALUES ('30b13970-0052-11e9-8735-190581b1698d', '武汉', '中国', '', '王玮额外', '111111', '哈哈', '湖北', '0', '15527188176', '2019-06-07', '2019-06-29 22:22:55', '2019-06-29 22:22:55', '中国人保');
