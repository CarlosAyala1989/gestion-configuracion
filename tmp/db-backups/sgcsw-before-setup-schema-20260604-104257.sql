-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: zephyr.proxy.rlwy.net    Database: sgcsw
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acceptance_records`
--

DROP TABLE IF EXISTS `acceptance_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acceptance_records` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uatTestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `documentPath` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sha256Hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `acceptance_records_uatTestId_key` (`uatTestId`),
  KEY `acceptance_records_changeRequestId_fkey` (`changeRequestId`),
  KEY `acceptance_records_signedById_fkey` (`signedById`),
  CONSTRAINT `acceptance_records_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `acceptance_records_signedById_fkey` FOREIGN KEY (`signedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `acceptance_records_uatTestId_fkey` FOREIGN KEY (`uatTestId`) REFERENCES `uat_tests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acceptance_records`
--

LOCK TABLES `acceptance_records` WRITE;
/*!40000 ALTER TABLE `acceptance_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `acceptance_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ownerType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ownerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mimeType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `storagePath` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sha256Hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','ARCHIVED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `uploadedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `attachments_ownerType_ownerId_idx` (`ownerType`,`ownerId`),
  KEY `attachments_projectId_fkey` (`projectId`),
  KEY `attachments_uploadedById_fkey` (`uploadedById`),
  CONSTRAINT `attachments_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `attachments_uploadedById_fkey` FOREIGN KEY (`uploadedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `module` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `previousDetail` text COLLATE utf8mb4_unicode_ci,
  `newDetail` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `audit_logs_module_action_idx` (`module`,`action`),
  KEY `audit_logs_userId_fkey` (`userId`),
  CONSTRAINT `audit_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baseline_items`
--

DROP TABLE IF EXISTS `baseline_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baseline_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `baselineId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemVersionId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `versionLabel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `baseline_items_baselineId_itemId_key` (`baselineId`,`itemId`),
  KEY `baseline_items_itemId_fkey` (`itemId`),
  KEY `baseline_items_itemVersionId_fkey` (`itemVersionId`),
  CONSTRAINT `baseline_items_baselineId_fkey` FOREIGN KEY (`baselineId`) REFERENCES `baselines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `baseline_items_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `baseline_items_itemVersionId_fkey` FOREIGN KEY (`itemVersionId`) REFERENCES `configuration_item_versions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baseline_items`
--

LOCK TABLES `baseline_items` WRITE;
/*!40000 ALTER TABLE `baseline_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `baseline_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baselines`
--

DROP TABLE IF EXISTS `baselines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baselines` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `milestone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('DRAFT','FROZEN','ARCHIVED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `frozenAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `baselines_code_key` (`code`),
  KEY `baselines_projectId_fkey` (`projectId`),
  KEY `baselines_createdById_fkey` (`createdById`),
  CONSTRAINT `baselines_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `baselines_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baselines`
--

LOCK TABLES `baselines` WRITE;
/*!40000 ALTER TABLE `baselines` DISABLE KEYS */;
/*!40000 ALTER TABLE `baselines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ccb_resolutions`
--

DROP TABLE IF EXISTS `ccb_resolutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ccb_resolutions` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `decision` enum('PENDING','APPROVED','REJECTED','POSTPONED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `resolution` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ccb_resolutions_reviewId_key` (`reviewId`),
  KEY `ccb_resolutions_issuedById_fkey` (`issuedById`),
  CONSTRAINT `ccb_resolutions_issuedById_fkey` FOREIGN KEY (`issuedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ccb_resolutions_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `ccb_reviews` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ccb_resolutions`
--

LOCK TABLES `ccb_resolutions` WRITE;
/*!40000 ALTER TABLE `ccb_resolutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `ccb_resolutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ccb_reviews`
--

DROP TABLE IF EXISTS `ccb_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ccb_reviews` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED','POSTPONED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `summary` text COLLATE utf8mb4_unicode_ci,
  `scheduledAt` datetime(3) DEFAULT NULL,
  `reviewedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ccb_reviews_changeRequestId_fkey` (`changeRequestId`),
  CONSTRAINT `ccb_reviews_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ccb_reviews`
--

LOCK TABLES `ccb_reviews` WRITE;
/*!40000 ALTER TABLE `ccb_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `ccb_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ccb_votes`
--

DROP TABLE IF EXISTS `ccb_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ccb_votes` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voterId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `decision` enum('PENDING','APPROVED','REJECTED','POSTPONED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ccb_votes_reviewId_voterId_key` (`reviewId`,`voterId`),
  KEY `ccb_votes_voterId_fkey` (`voterId`),
  CONSTRAINT `ccb_votes_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `ccb_reviews` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ccb_votes_voterId_fkey` FOREIGN KEY (`voterId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ccb_votes`
--

LOCK TABLES `ccb_votes` WRITE;
/*!40000 ALTER TABLE `ccb_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ccb_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_order_assignments`
--

DROP TABLE IF EXISTS `change_order_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_order_assignments` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleInOrder` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hoursAssigned` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `change_order_assignments_changeOrderId_userId_key` (`changeOrderId`,`userId`),
  KEY `change_order_assignments_userId_fkey` (`userId`),
  CONSTRAINT `change_order_assignments_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `change_order_assignments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_order_assignments`
--

LOCK TABLES `change_order_assignments` WRITE;
/*!40000 ALTER TABLE `change_order_assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `change_order_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_orders`
--

DROP TABLE IF EXISTS `change_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_orders` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `developerId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priority` enum('LOW','MEDIUM','HIGH','CRITICAL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `dueDate` datetime(3) DEFAULT NULL,
  `estimatedHours` int DEFAULT NULL,
  `peopleResources` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `environment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ASSIGNED','IMPLEMENTING','UNIT_TESTING','READY_FOR_QA','QA_FAILED','READY_FOR_UAT','UAT_FAILED','READY_FOR_INTEGRATION','INTEGRATED','COMPLETED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ASSIGNED',
  `gitBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gitCommit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gitPushRef` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `integrationBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `integrationCommit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `change_orders_code_key` (`code`),
  UNIQUE KEY `change_orders_changeRequestId_key` (`changeRequestId`),
  KEY `change_orders_projectId_fkey` (`projectId`),
  KEY `change_orders_developerId_fkey` (`developerId`),
  CONSTRAINT `change_orders_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `change_orders_developerId_fkey` FOREIGN KEY (`developerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `change_orders_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_orders`
--

LOCK TABLES `change_orders` WRITE;
/*!40000 ALTER TABLE `change_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `change_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_request_items`
--

DROP TABLE IF EXISTS `change_request_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_request_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `relationNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `change_request_items_changeRequestId_itemId_key` (`changeRequestId`,`itemId`),
  KEY `change_request_items_itemId_fkey` (`itemId`),
  CONSTRAINT `change_request_items_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `change_request_items_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_request_items`
--

LOCK TABLES `change_request_items` WRITE;
/*!40000 ALTER TABLE `change_request_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `change_request_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_requests`
--

DROP TABLE IF EXISTS `change_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_requests` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ticketId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requesterId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `justification` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('CORRECTIVE','EVOLUTIONARY','PREVENTIVE','EMERGENCY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('LOW','MEDIUM','HIGH','CRITICAL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `originIncidentId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('DRAFT','INITIAL_VALIDATION','FORMAT_OBSERVED','ALIGNMENT_REJECTED','REGISTERED','CLASSIFIED','IMPACT_ANALYSIS','FAST_APPROVAL','CCB_REVIEW','APPROVED','REJECTED','RESOURCE_ASSIGNMENT','IMPLEMENTATION','UNIT_TESTING','QA_TESTING','QA_DEFECTS','UAT','UAT_OBSERVATIONS','UAT_ACCEPTED','INTEGRATION','FINAL_VALIDATION','RELEASE_APPROVED','RELEASED','ARCHIVED','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INITIAL_VALIDATION',
  `observations` text COLLATE utf8mb4_unicode_ci,
  `classificationCriteria` text COLLATE utf8mb4_unicode_ci,
  `alignmentDecision` enum('PENDING','ALIGNED','NOT_ALIGNED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `alignmentReason` text COLLATE utf8mb4_unicode_ci,
  `alignedById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `formalRegisteredAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `closedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `change_requests_ticketId_key` (`ticketId`),
  UNIQUE KEY `change_requests_originIncidentId_key` (`originIncidentId`),
  KEY `change_requests_projectId_fkey` (`projectId`),
  KEY `change_requests_requesterId_fkey` (`requesterId`),
  KEY `change_requests_alignedById_fkey` (`alignedById`),
  CONSTRAINT `change_requests_alignedById_fkey` FOREIGN KEY (`alignedById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `change_requests_originIncidentId_fkey` FOREIGN KEY (`originIncidentId`) REFERENCES `incidents` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `change_requests_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `change_requests_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_requests`
--

LOCK TABLES `change_requests` WRITE;
/*!40000 ALTER TABLE `change_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `change_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuration_item_locks`
--

DROP TABLE IF EXISTS `configuration_item_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration_item_locks` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','RELEASED','FORCED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `reason` text COLLATE utf8mb4_unicode_ci,
  `lockedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `unlockedAt` datetime(3) DEFAULT NULL,
  `forcedById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forceReason` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `configuration_item_locks_itemId_status_idx` (`itemId`,`status`),
  KEY `configuration_item_locks_userId_fkey` (`userId`),
  KEY `configuration_item_locks_forcedById_fkey` (`forcedById`),
  CONSTRAINT `configuration_item_locks_forcedById_fkey` FOREIGN KEY (`forcedById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_locks_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_locks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration_item_locks`
--

LOCK TABLES `configuration_item_locks` WRITE;
/*!40000 ALTER TABLE `configuration_item_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `configuration_item_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuration_item_versions`
--

DROP TABLE IF EXISTS `configuration_item_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration_item_versions` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storagePath` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sha256Hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('DRAFT','CHECKED_IN','BASELINED','RELEASED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CHECKED_IN',
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gitBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gitCommit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gitPushRef` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `configuration_item_versions_itemId_version_key` (`itemId`,`version`),
  KEY `configuration_item_versions_createdById_fkey` (`createdById`),
  KEY `configuration_item_versions_changeRequestId_fkey` (`changeRequestId`),
  KEY `configuration_item_versions_changeOrderId_fkey` (`changeOrderId`),
  CONSTRAINT `configuration_item_versions_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_versions_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_versions_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_versions_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration_item_versions`
--

LOCK TABLES `configuration_item_versions` WRITE;
/*!40000 ALTER TABLE `configuration_item_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `configuration_item_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuration_items`
--

DROP TABLE IF EXISTS `configuration_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `libraryId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('CODE','DOCUMENT','SCRIPT','MODEL','CONFIGURATION','OTHER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `currentVersion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('REGISTERED','AVAILABLE','LOCKED','BASELINED','ARCHIVED','INACTIVE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'REGISTERED',
  `metadata` text COLLATE utf8mb4_unicode_ci,
  `storagePath` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sha256Hash` char(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsibleId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `configuration_items_code_key` (`code`),
  KEY `configuration_items_projectId_libraryId_idx` (`projectId`,`libraryId`),
  KEY `configuration_items_libraryId_fkey` (`libraryId`),
  KEY `configuration_items_responsibleId_fkey` (`responsibleId`),
  CONSTRAINT `configuration_items_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `configuration_items_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `configuration_items_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration_items`
--

LOCK TABLES `configuration_items` WRITE;
/*!40000 ALTER TABLE `configuration_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `configuration_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_work_logs`
--

DROP TABLE IF EXISTS `daily_work_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_work_logs` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workItemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activityId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logDate` datetime(3) NOT NULL,
  `hours` decimal(5,2) NOT NULL,
  `completed` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nextPlan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `blockers` text COLLATE utf8mb4_unicode_ci,
  `githubBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubCommit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubPullRequestUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `daily_work_logs_projectId_logDate_idx` (`projectId`,`logDate`),
  KEY `daily_work_logs_userId_logDate_idx` (`userId`,`logDate`),
  KEY `daily_work_logs_workItemId_fkey` (`workItemId`),
  KEY `daily_work_logs_changeOrderId_fkey` (`changeOrderId`),
  KEY `daily_work_logs_activityId_fkey` (`activityId`),
  CONSTRAINT `daily_work_logs_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `project_activities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `daily_work_logs_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `daily_work_logs_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `daily_work_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `daily_work_logs_workItemId_fkey` FOREIGN KEY (`workItemId`) REFERENCES `work_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_work_logs`
--

LOCK TABLES `daily_work_logs` WRITE;
/*!40000 ALTER TABLE `daily_work_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_work_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defects`
--

DROP TABLE IF EXISTS `defects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defects` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qaTestId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemVersionId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `severity` enum('LOW','MEDIUM','HIGH','CRITICAL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsibleId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('OPEN','ASSIGNED','FIXED','RETEST','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `defects_code_key` (`code`),
  KEY `defects_qaTestId_fkey` (`qaTestId`),
  KEY `defects_changeOrderId_fkey` (`changeOrderId`),
  KEY `defects_itemId_fkey` (`itemId`),
  KEY `defects_itemVersionId_fkey` (`itemVersionId`),
  KEY `defects_responsibleId_fkey` (`responsibleId`),
  CONSTRAINT `defects_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `defects_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `defects_itemVersionId_fkey` FOREIGN KEY (`itemVersionId`) REFERENCES `configuration_item_versions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `defects_qaTestId_fkey` FOREIGN KEY (`qaTestId`) REFERENCES `qa_tests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `defects_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defects`
--

LOCK TABLES `defects` WRITE;
/*!40000 ALTER TABLE `defects` DISABLE KEYS */;
/*!40000 ALTER TABLE `defects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impact_assessments`
--

DROP TABLE IF EXISTS `impact_assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impact_assessments` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `costEstimated` decimal(12,2) NOT NULL,
  `timeEstimatedHours` int NOT NULL,
  `risks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `requiredResources` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `technicalImpact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `functionalImpact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `affectedItemsImpact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `roi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `highImpact` tinyint(1) NOT NULL DEFAULT '0',
  `route` enum('TECHNICAL_LEAD','CCB') COLLATE utf8mb4_unicode_ci NOT NULL,
  `assessedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `impact_assessments_changeRequestId_key` (`changeRequestId`),
  KEY `impact_assessments_assessedById_fkey` (`assessedById`),
  CONSTRAINT `impact_assessments_assessedById_fkey` FOREIGN KEY (`assessedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `impact_assessments_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impact_assessments`
--

LOCK TABLES `impact_assessments` WRITE;
/*!40000 ALTER TABLE `impact_assessments` DISABLE KEYS */;
/*!40000 ALTER TABLE `impact_assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidents`
--

DROP TABLE IF EXISTS `incidents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidents` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ticketId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reportedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `severity` enum('LOW','MEDIUM','HIGH','CRITICAL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reproductionSteps` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `affectedItemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedToId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('OPEN','ASSIGNED','IN_PROGRESS','DERIVED_TO_CHANGE','RESOLVED','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `incidents_ticketId_key` (`ticketId`),
  KEY `incidents_projectId_fkey` (`projectId`),
  KEY `incidents_reportedById_fkey` (`reportedById`),
  KEY `incidents_assignedToId_fkey` (`assignedToId`),
  KEY `incidents_affectedItemId_fkey` (`affectedItemId`),
  CONSTRAINT `incidents_affectedItemId_fkey` FOREIGN KEY (`affectedItemId`) REFERENCES `configuration_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `incidents_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `incidents_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `incidents_reportedById_fkey` FOREIGN KEY (`reportedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidents`
--

LOCK TABLES `incidents` WRITE;
/*!40000 ALTER TABLE `incidents` DISABLE KEYS */;
/*!40000 ALTER TABLE `incidents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `integrity_alerts`
--

DROP TABLE IF EXISTS `integrity_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `integrity_alerts` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expectedHash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actualHash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('OPEN','REVIEWED','RESOLVED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `resolvedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `integrity_alerts_projectId_fkey` (`projectId`),
  KEY `integrity_alerts_itemId_fkey` (`itemId`),
  CONSTRAINT `integrity_alerts_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `integrity_alerts_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `integrity_alerts`
--

LOCK TABLES `integrity_alerts` WRITE;
/*!40000 ALTER TABLE `integrity_alerts` DISABLE KEYS */;
/*!40000 ALTER TABLE `integrity_alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libraries`
--

DROP TABLE IF EXISTS `libraries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libraries` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('WORK','INTEGRATION','SUPPORT','MASTER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `libraries_projectId_type_key` (`projectId`,`type`),
  CONSTRAINT `libraries_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libraries`
--

LOCK TABLES `libraries` WRITE;
/*!40000 ALTER TABLE `libraries` DISABLE KEYS */;
/*!40000 ALTER TABLE `libraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library_transfers`
--

DROP TABLE IF EXISTS `library_transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_transfers` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fromLibraryId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `toLibraryId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','COMPLETED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `completedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `library_transfers_itemId_fkey` (`itemId`),
  KEY `library_transfers_fromLibraryId_fkey` (`fromLibraryId`),
  KEY `library_transfers_toLibraryId_fkey` (`toLibraryId`),
  KEY `library_transfers_userId_fkey` (`userId`),
  CONSTRAINT `library_transfers_fromLibraryId_fkey` FOREIGN KEY (`fromLibraryId`) REFERENCES `libraries` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `library_transfers_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `library_transfers_toLibraryId_fkey` FOREIGN KEY (`toLibraryId`) REFERENCES `libraries` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `library_transfers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_transfers`
--

LOCK TABLES `library_transfers` WRITE;
/*!40000 ALTER TABLE `library_transfers` DISABLE KEYS */;
/*!40000 ALTER TABLE `library_transfers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `methodology_phases`
--

DROP TABLE IF EXISTS `methodology_phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `methodology_phases` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `methodologyType` enum('SCRUM','KANBAN','RUP','CASCADA','XP','CUSTOM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `startDate` datetime(3) DEFAULT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `ownerId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requiredDeliverables` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `acceptanceCriteria` text COLLATE utf8mb4_unicode_ci,
  `status` enum('PENDING','IN_PROGRESS','DONE','BLOCKED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `methodology_phases_projectId_sortOrder_idx` (`projectId`,`sortOrder`),
  KEY `methodology_phases_ownerId_fkey` (`ownerId`),
  CONSTRAINT `methodology_phases_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `methodology_phases_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `methodology_phases`
--

LOCK TABLES `methodology_phases` WRITE;
/*!40000 ALTER TABLE `methodology_phases` DISABLE KEYS */;
/*!40000 ALTER TABLE `methodology_phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('INFO','WARNING','ERROR','SUCCESS') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INFO',
  `link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `readAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `notifications_userId_fkey` (`userId`),
  CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('038820ec-86ec-4938-bfea-704beeea8669','boards.work.manage','boards/backlog','manage','Gestionar backlog, work items y enlaces de desarrollo','2026-06-04 14:44:57.632'),('15566090-2d54-4cdd-9982-f76ad6178a21','qa.defects.manage','qa/defectos','manage','Defectos','2026-06-04 14:45:35.234'),('163d9aac-6fda-4c39-bdbd-f8933c216ac1','boards.sprints.manage','boards/sprints','manage','Gestionar sprints, capacidad y taskboard','2026-06-04 14:44:59.271'),('1a8ae3f6-af87-4009-9a7b-8fa177c96eb0','config.ecs.manage','configuracion/ecs','manage','Gestionar ECS','2026-06-04 14:45:12.382'),('1df4b696-d7d4-45ba-aca4-8a1ad413edc1','admin.audit.read','admin/auditoria','read','Consultar auditoria','2026-06-04 14:45:09.181'),('23106087-ff35-4416-bd43-f3b9587f6500','config.versions.manage','configuracion/versiones','manage','Check-out, check-in y versiones','2026-06-04 14:45:13.915'),('276ee28b-1af4-4118-bc1d-77fd2862d2cd','boards.methodology.manage','boards/metodologia','manage','Gestionar metodologia, fases y cronograma','2026-06-04 14:45:00.872'),('3a9b7fc9-c10d-4899-ad4a-83a59621820d','support.incidents.manage','soporte/incidencias','manage','Incidencias','2026-06-04 14:45:41.950'),('4551cb04-1cbf-44bd-9966-cc6e7c2d73f2','dev.unit.manage','desarrollo/pruebas-unitarias','manage','Pruebas unitarias','2026-06-04 14:45:32.143'),('5ad0697f-532a-43df-9e01-13f68e9f28ce','admin.projects.manage','admin/proyectos','manage','Gestionar proyectos','2026-06-04 14:45:07.566'),('5c348a14-b274-4178-9bc0-1c56029a5700','changes.technical.manage','cambios/aprobacion-tecnica','manage','Aprobacion tecnica','2026-06-04 14:45:25.521'),('65d2a653-6087-4223-b83d-66796b02565b','admin.users.manage','admin/usuarios','manage','Gestionar usuarios','2026-06-04 14:45:04.283'),('6a9a6abf-137c-40d5-8913-47dbf05822e1','dashboard.read','dashboard','read','Ver dashboard','2026-06-04 14:44:56.079'),('73e3966c-f317-4c1a-bcf3-d614cab07aa4','qa.uat.manage','qa/uat','manage','UAT','2026-06-04 14:45:36.898'),('824e0ffb-ba52-4493-aac7-4ad4fc39c562','dev.orders.manage','desarrollo/mis-ordenes','manage','Ordenes asignadas','2026-06-04 14:45:30.366'),('87542bd8-6bcd-4213-8c05-ab83f06b973f','daily.logs.manage','boards/reportes-diarios','manage','Registrar y revisar reportes diarios','2026-06-04 14:45:02.726'),('8cea4b8e-fd6d-48dd-a119-e124eb05b157','reports.read','reportes','read','Reportes filtrables','2026-06-04 14:45:43.539'),('8ff4ba10-90f8-4141-a004-8f6774ce4b0d','config.baselines.manage','configuracion/lineas-base','manage','Gestionar lineas base','2026-06-04 14:45:18.933'),('90138573-1dc3-4fb9-81fd-3541ce35cd0e','admin.integrity.read','admin/integridad','read','Consultar alertas de integridad','2026-06-04 14:45:10.746'),('a14b8a4f-0cfd-4d41-98d3-ecb08ad0e10c','changes.ccb.manage','cambios/ccb','manage','Revision CCB','2026-06-04 14:45:27.125'),('a17cc6fa-dcf0-4fe5-ba04-cfbf8b78c48d','release.manage','liberacion/releases','manage','Liberaciones','2026-06-04 14:45:40.233'),('cce1bbb1-4f53-4aca-8088-c11be47cdc44','config.locks.manage','configuracion/bloqueos','manage','Gestionar bloqueos','2026-06-04 14:45:15.554'),('cd4e4a57-bfc3-4eb8-8269-59a5677a603b','config.libraries.manage','configuracion/bibliotecas','manage','Transferir bibliotecas','2026-06-04 14:45:17.294'),('cee6976e-79a4-4f4f-a433-9233a7833433','changes.requests.manage','cambios/solicitudes','manage','Gestionar solicitudes de cambio','2026-06-04 14:45:22.379'),('e2315f27-66ac-4e99-995d-2184e65c1baa','changes.impact.manage','cambios/evaluacion-impacto','manage','Evaluar impacto','2026-06-04 14:45:23.978'),('e62f5704-9b6c-46d3-98e4-a7e7c95068ba','admin.roles.manage','admin/roles','manage','Gestionar roles y permisos','2026-06-04 14:45:05.928'),('e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d','config.traceability.read','configuracion/trazabilidad','read','Consultar trazabilidad','2026-06-04 14:45:20.571'),('ea07ed4f-7f90-4e54-9944-52b1261974b2','qa.tests.manage','qa/pruebas','manage','Pruebas QA','2026-06-04 14:45:33.707'),('f3830bc9-5687-45c7-a9a8-eba2cfd71eae','changes.orders.manage','cambios/ordenes','manage','Ordenes de cambio','2026-06-04 14:45:28.763'),('fee15e1e-d643-4c08-8ded-567c46db53d9','qa.final.manage','qa/validacion-final','manage','Validacion final','2026-06-04 14:45:38.559');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_activities`
--

DROP TABLE IF EXISTS `project_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_activities` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phaseId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `responsibleId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliverable` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `progress` int NOT NULL DEFAULT '0',
  `status` enum('PLANNED','IN_PROGRESS','DONE','BLOCKED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PLANNED',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_activities_projectId_startDate_endDate_idx` (`projectId`,`startDate`,`endDate`),
  KEY `project_activities_phaseId_fkey` (`phaseId`),
  KEY `project_activities_responsibleId_fkey` (`responsibleId`),
  CONSTRAINT `project_activities_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `methodology_phases` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_activities_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_activities_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_activities`
--

LOCK TABLES `project_activities` WRITE;
/*!40000 ALTER TABLE `project_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_sprints`
--

DROP TABLE IF EXISTS `project_sprints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_sprints` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `goal` text COLLATE utf8mb4_unicode_ci,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `capacityHours` int DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_sprints_projectId_startDate_endDate_idx` (`projectId`,`startDate`,`endDate`),
  CONSTRAINT `project_sprints_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_sprints`
--

LOCK TABLES `project_sprints` WRITE;
/*!40000 ALTER TABLE `project_sprints` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_sprints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_users`
--

DROP TABLE IF EXISTS `project_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_users_projectId_userId_key` (`projectId`,`userId`),
  KEY `project_users_userId_fkey` (`userId`),
  KEY `project_users_roleId_fkey` (`roleId`),
  CONSTRAINT `project_users_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_users`
--

LOCK TABLES `project_users` WRITE;
/*!40000 ALTER TABLE `project_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('ACTIVE','PAUSED','CLOSED','INACTIVE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `managerId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubOwner` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubRepo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `methodologyType` enum('SCRUM','KANBAN','RUP','CASCADA','XP','CUSTOM') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `methodologyNotes` text COLLATE utf8mb4_unicode_ci,
  `methodologyConfiguredAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `closedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_code_key` (`code`),
  KEY `projects_managerId_fkey` (`managerId`),
  KEY `projects_createdById_fkey` (`createdById`),
  CONSTRAINT `projects_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qa_tests`
--

DROP TABLE IF EXISTS `qa_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qa_tests` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('FUNCTIONAL','INTEGRATION','REGRESSION','FINAL_QUALITY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` enum('PENDING','PASSED','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `executedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `qa_tests_changeOrderId_fkey` (`changeOrderId`),
  KEY `qa_tests_executedById_fkey` (`executedById`),
  CONSTRAINT `qa_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `qa_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qa_tests`
--

LOCK TABLES `qa_tests` WRITE;
/*!40000 ALTER TABLE `qa_tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `qa_tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `release_logs`
--

DROP TABLE IF EXISTS `release_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `release_logs` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `releaseId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `release_logs_releaseId_fkey` (`releaseId`),
  KEY `release_logs_createdById_fkey` (`createdById`),
  CONSTRAINT `release_logs_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `release_logs_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `releases` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `release_logs`
--

LOCK TABLES `release_logs` WRITE;
/*!40000 ALTER TABLE `release_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `release_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `releases`
--

DROP TABLE IF EXISTS `releases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `releases` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semver` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `environment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING_SIGNAL','APPROVED','EXECUTED','FAILED','NOTIFIED','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING_SIGNAL',
  `responsibleId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` text COLLATE utf8mb4_unicode_ci,
  `targetBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mergeCommit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `releasedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `releases_projectId_fkey` (`projectId`),
  KEY `releases_changeRequestId_fkey` (`changeRequestId`),
  KEY `releases_changeOrderId_fkey` (`changeOrderId`),
  KEY `releases_responsibleId_fkey` (`responsibleId`),
  CONSTRAINT `releases_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `releases_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `releases_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `releases_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `releases`
--

LOCK TABLES `releases` WRITE;
/*!40000 ALTER TABLE `releases` DISABLE KEYS */;
/*!40000 ALTER TABLE `releases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `roleId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissionId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `role_permissions_permissionId_fkey` (`permissionId`),
  CONSTRAINT `role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES ('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','038820ec-86ec-4938-bfea-704beeea8669'),('5549c648-c88e-4d49-aded-9ab8efbe4b02','038820ec-86ec-4938-bfea-704beeea8669'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','038820ec-86ec-4938-bfea-704beeea8669'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','038820ec-86ec-4938-bfea-704beeea8669'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','038820ec-86ec-4938-bfea-704beeea8669'),('d740b7d3-1885-48c5-a246-2c01100c39e2','038820ec-86ec-4938-bfea-704beeea8669'),('dc7d5d28-ce54-409c-9e45-053a69cba584','038820ec-86ec-4938-bfea-704beeea8669'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','038820ec-86ec-4938-bfea-704beeea8669'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','15566090-2d54-4cdd-9982-f76ad6178a21'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','163d9aac-6fda-4c39-bdbd-f8933c216ac1'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','163d9aac-6fda-4c39-bdbd-f8933c216ac1'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','163d9aac-6fda-4c39-bdbd-f8933c216ac1'),('dc7d5d28-ce54-409c-9e45-053a69cba584','163d9aac-6fda-4c39-bdbd-f8933c216ac1'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','1a8ae3f6-af87-4009-9a7b-8fa177c96eb0'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','1a8ae3f6-af87-4009-9a7b-8fa177c96eb0'),('dc7d5d28-ce54-409c-9e45-053a69cba584','1df4b696-d7d4-45ba-aca4-8a1ad413edc1'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','23106087-ff35-4416-bd43-f3b9587f6500'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','23106087-ff35-4416-bd43-f3b9587f6500'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','276ee28b-1af4-4118-bc1d-77fd2862d2cd'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','276ee28b-1af4-4118-bc1d-77fd2862d2cd'),('dc7d5d28-ce54-409c-9e45-053a69cba584','276ee28b-1af4-4118-bc1d-77fd2862d2cd'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','3a9b7fc9-c10d-4899-ad4a-83a59621820d'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','3a9b7fc9-c10d-4899-ad4a-83a59621820d'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','4551cb04-1cbf-44bd-9966-cc6e7c2d73f2'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','5ad0697f-532a-43df-9e01-13f68e9f28ce'),('dc7d5d28-ce54-409c-9e45-053a69cba584','5ad0697f-532a-43df-9e01-13f68e9f28ce'),('5549c648-c88e-4d49-aded-9ab8efbe4b02','5c348a14-b274-4178-9bc0-1c56029a5700'),('dc7d5d28-ce54-409c-9e45-053a69cba584','65d2a653-6087-4223-b83d-66796b02565b'),('410f1ba0-06bd-489b-b286-3724163e323b','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('5549c648-c88e-4d49-aded-9ab8efbe4b02','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('d740b7d3-1885-48c5-a246-2c01100c39e2','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('dc7d5d28-ce54-409c-9e45-053a69cba584','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','6a9a6abf-137c-40d5-8913-47dbf05822e1'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','73e3966c-f317-4c1a-bcf3-d614cab07aa4'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','73e3966c-f317-4c1a-bcf3-d614cab07aa4'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','824e0ffb-ba52-4493-aac7-4ad4fc39c562'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','87542bd8-6bcd-4213-8c05-ab83f06b973f'),('5549c648-c88e-4d49-aded-9ab8efbe4b02','87542bd8-6bcd-4213-8c05-ab83f06b973f'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','87542bd8-6bcd-4213-8c05-ab83f06b973f'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','87542bd8-6bcd-4213-8c05-ab83f06b973f'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','87542bd8-6bcd-4213-8c05-ab83f06b973f'),('dc7d5d28-ce54-409c-9e45-053a69cba584','87542bd8-6bcd-4213-8c05-ab83f06b973f'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','87542bd8-6bcd-4213-8c05-ab83f06b973f'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','8cea4b8e-fd6d-48dd-a119-e124eb05b157'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','8cea4b8e-fd6d-48dd-a119-e124eb05b157'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','8cea4b8e-fd6d-48dd-a119-e124eb05b157'),('d740b7d3-1885-48c5-a246-2c01100c39e2','8cea4b8e-fd6d-48dd-a119-e124eb05b157'),('dc7d5d28-ce54-409c-9e45-053a69cba584','8cea4b8e-fd6d-48dd-a119-e124eb05b157'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','8ff4ba10-90f8-4141-a004-8f6774ce4b0d'),('dc7d5d28-ce54-409c-9e45-053a69cba584','90138573-1dc3-4fb9-81fd-3541ce35cd0e'),('d740b7d3-1885-48c5-a246-2c01100c39e2','a14b8a4f-0cfd-4d41-98d3-ecb08ad0e10c'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','a17cc6fa-dcf0-4fe5-ba04-cfbf8b78c48d'),('ca823046-95a1-4cda-a8c9-7bf3d7f358a2','a17cc6fa-dcf0-4fe5-ba04-cfbf8b78c48d'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','cce1bbb1-4f53-4aca-8088-c11be47cdc44'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','cd4e4a57-bfc3-4eb8-8269-59a5677a603b'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','cee6976e-79a4-4f4f-a433-9233a7833433'),('5549c648-c88e-4d49-aded-9ab8efbe4b02','cee6976e-79a4-4f4f-a433-9233a7833433'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','cee6976e-79a4-4f4f-a433-9233a7833433'),('d740b7d3-1885-48c5-a246-2c01100c39e2','cee6976e-79a4-4f4f-a433-9233a7833433'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','cee6976e-79a4-4f4f-a433-9233a7833433'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','e2315f27-66ac-4e99-995d-2184e65c1baa'),('dc7d5d28-ce54-409c-9e45-053a69cba584','e62f5704-9b6c-46d3-98e4-a7e7c95068ba'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d'),('5549c648-c88e-4d49-aded-9ab8efbe4b02','e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d'),('d740b7d3-1885-48c5-a246-2c01100c39e2','e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d'),('dc7d5d28-ce54-409c-9e45-053a69cba584','e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','e9bbbf7a-3cc8-493d-b4e7-b33b4bb4129d'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','ea07ed4f-7f90-4e54-9944-52b1261974b2'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','f3830bc9-5687-45c7-a9a8-eba2cfd71eae'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','fee15e1e-d643-4c08-8ded-567c46db53d9');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `isSystem` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('410f1ba0-06bd-489b-b286-3724163e323b','Sistema Gestor de Configuracion','SISTEMA_CONFIGURACION','Actor logico automatizado del flujo SGCSW.',1,1,'2026-06-04 14:45:58.019','2026-06-04 14:45:58.019'),('47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Director / Jefe de Proyecto','JEFE_PROYECTO','Valida alineacion, evalua impacto y asigna recursos.',0,1,'2026-06-04 14:45:48.235','2026-06-04 14:45:48.235'),('5549c648-c88e-4d49-aded-9ab8efbe4b02','Lider Tecnico / Analista','LIDER_TECNICO','Aprueba o rechaza cambios de bajo impacto.',0,1,'2026-06-04 14:45:49.890','2026-06-04 14:45:49.890'),('6eefe5a7-7376-4c40-807f-bae1d94ac94b','Desarrollador Asignado','DESARROLLADOR','Implementa cambios, check-in y pruebas unitarias.',0,1,'2026-06-04 14:45:54.836','2026-06-04 14:45:54.836'),('896b05d4-6ec8-4595-b695-afb2b4aa3216','Equipo QA / Tester','QA','Ejecuta QA, defectos, UAT y validacion final.',0,1,'2026-06-04 14:45:56.426','2026-06-04 14:45:56.426'),('ca823046-95a1-4cda-a8c9-7bf3d7f358a2','Sistema Gestor de Liberacion','SISTEMA_LIBERACION','Actor logico de ejecucion o registro de release.',1,1,'2026-06-04 14:45:59.691','2026-06-04 14:45:59.691'),('cb44a58c-e674-4c44-8b44-d91a0bbb46b9','Administrador de Configuracion / Bibliotecario','BIBLIOTECARIO','Gestiona ECS, bibliotecas, bloqueos y lineas base.',0,1,'2026-06-04 14:45:53.305','2026-06-04 14:45:53.305'),('d740b7d3-1885-48c5-a246-2c01100c39e2','Comite de Control de Cambios','CCB','Evalua cambios de alto impacto.',0,1,'2026-06-04 14:45:51.729','2026-06-04 14:45:51.729'),('dc7d5d28-ce54-409c-9e45-053a69cba584','Administrador del Sistema','ADMINISTRADOR','Gestiona usuarios, roles, proyectos, auditoria e integridad.',0,1,'2026-06-04 14:45:45.111','2026-06-04 14:45:45.111'),('e98cf7c8-de6b-490e-bdc7-e7c83a358faa','Solicitante / Cliente / Usuario Final','SOLICITANTE','Registra solicitudes, incidencias y ejecuta UAT.',0,1,'2026-06-04 14:45:46.670','2026-06-04 14:45:46.670');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technical_approvals`
--

DROP TABLE IF EXISTS `technical_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technical_approvals` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewerId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `decision` enum('PENDING','APPROVED','REJECTED','POSTPONED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `reason` text COLLATE utf8mb4_unicode_ci,
  `decidedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `technical_approvals_changeRequestId_key` (`changeRequestId`),
  KEY `technical_approvals_reviewerId_fkey` (`reviewerId`),
  CONSTRAINT `technical_approvals_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `technical_approvals_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technical_approvals`
--

LOCK TABLES `technical_approvals` WRITE;
/*!40000 ALTER TABLE `technical_approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `technical_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traceability_links`
--

DROP TABLE IF EXISTS `traceability_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traceability_links` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sourceType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sourceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `targetType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `targetId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `relationType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `traceability_links_sourceType_sourceId_idx` (`sourceType`,`sourceId`),
  KEY `traceability_links_targetType_targetId_idx` (`targetType`,`targetId`),
  KEY `traceability_links_projectId_fkey` (`projectId`),
  KEY `traceability_links_createdById_fkey` (`createdById`),
  CONSTRAINT `traceability_links_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `traceability_links_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traceability_links`
--

LOCK TABLES `traceability_links` WRITE;
/*!40000 ALTER TABLE `traceability_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `traceability_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uat_tests`
--

DROP TABLE IF EXISTS `uat_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uat_tests` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `executedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` enum('PENDING','ACCEPTED','OBSERVED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `observations` text COLLATE utf8mb4_unicode_ci,
  `executedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `uat_tests_changeRequestId_fkey` (`changeRequestId`),
  KEY `uat_tests_changeOrderId_fkey` (`changeOrderId`),
  KEY `uat_tests_executedById_fkey` (`executedById`),
  CONSTRAINT `uat_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `uat_tests_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `uat_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uat_tests`
--

LOCK TABLES `uat_tests` WRITE;
/*!40000 ALTER TABLE `uat_tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `uat_tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_tests`
--

DROP TABLE IF EXISTS `unit_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_tests` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemVersionId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `executedById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` enum('PENDING','PASSED','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `errors` text COLLATE utf8mb4_unicode_ci,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `executedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `unit_tests_changeOrderId_fkey` (`changeOrderId`),
  KEY `unit_tests_itemVersionId_fkey` (`itemVersionId`),
  KEY `unit_tests_executedById_fkey` (`executedById`),
  CONSTRAINT `unit_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `unit_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `unit_tests_itemVersionId_fkey` FOREIGN KEY (`itemVersionId`) REFERENCES `configuration_item_versions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_tests`
--

LOCK TABLES `unit_tests` WRITE;
/*!40000 ALTER TABLE `unit_tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit_tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `roleId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `githubTokenEncrypted` text COLLATE utf8mb4_unicode_ci,
  `githubTokenLast4` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastLoginAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `users_roleId_fkey` (`roleId`),
  CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('9665e051-d7e6-4e38-9891-e91e88a65f1c','Carlos Daniel','carlosdaniel@gmail.com','$2b$12$h2UEjopfKLYDaOatQzspcOejWf9/WbPoVf0Rn.J7tUswCUzbIWDxO','ACTIVE','dc7d5d28-ce54-409c-9e45-053a69cba584',NULL,NULL,'2026-06-04 15:24:01.877','2026-06-04 14:49:57.549','2026-06-04 15:24:02.711');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_item_links`
--

DROP TABLE IF EXISTS `work_item_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_item_links` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sourceWorkItemId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `targetWorkItemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkType` enum('PARENT','CHILD','RELATED','PREDECESSOR','SUCCESSOR','GITHUB_BRANCH','GITHUB_COMMIT','GITHUB_PULL_REQUEST','GITHUB_ISSUE','CHANGE_REQUEST','CHANGE_ORDER','CONFIG_ITEM','RELEASE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `targetUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `externalId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `work_item_links_sourceWorkItemId_linkType_idx` (`sourceWorkItemId`,`linkType`),
  KEY `work_item_links_targetWorkItemId_fkey` (`targetWorkItemId`),
  KEY `work_item_links_createdById_fkey` (`createdById`),
  CONSTRAINT `work_item_links_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `work_item_links_sourceWorkItemId_fkey` FOREIGN KEY (`sourceWorkItemId`) REFERENCES `work_items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `work_item_links_targetWorkItemId_fkey` FOREIGN KEY (`targetWorkItemId`) REFERENCES `work_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_item_links`
--

LOCK TABLES `work_item_links` WRITE;
/*!40000 ALTER TABLE `work_item_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_item_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_items`
--

DROP TABLE IF EXISTS `work_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('EPIC','FEATURE','USER_STORY','TASK','BUG','ISSUE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` enum('NEW','ACTIVE','RESOLVED','CLOSED','REMOVED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('LOW','MEDIUM','HIGH','CRITICAL') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MEDIUM',
  `storyPoints` int DEFAULT NULL,
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assignedToId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sprintId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activityId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changeRequestId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changeOrderId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubBranch` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubCommit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubPullRequestUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubIssueUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dueDate` datetime(3) DEFAULT NULL,
  `closedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `work_items_code_key` (`code`),
  KEY `work_items_projectId_state_type_idx` (`projectId`,`state`,`type`),
  KEY `work_items_createdById_fkey` (`createdById`),
  KEY `work_items_assignedToId_fkey` (`assignedToId`),
  KEY `work_items_sprintId_fkey` (`sprintId`),
  KEY `work_items_activityId_fkey` (`activityId`),
  KEY `work_items_changeRequestId_fkey` (`changeRequestId`),
  KEY `work_items_changeOrderId_fkey` (`changeOrderId`),
  CONSTRAINT `work_items_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `project_activities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `work_items_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `work_items_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `work_items_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `work_items_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `work_items_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `work_items_sprintId_fkey` FOREIGN KEY (`sprintId`) REFERENCES `project_sprints` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_items`
--

LOCK TABLES `work_items` WRITE;
/*!40000 ALTER TABLE `work_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-04 10:45:10
