/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : insurancepolicydb

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 07/07/2019 20:59:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_info
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `real_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `role_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_frozen` int(11) DEFAULT NULL,
  `update_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar_src` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_info
-- ----------------------------
INSERT INTO `admin_info` VALUES ('30b13970-0052-11e9-8735-190581b1698c', '保险平台管理员', 'admin', '000000', '000', 0, 'admin', 'admin', '13112345543', '', '2018-12-15 10:14:21.000000', '2019-07-06 15:32:10.000000');

-- ----------------------------
-- Table structure for channel_info
-- ----------------------------
DROP TABLE IF EXISTS `channel_info`;
CREATE TABLE `channel_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `channel_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updated_at` datetime(0) DEFAULT NULL,
  `created_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of channel_info
-- ----------------------------
INSERT INTO `channel_info` VALUES ('8f0a3340-9fb8-11e9-8937-c9d79d4586dc', '渠道1', NULL, '2019-07-06 14:37:43', '2019-07-06 14:37:43');

-- ----------------------------
-- Table structure for client_info
-- ----------------------------
DROP TABLE IF EXISTS `client_info`;
CREATE TABLE `client_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `client_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `telephone` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `created_at` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of client_info
-- ----------------------------
INSERT INTO `client_info` VALUES ('30b13970-0052-11e9-8735-190581b1698c', '武汉', '钟正', 0, '15527188176', '2019-06-07', '2019-06-07 10:27:15', NULL);

-- ----------------------------
-- Table structure for custom_info
-- ----------------------------
DROP TABLE IF EXISTS `custom_info`;
CREATE TABLE `custom_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `custom_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `custom_sex` int(8) DEFAULT NULL,
  `custom_birth` date DEFAULT NULL,
  `custom_tel` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of custom_info
-- ----------------------------
INSERT INTO `custom_info` VALUES ('ca7bb950-9291-11e9-80e2-5385c6f67f03', '打的', 1, '2012-02-22', '1232', '2019-06-19 20:57:27.000000', '2019-06-22 00:02:12.000000', '30b13970-0052-11e9-8735-190581b1698d');
INSERT INTO `custom_info` VALUES ('4f642ae0-942b-11e9-8ecd-7f58a0beba9f', '大东方神大哥', 1, '2019-06-21', '3333', '2019-06-21 21:48:54.000000', '2019-06-21 22:30:32.000000', '30b13970-0052-11e9-8735-190581b1698d');
INSERT INTO `custom_info` VALUES ('c5701790-9f92-11e9-8ec1-1f02ced9d204', '张飞', 1, '2019-07-18', '8176', '2019-07-06 10:07:13.000000', '2019-07-06 10:07:13.000000', '30b13970-0052-11e9-8735-190581b1698d');

-- ----------------------------
-- Table structure for file_info
-- ----------------------------
DROP TABLE IF EXISTS `file_info`;
CREATE TABLE `file_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `file_type` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `mime_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `file_path` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `update_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` datetime(0) DEFAULT NULL,
  `created_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for insurance_company_info
-- ----------------------------
DROP TABLE IF EXISTS `insurance_company_info`;
CREATE TABLE `insurance_company_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `logo_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `company_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '公司名称',
  `hot_line` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '热线电话',
  `mark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `created_at` datetime(0) DEFAULT NULL,
  `updated_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of insurance_company_info
-- ----------------------------
INSERT INTO `insurance_company_info` VALUES ('050421b0-9fb3-11e9-abf9-474882d26286', NULL, '大地保险', '10086', NULL, '2019-07-06 13:58:04', '2019-07-06 13:58:04');
INSERT INTO `insurance_company_info` VALUES ('10b161d0-9fb8-11e9-abf9-474882d26286', NULL, NULL, NULL, NULL, '2019-07-06 14:34:11', '2019-07-06 14:34:11');
INSERT INTO `insurance_company_info` VALUES ('31c7d750-9fb8-11e9-abf9-474882d26286', NULL, NULL, NULL, NULL, '2019-07-06 14:35:06', '2019-07-06 14:35:06');
INSERT INTO `insurance_company_info` VALUES ('4766a960-9fb8-11e9-abf9-474882d26286', NULL, NULL, NULL, NULL, '2019-07-06 14:35:43', '2019-07-06 14:35:43');
INSERT INTO `insurance_company_info` VALUES ('5e3aa4c0-9c02-11e9-aad3-034a37e4f7c6', '', '新华保险0', '10010', '', '2019-07-01 21:15:59', '2019-07-01 21:15:59');
INSERT INTO `insurance_company_info` VALUES ('938c3310-9c01-11e9-aad3-034a37e4f7c6', '', '康泰保险', '10086', '', '2019-07-01 21:10:19', '2019-07-01 21:10:19');
INSERT INTO `insurance_company_info` VALUES ('bb96dc30-9c00-11e9-aad3-034a37e4f7c6', 'b76392c0-9c00-11e9-aad3-034a37e4f7c6', '新华保险', '10010', '', '2019-07-01 21:04:17', '2019-07-01 21:04:17');

-- ----------------------------
-- Table structure for link_info
-- ----------------------------
DROP TABLE IF EXISTS `link_info`;
CREATE TABLE `link_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `point_mall_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customer_consult_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `feedback_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `about_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` datetime(0) DEFAULT NULL,
  `updated_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `client_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户ID',
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '业务员ID',
  `insurance_policy_no` varchar(19) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '保险单号',
  `insurance_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '险种',
  `insurance_company` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '保险公司',
  `insured_time` datetime(0) DEFAULT NULL COMMENT '投保时间',
  `payment_duration` int(11) DEFAULT NULL COMMENT '缴费年限',
  `insured_sum` decimal(13, 2) DEFAULT NULL COMMENT '保额',
  `insurance` decimal(13, 2) DEFAULT NULL COMMENT '保费',
  `mark` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `order_channel` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '订单渠道',
  `policyholder_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '投保人姓名',
  `policyholder_sex` int(2) DEFAULT NULL COMMENT '投保人性别',
  `policyholder_birthday` date DEFAULT NULL COMMENT '投保人生日',
  `policyholder_telephone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '投保人电话',
  `insured_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '被保人姓名',
  `insured_sex` int(2) DEFAULT NULL COMMENT '被保人性别',
  `insured_birthday` date DEFAULT NULL COMMENT '被保人生日',
  `insured_telephone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '被保人电话',
  `beneficiary_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '受益人姓名',
  `created_at` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('1cc58330-967f-11e9-87d6-e5130cf40517', '1', '30b13970-0052-11e9-8735-190581b1698d', '22', '11', '11', '2019-07-01 23:05:02', 1, 3.00, 1.00, '打', '1', '2323', 1, '2019-06-24', '2323', '打的', 1, '2019-06-24', '2333', '131', '2019-07-24 20:53:49', '2019-06-24 21:12:30');
INSERT INTO `order_info` VALUES ('1cc58330-967f-11e9-87d6-e5130cf4051d', '1', '30b13970-0052-11e9-8735-190581b1698d', '11', '11', '11', '2019-01-24 08:00:00', 1, 3.00, 3.33, '打', '1', '2323', 1, '2019-06-24', '2323', '打的', 1, '2019-06-24', '2333', '131', '2019-07-24 20:53:49', '2019-06-24 21:12:30');
INSERT INTO `order_info` VALUES ('1cc58330-967f-11e9-87d6-e5130cf4051e', '1', '30b13970-0052-11e9-8735-190581b1698c', '11', '11', '11', '2018-06-24 08:00:00', 1, 3.00, 3.33, '打', '1', '2323', 1, '2019-06-24', '2323', '打的', 1, '2019-06-24', '2333', '131', '2019-07-24 20:53:49', '2019-06-24 21:12:30');
INSERT INTO `order_info` VALUES ('1cc58330-967f-11e9-87d6-e5130cf4051f', '1', '30b13970-0052-11e9-8735-190581b1698d', '22', '11', '11', '2019-07-01 23:05:02', 1, 3.00, 3.33, '打', '1', '2323', 1, '2019-06-24', '2323', '打的', 1, '2019-06-24', '2333', '131', '2019-06-24 20:53:49', '2019-06-24 21:12:30');

-- ----------------------------
-- Table structure for thumbup_info
-- ----------------------------
DROP TABLE IF EXISTS `thumbup_info`;
CREATE TABLE `thumbup_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` datetime(0) DEFAULT NULL,
  `updated_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `city` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `headimgurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `realname` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `company` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `nickname` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `province` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `telephone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `created_at` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('30b13970-0052-11e9-8735-190581b1698c', '武汉', '中国', '', '钟正', '5e3aa4c0-9c02-11e9-aad3-034a37e4f7c6', NULL, '哈哈', '湖北', 0, '15527188176', '2019-06-07', '2019-07-02 21:31:58', '2019-06-07 10:27:15');
INSERT INTO `user_info` VALUES ('30b13970-0052-11e9-8735-190581b1698d', '武汉', '中国', '', '王玮额外', '5e3aa4c0-9c02-11e9-aad3-034a37e4f7c6', '222222', '哈哈', '湖北', 0, '15527188176', '2019-06-07', '2019-07-02 21:44:58', '2019-07-02 21:44:58');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f0', NULL, NULL, NULL, 'dad1', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-06 08:28:18', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f1', NULL, NULL, NULL, 'dad2', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-06 08:28:21', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f2', NULL, NULL, NULL, 'dad3', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f3', NULL, NULL, NULL, 'dad4', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f4', NULL, NULL, NULL, 'dad5', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f5', NULL, NULL, NULL, 'dad6', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f6', NULL, NULL, NULL, 'dad7', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f7', NULL, NULL, NULL, 'dad8', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07f8', NULL, NULL, NULL, 'dad9', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');
INSERT INTO `user_info` VALUES ('ec166ce0-9bfb-11e9-acc9-d3f12ecb07fb', NULL, NULL, NULL, 'dad', '938c3310-9c01-11e9-aad3-034a37e4f7c6', '333333', NULL, NULL, NULL, '13344555544', NULL, '2019-07-02 21:32:19', '2019-07-02 19:29:48');

SET FOREIGN_KEY_CHECKS = 1;
