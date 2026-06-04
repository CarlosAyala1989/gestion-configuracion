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
-- Table structure for table `configuration_item_catalog`
--

DROP TABLE IF EXISTS `configuration_item_catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration_item_catalog` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `methodologyType` enum('SCRUM','KANBAN','RUP','CASCADA','XP','CUSTOM') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('CODE','DOCUMENT','SCRIPT','MODEL','CONFIGURATION','OTHER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `defaultLibraryType` enum('WORK','INTEGRATION','SUPPORT','MASTER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'WORK',
  `defaultVersion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1.0.0',
  `defaultMetadata` text COLLATE utf8mb4_unicode_ci,
  `required` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `configuration_item_catalog_code_key` (`code`),
  KEY `configuration_item_catalog_methodologyType_active_sortOrder_idx` (`methodologyType`,`active`,`sortOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration_item_catalog`
--

LOCK TABLES `configuration_item_catalog` WRITE;
/*!40000 ALTER TABLE `configuration_item_catalog` DISABLE KEYS */;
INSERT INTO `configuration_item_catalog` VALUES ('016d58b5-d260-463b-a858-e5489a32ac7e','XP','XP-USER-STORIES','DOCUMENT','Historias XP','Historias, valores y criterios de aceptacion.','WORK','1.0.0',NULL,1,1,1,'2026-06-04 15:53:33.272','2026-06-04 15:53:33.272'),('01eee506-2cbb-4d3d-8394-b21f0e1b0f22','CASCADA','CASCADA-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,1,5,1,'2026-06-04 15:52:51.961','2026-06-04 15:52:51.961'),('020022e2-63bb-47c6-afda-46658c5afbdc','SCRUM','SCRUM-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,1,8,1,'2026-06-04 15:51:06.427','2026-06-04 15:51:06.427'),('02b761d9-b45a-474e-95e1-0f6889cdad47','CUSTOM','CUSTOM-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,1,8,1,'2026-06-04 15:54:47.258','2026-06-04 15:54:47.258'),('1431b5e6-5c02-4c56-9922-a25e3510ed18','SCRUM','SCRUM-USER-STORIES','DOCUMENT','Historias de usuario','Historias con criterios de aceptacion y estimacion.','WORK','1.0.0',NULL,1,3,1,'2026-06-04 15:50:50.591','2026-06-04 15:50:50.591'),('1b5c6acd-6f59-41e8-96e8-08e0eaf721a6','XP','XP-UNIT-TESTS','CODE','Pruebas unitarias','Pruebas automatizadas del incremento.','WORK','1.0.0',NULL,1,3,1,'2026-06-04 15:53:39.796','2026-06-04 15:53:39.796'),('2295100b-0f84-4d4b-95a1-87f624f319e2','SCRUM','SCRUM-DOD','CONFIGURATION','Definition of Done','Criterios de terminado del equipo.','SUPPORT','1.0.0',NULL,1,4,1,'2026-06-04 15:50:53.663','2026-06-04 15:50:53.663'),('23fa82ef-574b-497b-8eb9-f2dfa0318d22','SCRUM','SCRUM-RETRO','DOCUMENT','Retrospectiva','Lecciones y acciones de mejora.','SUPPORT','1.0.0',NULL,1,11,1,'2026-06-04 15:51:16.003','2026-06-04 15:51:16.003'),('2ded3c51-f2db-45fc-ab0a-1b22d9a003c7','RUP','RUP-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,1,10,1,'2026-06-04 15:50:03.929','2026-06-04 15:50:03.929'),('2f2f5550-9f90-4fa0-8941-ac1bdfd54d9b','SCRUM','SCRUM-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,1,10,1,'2026-06-04 15:51:12.881','2026-06-04 15:51:12.881'),('2f561bf8-6ec0-4401-ad36-cbf169bf07ab','RUP','RUP-USE-CASE','MODEL','Modelo de casos de uso','Diagramas y narrativas de casos de uso.','WORK','1.0.0',NULL,1,3,1,'2026-06-04 15:49:41.065','2026-06-04 15:49:41.065'),('31d03e4c-3712-4eb5-9340-e02e644d4555','CASCADA','CASCADA-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,1,6,1,'2026-06-04 15:52:55.148','2026-06-04 15:52:55.148'),('32c80ef9-837c-4162-9beb-a37e5e7cf010','RUP','RUP-SRS','DOCUMENT','Especificacion de requisitos','Requisitos funcionales/no funcionales, reglas y trazabilidad.','WORK','1.0.0',NULL,1,2,1,'2026-06-04 15:49:37.908','2026-06-04 15:49:37.908'),('39b88931-a37f-4e48-8979-76d8c5bbf661','XP','XP-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,1,7,1,'2026-06-04 15:53:52.903','2026-06-04 15:53:52.903'),('400e6e2c-316c-4ff7-b1d5-c6ad699f64ad','CASCADA','CASCADA-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,1,7,1,'2026-06-04 15:52:58.424','2026-06-04 15:52:58.424'),('4046d524-0ee4-4557-8cb3-74a27bff6a77','CASCADA','CASCADA-DESIGN-MODELS','MODEL','Modelos de diseno','Modelos UML, datos e interfaces.','WORK','1.0.0',NULL,1,3,1,'2026-06-04 15:52:45.580','2026-06-04 15:52:45.580'),('426214d6-3577-4f85-b08f-bf8c410392e0','CUSTOM','CUSTOM-PLAN','DOCUMENT','Plan del proyecto','Cronograma, alcance y responsables.','WORK','1.0.0',NULL,1,1,1,'2026-06-04 15:54:24.619','2026-06-04 15:54:24.619'),('4a77475c-54b6-40a7-aad6-4e86ef3f22de','XP','XP-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,1,9,1,'2026-06-04 15:53:59.336','2026-06-04 15:53:59.336'),('4beb234c-2eb1-4967-9296-dad99bd57fb8','XP','XP-RELEASE-PLAN','DOCUMENT','Release plan','Iteraciones, alcance y prioridades.','WORK','1.0.0',NULL,1,2,1,'2026-06-04 15:53:36.531','2026-06-04 15:53:36.531'),('4c9b81f8-c71c-4479-a623-15641cacbce1','CASCADA','CASCADA-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,1,9,1,'2026-06-04 15:53:05.080','2026-06-04 15:53:05.080'),('4fd93455-e53c-484f-8eb3-72e82063284b','KANBAN','KANBAN-BOARD','CONFIGURATION','Tablero Kanban','Columnas, estados y reglas del tablero.','WORK','1.0.0',NULL,1,2,1,'2026-06-04 15:51:47.939','2026-06-04 15:51:47.939'),('50b547f1-530b-4836-bc61-d66a87dda09a','CASCADA','CASCADA-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,1,8,1,'2026-06-04 15:53:01.576','2026-06-04 15:53:01.576'),('51cf37a9-4bcd-46e8-932e-bc41a7eac05f','XP','XP-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,1,8,1,'2026-06-04 15:53:56.118','2026-06-04 15:53:56.118'),('54ed5993-5925-437f-b70f-ef97b58e1404','SCRUM','SCRUM-SPRINT-BACKLOG','DOCUMENT','Sprint Backlog','Items comprometidos, capacidad y objetivo del sprint.','WORK','1.0.0',NULL,1,2,1,'2026-06-04 15:50:47.400','2026-06-04 15:50:47.400'),('55f2f13b-464d-4844-ba8e-967991fab4bf','KANBAN','KANBAN-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,1,5,1,'2026-06-04 15:51:57.653','2026-06-04 15:51:57.653'),('56470976-9c5b-4a8b-8b7b-b30cebe14cb9','KANBAN','KANBAN-KANBAN-POLICIES','CONFIGURATION','Politicas Kanban','Politicas explicitas, limites WIP y criterios de flujo.','WORK','1.0.0',NULL,1,1,1,'2026-06-04 15:51:44.624','2026-06-04 15:51:44.624'),('5f9cdb2d-f2d2-4729-b91d-d1dba4a496f4','RUP','RUP-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,1,8,1,'2026-06-04 15:49:57.170','2026-06-04 15:49:57.170'),('60e810e9-c6e2-4368-8812-894d60c8fe3f','KANBAN','KANBAN-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,1,9,1,'2026-06-04 15:52:10.704','2026-06-04 15:52:10.704'),('628476cd-9edb-43e4-88f3-ceaeddfc5c24','RUP','RUP-UAT','DOCUMENT','Evidencia UAT','Pruebas de aceptacion y acta firmada.','MASTER','1.0.0',NULL,1,13,1,'2026-06-04 15:50:13.737','2026-06-04 15:50:13.737'),('64194157-a66e-474c-bbc1-5a072500508b','RUP','RUP-DB-MODEL','MODEL','Modelo de datos','Modelo logico/fisico de datos y restricciones.','WORK','1.0.0',NULL,1,7,1,'2026-06-04 15:49:53.893','2026-06-04 15:49:53.893'),('6707ca9b-576b-4c20-a87a-894bc39fb923','RUP','RUP-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,1,11,1,'2026-06-04 15:50:07.179','2026-06-04 15:50:07.179'),('6794f6e6-d94b-480b-a82f-7a346388f305','CUSTOM','CUSTOM-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,1,7,1,'2026-06-04 15:54:43.959','2026-06-04 15:54:43.959'),('67dad9ec-c248-480d-aef5-c54bb5545948','SCRUM','SCRUM-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,1,7,1,'2026-06-04 15:51:03.272','2026-06-04 15:51:03.272'),('68f8b40e-37bf-4bfa-9f60-6224a7a432f2','RUP','RUP-SEQUENCE-DIAGRAM','MODEL','Diagramas de secuencia','Interacciones de escenarios clave.','WORK','1.0.0',NULL,1,6,1,'2026-06-04 15:49:50.718','2026-06-04 15:49:50.718'),('698741d9-256d-4dd5-b799-f4c6425e038d','KANBAN','KANBAN-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,1,8,1,'2026-06-04 15:52:07.428','2026-06-04 15:52:07.428'),('6be9669b-6a5c-4d8b-b7ab-aab0a14569a2','RUP','RUP-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,1,9,1,'2026-06-04 15:50:00.398','2026-06-04 15:50:00.398'),('708cae56-3230-4738-8a45-ba766dbed2a9','CASCADA','CASCADA-SAD','DOCUMENT','Diseno de arquitectura','Arquitectura, componentes e interfaces.','WORK','1.0.0',NULL,1,2,1,'2026-06-04 15:52:42.444','2026-06-04 15:52:42.444'),('75542d57-e42e-44cd-81d5-c56e1d0c852b','CUSTOM','CUSTOM-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,1,4,1,'2026-06-04 15:54:34.458','2026-06-04 15:54:34.458'),('7fa0cef7-e560-4afb-a7c9-6dbead70f681','RUP','RUP-CLASS-DIAGRAM','MODEL','Diagrama de clases','Modelo de clases y relaciones principales.','WORK','1.0.0',NULL,1,5,1,'2026-06-04 15:49:47.544','2026-06-04 15:49:47.544'),('80788a8c-8265-45c0-8027-80ac2480f1d6','KANBAN','KANBAN-FLOW-METRICS','DOCUMENT','Metricas de flujo','Lead time, cycle time, throughput y bloqueos.','SUPPORT','1.0.0',NULL,1,3,1,'2026-06-04 15:51:51.212','2026-06-04 15:51:51.212'),('84e4b409-19e5-49f7-bd8c-6398d5ae352d','KANBAN','KANBAN-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,1,6,1,'2026-06-04 15:52:00.807','2026-06-04 15:52:00.807'),('8579911a-9935-4447-87de-89a01b3a5e44','KANBAN','KANBAN-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,1,7,1,'2026-06-04 15:52:04.048','2026-06-04 15:52:04.048'),('8d662658-3b30-4056-806c-66db40665789','CUSTOM','CUSTOM-REQUIREMENTS','DOCUMENT','Requisitos','Requisitos y criterios definidos por el equipo.','WORK','1.0.0',NULL,1,2,1,'2026-06-04 15:54:27.904','2026-06-04 15:54:27.904'),('900bc2cf-cd47-4295-923f-188298aa6821','CUSTOM','CUSTOM-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,1,5,1,'2026-06-04 15:54:37.557','2026-06-04 15:54:37.557'),('92381a18-3007-45a2-95f9-4d20246a1bf5','XP','XP-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,1,5,1,'2026-06-04 15:53:46.268','2026-06-04 15:53:46.268'),('93b6830b-9ba0-4e4b-91a3-f01abf89260d','RUP','RUP-VISION','DOCUMENT','Documento de vision','Objetivos, alcance, actores y restricciones del producto.','WORK','1.0.0',NULL,1,1,1,'2026-06-04 15:49:34.755','2026-06-04 15:49:34.755'),('97ca70f4-bf32-4bfc-b3d4-85731fe88bfd','RUP','RUP-SAD','DOCUMENT','Documento de arquitectura','Componentes, decisiones tecnicas y vistas arquitectonicas.','WORK','1.0.0',NULL,1,4,1,'2026-06-04 15:49:44.308','2026-06-04 15:49:44.308'),('9afaff21-b1b8-46d9-a7db-d894de031486','XP','XP-PAIRING-NOTES','DOCUMENT','Notas de pairing','Registro de decisiones y aprendizaje tecnico.','SUPPORT','1.0.0',NULL,0,4,1,'2026-06-04 15:53:43.096','2026-06-04 15:53:43.096'),('ad9baf23-27ad-4149-9010-24bd6477ff45','SCRUM','SCRUM-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,1,9,1,'2026-06-04 15:51:09.744','2026-06-04 15:51:09.744'),('b0950aca-9e8f-4ea2-bcfe-451b36880a72','SCRUM','SCRUM-PRODUCT-BACKLOG','DOCUMENT','Product Backlog','Lista priorizada de epicas, features e historias.','WORK','1.0.0',NULL,1,1,1,'2026-06-04 15:50:44.177','2026-06-04 15:50:44.177'),('b1ce2304-c0ba-4b5e-9718-79c596413ce1','SCRUM','SCRUM-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,1,6,1,'2026-06-04 15:51:00.139','2026-06-04 15:51:00.139'),('b8ea685b-6646-4c04-9e3c-74f103d948fc','SCRUM','SCRUM-BURNDOWN','DOCUMENT','Burndown / avance','Seguimiento de avance del sprint.','SUPPORT','1.0.0',NULL,1,5,1,'2026-06-04 15:50:56.941','2026-06-04 15:50:56.941'),('bc957373-1364-4e9b-8084-f5d289c637c9','CASCADA','CASCADA-SRS','DOCUMENT','Especificacion de requisitos','Requisitos completos y aprobados.','WORK','1.0.0',NULL,1,1,1,'2026-06-04 15:52:39.239','2026-06-04 15:52:39.239'),('cc38b5a5-7a7e-46f0-a5f9-a581644eb02f','CUSTOM','CUSTOM-ARCHITECTURE','DOCUMENT','Arquitectura','Diseno tecnico segun el proyecto.','WORK','1.0.0',NULL,1,3,1,'2026-06-04 15:54:31.107','2026-06-04 15:54:31.107'),('cd2ff961-9189-4154-abbf-37fbaf5c3302','CASCADA','CASCADA-DEPLOYMENT-PLAN','DOCUMENT','Plan de despliegue','Pasos, responsables y contingencia.','MASTER','1.0.0',NULL,1,4,1,'2026-06-04 15:52:48.785','2026-06-04 15:52:48.785'),('d41c1fed-0117-4ba9-9d71-51b4b730a64d','RUP','RUP-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,1,12,1,'2026-06-04 15:50:10.448','2026-06-04 15:50:10.448'),('dc81115a-7f6b-405c-8f3b-af192d9e7d84','KANBAN','KANBAN-BLOCKERS','DOCUMENT','Registro de bloqueos','Bloqueos y acciones de desbloqueo.','SUPPORT','1.0.0',NULL,1,4,1,'2026-06-04 15:51:54.320','2026-06-04 15:51:54.320'),('e3f27d6a-b989-4b0b-8d7e-cb166be7a80a','XP','XP-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,1,6,1,'2026-06-04 15:53:49.381','2026-06-04 15:53:49.381'),('eb62b6f4-81ce-45e1-a1ca-ce7194304dee','CUSTOM','CUSTOM-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,1,6,1,'2026-06-04 15:54:40.709','2026-06-04 15:54:40.709');
/*!40000 ALTER TABLE `configuration_item_catalog` ENABLE KEYS */;
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
  `sourceTemplatePhaseId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `methodology_phases_projectId_sortOrder_idx` (`projectId`,`sortOrder`),
  KEY `methodology_phases_ownerId_fkey` (`ownerId`),
  KEY `methodology_phases_sourceTemplatePhaseId_idx` (`sourceTemplatePhaseId`),
  CONSTRAINT `methodology_phases_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `methodology_phases_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `methodology_phases_sourceTemplatePhaseId_fkey` FOREIGN KEY (`sourceTemplatePhaseId`) REFERENCES `project_setup_template_phases` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `methodology_phases`
--

LOCK TABLES `methodology_phases` WRITE;
/*!40000 ALTER TABLE `methodology_phases` DISABLE KEYS */;
/*!40000 ALTER TABLE `methodology_phases` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_methodology_phases_prevent_locked_insert_bi` BEFORE INSERT ON `methodology_phases` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la metodologia: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_methodology_phases_prevent_locked_update_bu` BEFORE UPDATE ON `methodology_phases` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la metodologia: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_methodology_phases_prevent_locked_delete_bd` BEFORE DELETE ON `methodology_phases` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la metodologia: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `sourceTemplateActivityId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_activities_projectId_startDate_endDate_idx` (`projectId`,`startDate`,`endDate`),
  KEY `project_activities_phaseId_fkey` (`phaseId`),
  KEY `project_activities_responsibleId_fkey` (`responsibleId`),
  KEY `project_activities_sourceTemplateActivityId_idx` (`sourceTemplateActivityId`),
  CONSTRAINT `project_activities_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `methodology_phases` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_activities_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_activities_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_activities_sourceTemplateActivityId_fkey` FOREIGN KEY (`sourceTemplateActivityId`) REFERENCES `project_setup_template_activities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_activities`
--

LOCK TABLES `project_activities` WRITE;
/*!40000 ALTER TABLE `project_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_activities` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_project_activities_prevent_locked_insert_bi` BEFORE INSERT ON `project_activities` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el cronograma: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_project_activities_prevent_locked_update_bu` BEFORE UPDATE ON `project_activities` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el cronograma: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_project_activities_prevent_locked_delete_bd` BEFORE DELETE ON `project_activities` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el cronograma: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `project_configuration_item_plans`
--

DROP TABLE IF EXISTS `project_configuration_item_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_configuration_item_plans` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catalogItemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sourceTemplateItemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('CODE','DOCUMENT','SCRIPT','MODEL','CONFIGURATION','OTHER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `libraryType` enum('WORK','INTEGRATION','SUPPORT','MASTER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'WORK',
  `defaultVersion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1.0.0',
  `metadata` text COLLATE utf8mb4_unicode_ci,
  `responsibleId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '1',
  `selected` tinyint(1) NOT NULL DEFAULT '1',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `sortOrder` int NOT NULL DEFAULT '0',
  `status` enum('PLANNED','APPROVED','GENERATED','OMITTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PLANNED',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_configuration_item_plans_projectId_code_key` (`projectId`,`code`),
  KEY `project_configuration_item_plans_projectId_selected_status_idx` (`projectId`,`selected`,`status`),
  KEY `project_configuration_item_plans_responsibleId_idx` (`responsibleId`),
  KEY `project_configuration_item_plans_catalogItemId_fkey` (`catalogItemId`),
  KEY `project_configuration_item_plans_sourceTemplateItemId_fkey` (`sourceTemplateItemId`),
  CONSTRAINT `project_configuration_item_plans_catalogItemId_fkey` FOREIGN KEY (`catalogItemId`) REFERENCES `configuration_item_catalog` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_configuration_item_plans_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_configuration_item_plans_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_configuration_item_plans_sourceTemplateItemId_fkey` FOREIGN KEY (`sourceTemplateItemId`) REFERENCES `project_setup_template_config_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_configuration_item_plans`
--

LOCK TABLES `project_configuration_item_plans` WRITE;
/*!40000 ALTER TABLE `project_configuration_item_plans` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_configuration_item_plans` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_config_item_plans_prevent_locked_insert_bi` BEFORE INSERT ON `project_configuration_item_plans` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la seleccion ECS inicial: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_config_item_plans_prevent_locked_update_bu` BEFORE UPDATE ON `project_configuration_item_plans` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la seleccion ECS inicial: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_config_item_plans_prevent_locked_delete_bd` BEFORE DELETE ON `project_configuration_item_plans` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la seleccion ECS inicial: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `project_setup_template_activities`
--

DROP TABLE IF EXISTS `project_setup_template_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_setup_template_activities` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `templateId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phaseId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `startOffsetDays` int NOT NULL DEFAULT '0',
  `durationDays` int NOT NULL DEFAULT '1',
  `responsibleRoleId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deliverable` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `progress` int NOT NULL DEFAULT '0',
  `status` enum('PLANNED','IN_PROGRESS','DONE','BLOCKED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PLANNED',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_setup_template_activities_templateId_startOffsetDays_idx` (`templateId`,`startOffsetDays`),
  KEY `project_setup_template_activities_phaseId_fkey` (`phaseId`),
  KEY `project_setup_template_activities_responsibleRoleId_fkey` (`responsibleRoleId`),
  CONSTRAINT `project_setup_template_activities_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `project_setup_template_phases` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_template_activities_responsibleRoleId_fkey` FOREIGN KEY (`responsibleRoleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_template_activities_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `project_setup_templates` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_setup_template_activities`
--

LOCK TABLES `project_setup_template_activities` WRITE;
/*!40000 ALTER TABLE `project_setup_template_activities` DISABLE KEYS */;
INSERT INTO `project_setup_template_activities` VALUES ('027873b5-a7ab-4ba3-970c-cf5f24de7441','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','0d8d6a92-98ea-4982-8f5a-a5ab38cfc97b','Priorizar historias XP','Actividad 1 de la plantilla XP.',0,3,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Release plan',0,'PLANNED','2026-06-04 15:53:26.298','2026-06-04 15:53:26.298'),('0f14746d-8a70-481f-801a-abcb4dbfc1e7','18f61e93-c621-4828-a0e7-ce19bfebd948','07055532-58a7-41fe-9aef-1e891852194b','Elaborar SRS y casos de uso','Actividad 2 de la plantilla RUP.',10,8,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','SRS y modelo de casos de uso',0,'PLANNED','2026-06-04 15:49:27.782','2026-06-04 15:49:27.782'),('19fc62e7-a6e7-40b5-a801-1d3990e42d8d','c1ca158e-63b3-43e7-b67f-5322e22d709c','331a5af1-2df5-485a-9b1d-22f14163f0a2','Definir politicas Kanban','Actividad 1 de la plantilla KANBAN.',0,3,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Politicas y WIP',0,'PLANNED','2026-06-04 15:51:37.472','2026-06-04 15:51:37.472'),('26d94a43-57d3-4ba4-8109-02b3964ac5a8','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','f843371b-d61e-44ba-a362-4e5e93fb547f','Integrar y revisar','Actividad 3 de la plantilla XP.',16,5,'5549c648-c88e-4d49-aded-9ab8efbe4b02','PR validado',0,'PLANNED','2026-06-04 15:53:29.870','2026-06-04 15:53:29.870'),('3adf75bd-d37c-48ec-ac7a-d3cc77d47a00','c1ca158e-63b3-43e7-b67f-5322e22d709c','df96ecf7-2241-4875-b915-54b1a1fda86d','Validar y corregir','Actividad 3 de la plantilla KANBAN.',20,5,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Evidencia de pruebas',0,'PLANNED','2026-06-04 15:51:41.212','2026-06-04 15:51:41.212'),('3f3afc6d-68f7-4225-8468-8deff25fc8c9','18f61e93-c621-4828-a0e7-ce19bfebd948','bc032092-9d05-4714-9d9a-861d1a6d2cef','Ejecutar UAT y release','Actividad 5 de la plantilla RUP.',45,10,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Acta de aceptacion y release',0,'PLANNED','2026-06-04 15:49:33.176','2026-06-04 15:49:33.176'),('4fea4b29-0d55-409a-9552-f26024c8150b','f1580f49-7ecc-43da-b7e8-6745a96028a7','cd6aafca-7fcb-4a8f-8517-80bd2b8b2660','Construir producto','Actividad 3 de la plantilla CASCADA.',22,15,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Codigo versionado',0,'PLANNED','2026-06-04 15:52:35.920','2026-06-04 15:52:35.920'),('5487c05a-5014-4eef-a92c-8667f6bf2eb6','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','3dc2b947-d1a6-4449-91ae-cac99ddcdd53','Implementar historias','Actividad 3 de la plantilla SCRUM.',8,12,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Incremento funcional',0,'PLANNED','2026-06-04 15:50:38.782','2026-06-04 15:50:38.782'),('5861f746-fe32-4855-8e36-816a9564d212','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','a3906d5d-b90c-4165-b500-cd168f7a4169','Definir setup personalizado','Actividad 1 de la plantilla CUSTOM.',0,4,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Setup del proyecto',0,'PLANNED','2026-06-04 15:54:19.083','2026-06-04 15:54:19.083'),('64f3b4a7-ebea-45c9-a3b7-0aa4976ff17b','18f61e93-c621-4828-a0e7-ce19bfebd948','26d655ed-749c-4840-b46c-5b388816f6c9','Implementar incrementos','Actividad 4 de la plantilla RUP.',25,15,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Codigo fuente versionado',0,'PLANNED','2026-06-04 15:49:31.424','2026-06-04 15:49:31.424'),('6b427a30-51e2-4a94-8571-75e101bc09a6','18f61e93-c621-4828-a0e7-ce19bfebd948','07055532-58a7-41fe-9aef-1e891852194b','Disenar arquitectura y modelos','Actividad 3 de la plantilla RUP.',15,10,'5549c648-c88e-4d49-aded-9ab8efbe4b02','SAD, clases y secuencias',0,'PLANNED','2026-06-04 15:49:29.624','2026-06-04 15:49:29.624'),('72f1f09d-2b0a-49bc-b917-ffcb25fac2b8','f1580f49-7ecc-43da-b7e8-6745a96028a7','3ff6c32d-7be7-421e-bf9d-328e9388d3d0','Cerrar diseno tecnico','Actividad 2 de la plantilla CASCADA.',10,10,'5549c648-c88e-4d49-aded-9ab8efbe4b02','SAD aprobado',0,'PLANNED','2026-06-04 15:52:34.119','2026-06-04 15:52:34.119'),('81796276-0f25-486a-a6b9-31118672255e','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','f55f0934-9657-47e9-b84e-4940ff73eead','Validar y cerrar','Actividad 3 de la plantilla CUSTOM.',25,4,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Cierre aceptado',0,'PLANNED','2026-06-04 15:54:23.019','2026-06-04 15:54:23.019'),('89f454e0-ab21-4560-9139-d0eae1e9c971','c1ca158e-63b3-43e7-b67f-5322e22d709c','bf0ba1a4-ade0-4853-b69d-66d72beae530','Cerrar y liberar','Actividad 4 de la plantilla KANBAN.',27,2,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9','Linea base y release',0,'PLANNED','2026-06-04 15:51:43.055','2026-06-04 15:51:43.055'),('8a45fdcd-bd4a-4775-ab4a-660f21e7ca06','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','3dc2b947-d1a6-4449-91ae-cac99ddcdd53','Validar incremento','Actividad 4 de la plantilla SCRUM.',18,5,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Evidencia QA',0,'PLANNED','2026-06-04 15:50:40.489','2026-06-04 15:50:40.489'),('8a5ccb87-dfa6-407c-af8d-c762fbb158f2','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','7e91c670-4c25-4b88-913c-f56c17782ab9','Refinar historias','Actividad 1 de la plantilla SCRUM.',0,4,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Historias priorizadas',0,'PLANNED','2026-06-04 15:50:35.274','2026-06-04 15:50:35.274'),('907f5191-6fa1-4df1-b351-cdbdbb39ab3b','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','c40b6115-4a65-4c47-a029-a891915e5d3e','Registrar mejoras','Actividad 5 de la plantilla SCRUM.',25,2,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Acciones de mejora',0,'PLANNED','2026-06-04 15:50:42.607','2026-06-04 15:50:42.607'),('b69ed9f2-c9dd-4666-9c1d-5319952fb9ac','f1580f49-7ecc-43da-b7e8-6745a96028a7','bb536f4b-8795-4f94-9f16-b1c455e95419','Aprobar requisitos','Actividad 1 de la plantilla CASCADA.',0,8,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','SRS aprobado',0,'PLANNED','2026-06-04 15:52:32.311','2026-06-04 15:52:32.311'),('b9b098d4-67ad-447d-bf09-ce18770694ed','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','68e25a60-2d11-4ca0-b4a2-c301706a251e','Ejecutar trabajo planificado','Actividad 2 de la plantilla CUSTOM.',5,15,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Evidencia de trabajo',0,'PLANNED','2026-06-04 15:54:20.823','2026-06-04 15:54:20.823'),('c804cfa1-0fd5-4860-baf5-1f539155400c','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','30a3dae8-9238-4e06-b10f-9da2b0df77d1','Planificar sprint','Actividad 2 de la plantilla SCRUM.',5,2,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Sprint backlog',0,'PLANNED','2026-06-04 15:50:37.050','2026-06-04 15:50:37.050'),('d4dfb78a-805e-4faa-8fa8-fc75cfc59241','f1580f49-7ecc-43da-b7e8-6745a96028a7','102e16d2-3b2b-463e-8a94-ccf5beb4cc87','Probar y liberar','Actividad 4 de la plantilla CASCADA.',40,8,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Release aprobado',0,'PLANNED','2026-06-04 15:52:37.636','2026-06-04 15:52:37.636'),('d5be9a92-9f7c-4e84-b550-2de17ff9f965','c1ca158e-63b3-43e7-b67f-5322e22d709c','52d95205-3336-4aec-8e95-830b98f0bb05','Ejecutar flujo de trabajo','Actividad 2 de la plantilla KANBAN.',5,12,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Items versionados',0,'PLANNED','2026-06-04 15:51:39.333','2026-06-04 15:51:39.333'),('deac92ab-0f7f-4645-9d6c-82fdd78e8d76','18f61e93-c621-4828-a0e7-ce19bfebd948','49c77526-e31c-468d-a8b8-439e4388ac7a','Definir alcance y plan SCM','Actividad 1 de la plantilla RUP.',0,5,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Plan SCM inicial',0,'PLANNED','2026-06-04 15:49:25.695','2026-06-04 15:49:25.695'),('df3fc161-4f79-476d-87fa-7ba1513b73d2','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','16d836b4-7906-4f03-b5af-9fd5a728b2a7','Implementar con pruebas','Actividad 2 de la plantilla XP.',4,10,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Codigo y pruebas',0,'PLANNED','2026-06-04 15:53:28.129','2026-06-04 15:53:28.129'),('ef89ae47-e128-4289-8f54-eb90a11f59d4','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','86ff9be0-dc6b-4bc5-b74b-f1c457eb9935','Liberar iteracion','Actividad 4 de la plantilla XP.',22,2,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Release aceptado',0,'PLANNED','2026-06-04 15:53:31.634','2026-06-04 15:53:31.634');
/*!40000 ALTER TABLE `project_setup_template_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_setup_template_config_items`
--

DROP TABLE IF EXISTS `project_setup_template_config_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_setup_template_config_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `templateId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catalogItemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('CODE','DOCUMENT','SCRIPT','MODEL','CONFIGURATION','OTHER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `libraryType` enum('WORK','INTEGRATION','SUPPORT','MASTER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'WORK',
  `defaultVersion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1.0.0',
  `metadata` text COLLATE utf8mb4_unicode_ci,
  `responsibleRoleId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '1',
  `selected` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_setup_template_config_items_templateId_code_key` (`templateId`,`code`),
  KEY `project_setup_template_config_items_templateId_sortOrder_idx` (`templateId`,`sortOrder`),
  KEY `project_setup_template_config_items_catalogItemId_fkey` (`catalogItemId`),
  KEY `project_setup_template_config_items_responsibleRoleId_fkey` (`responsibleRoleId`),
  CONSTRAINT `project_setup_template_config_items_catalogItemId_fkey` FOREIGN KEY (`catalogItemId`) REFERENCES `configuration_item_catalog` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_template_config_items_responsibleRoleId_fkey` FOREIGN KEY (`responsibleRoleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_template_config_items_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `project_setup_templates` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_setup_template_config_items`
--

LOCK TABLES `project_setup_template_config_items` WRITE;
/*!40000 ALTER TABLE `project_setup_template_config_items` DISABLE KEYS */;
INSERT INTO `project_setup_template_config_items` VALUES ('0036d1aa-d036-477c-bd38-f7e8b5cba124','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','67dad9ec-c248-480d-aef5-c54bb5545948','SCRUM-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,7,NULL,'2026-06-04 15:51:04.851','2026-06-04 15:51:04.851'),('005c2eef-1b73-4140-92e3-d07597f89bac','f1580f49-7ecc-43da-b7e8-6745a96028a7','31d03e4c-3712-4eb5-9340-e02e644d4555','CASCADA-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,6,NULL,'2026-06-04 15:52:56.828','2026-06-04 15:52:56.828'),('104bcdce-8d54-4e2c-9a43-df080f086d44','c1ca158e-63b3-43e7-b67f-5322e22d709c','56470976-9c5b-4a8b-8b7b-b30cebe14cb9','KANBAN-KANBAN-POLICIES','CONFIGURATION','Politicas Kanban','Politicas explicitas, limites WIP y criterios de flujo.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,1,NULL,'2026-06-04 15:51:46.332','2026-06-04 15:51:46.332'),('167d8774-3b79-43e3-b982-1809ab18e3ec','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','2295100b-0f84-4d4b-95a1-87f624f319e2','SCRUM-DOD','CONFIGURATION','Definition of Done','Criterios de terminado del equipo.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,4,NULL,'2026-06-04 15:50:55.274','2026-06-04 15:50:55.274'),('2106f488-649d-44f7-9081-7ab2ced7edf3','c1ca158e-63b3-43e7-b67f-5322e22d709c','698741d9-256d-4dd5-b799-f4c6425e038d','KANBAN-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,8,NULL,'2026-06-04 15:52:08.992','2026-06-04 15:52:08.992'),('2586df28-31e0-4f24-94fd-4afc10ad496f','18f61e93-c621-4828-a0e7-ce19bfebd948','d41c1fed-0117-4ba9-9d71-51b4b730a64d','RUP-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9',1,1,12,NULL,'2026-06-04 15:50:12.121','2026-06-04 15:50:12.121'),('25e4da8f-b0fa-4e41-8302-79e631a23787','18f61e93-c621-4828-a0e7-ce19bfebd948','32c80ef9-837c-4162-9beb-a37e5e7cf010','RUP-SRS','DOCUMENT','Especificacion de requisitos','Requisitos funcionales/no funcionales, reglas y trazabilidad.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,2,NULL,'2026-06-04 15:49:39.449','2026-06-04 15:49:39.449'),('2a73d721-03a4-4b57-beec-9a73ca20d28a','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','92381a18-3007-45a2-95f9-4d20246a1bf5','XP-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,5,NULL,'2026-06-04 15:53:47.846','2026-06-04 15:53:47.846'),('2cc345d8-aa67-4377-93b6-28ea6e2719b1','f1580f49-7ecc-43da-b7e8-6745a96028a7','400e6e2c-316c-4ff7-b1d5-c6ad699f64ad','CASCADA-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,7,NULL,'2026-06-04 15:53:00.012','2026-06-04 15:53:00.012'),('31779e8d-926f-465b-b942-0036490194a2','c1ca158e-63b3-43e7-b67f-5322e22d709c','8579911a-9935-4447-87de-89a01b3a5e44','KANBAN-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,7,NULL,'2026-06-04 15:52:05.789','2026-06-04 15:52:05.789'),('3a467abe-56e9-448f-80b1-82be7e1302a5','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','b8ea685b-6646-4c04-9e3c-74f103d948fc','SCRUM-BURNDOWN','DOCUMENT','Burndown / avance','Seguimiento de avance del sprint.','SUPPORT','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,5,NULL,'2026-06-04 15:50:58.510','2026-06-04 15:50:58.510'),('43e2f321-cbf4-4501-85fb-8669f327bca9','c1ca158e-63b3-43e7-b67f-5322e22d709c','60e810e9-c6e2-4368-8812-894d60c8fe3f','KANBAN-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9',1,1,9,NULL,'2026-06-04 15:52:12.343','2026-06-04 15:52:12.343'),('4a2ed7f9-74c6-498a-998f-4c55806b1861','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','75542d57-e42e-44cd-81d5-c56e1d0c852b','CUSTOM-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,4,NULL,'2026-06-04 15:54:36.003','2026-06-04 15:54:36.003'),('4e44496c-a95c-4715-9500-94a4ff1bd510','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','020022e2-63bb-47c6-afda-46658c5afbdc','SCRUM-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,8,NULL,'2026-06-04 15:51:08.102','2026-06-04 15:51:08.102'),('527bfb31-a0cd-423f-b370-21ef0cb318db','18f61e93-c621-4828-a0e7-ce19bfebd948','93b6830b-9ba0-4e4b-91a3-f01abf89260d','RUP-VISION','DOCUMENT','Documento de vision','Objetivos, alcance, actores y restricciones del producto.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,1,NULL,'2026-06-04 15:49:36.383','2026-06-04 15:49:36.383'),('5383e4f7-424a-4153-bd61-3a191e78791a','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','2f2f5550-9f90-4fa0-8941-ac1bdfd54d9b','SCRUM-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9',1,1,10,NULL,'2026-06-04 15:51:14.434','2026-06-04 15:51:14.434'),('5972bc40-cdc9-4d2f-ac96-e0bf1c2a6608','18f61e93-c621-4828-a0e7-ce19bfebd948','628476cd-9edb-43e4-88f3-ceaeddfc5c24','RUP-UAT','DOCUMENT','Evidencia UAT','Pruebas de aceptacion y acta firmada.','MASTER','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,13,NULL,'2026-06-04 15:50:15.490','2026-06-04 15:50:15.490'),('5ec21fc3-74e4-4af9-9979-31e2a61f204c','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','900bc2cf-cd47-4295-923f-188298aa6821','CUSTOM-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,5,NULL,'2026-06-04 15:54:39.105','2026-06-04 15:54:39.105'),('5f49cf15-476d-478f-b7fe-350f0d308d67','18f61e93-c621-4828-a0e7-ce19bfebd948','6707ca9b-576b-4c20-a87a-894bc39fb923','RUP-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,11,NULL,'2026-06-04 15:50:08.844','2026-06-04 15:50:08.844'),('5fd79e5d-ca24-44de-93b4-70d3dfefcebd','18f61e93-c621-4828-a0e7-ce19bfebd948','97ca70f4-bf32-4bfc-b3d4-85731fe88bfd','RUP-SAD','DOCUMENT','Documento de arquitectura','Componentes, decisiones tecnicas y vistas arquitectonicas.','WORK','1.0.0',NULL,'5549c648-c88e-4d49-aded-9ab8efbe4b02',1,1,4,NULL,'2026-06-04 15:49:45.946','2026-06-04 15:49:45.946'),('70491705-1e2b-4b20-b304-3e196ccd0d84','f1580f49-7ecc-43da-b7e8-6745a96028a7','4046d524-0ee4-4557-8cb3-74a27bff6a77','CASCADA-DESIGN-MODELS','MODEL','Modelos de diseno','Modelos UML, datos e interfaces.','WORK','1.0.0',NULL,'5549c648-c88e-4d49-aded-9ab8efbe4b02',1,1,3,NULL,'2026-06-04 15:52:47.157','2026-06-04 15:52:47.157'),('71450441-7a40-41fc-a684-d692679d0cfd','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','eb62b6f4-81ce-45e1-a1ca-ce7194304dee','CUSTOM-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,6,NULL,'2026-06-04 15:54:42.364','2026-06-04 15:54:42.364'),('72d34cd8-6530-4796-b110-9ceaa63bc1ea','18f61e93-c621-4828-a0e7-ce19bfebd948','7fa0cef7-e560-4afb-a7c9-6dbead70f681','RUP-CLASS-DIAGRAM','MODEL','Diagrama de clases','Modelo de clases y relaciones principales.','WORK','1.0.0',NULL,'5549c648-c88e-4d49-aded-9ab8efbe4b02',1,1,5,NULL,'2026-06-04 15:49:49.112','2026-06-04 15:49:49.112'),('7512cf80-274e-4d2a-acc1-aae4a55dc40f','f1580f49-7ecc-43da-b7e8-6745a96028a7','50b547f1-530b-4836-bc61-d66a87dda09a','CASCADA-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,8,NULL,'2026-06-04 15:53:03.403','2026-06-04 15:53:03.403'),('777bcc90-1e62-4eea-953f-81a5817f47d5','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','4beb234c-2eb1-4967-9296-dad99bd57fb8','XP-RELEASE-PLAN','DOCUMENT','Release plan','Iteraciones, alcance y prioridades.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,2,NULL,'2026-06-04 15:53:38.130','2026-06-04 15:53:38.130'),('787ea2b3-d746-4b19-86c6-bdb62ddb4da9','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','b1ce2304-c0ba-4b5e-9718-79c596413ce1','SCRUM-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,6,NULL,'2026-06-04 15:51:01.706','2026-06-04 15:51:01.706'),('7902e383-69c8-476d-81f6-da58b3f61598','c1ca158e-63b3-43e7-b67f-5322e22d709c','80788a8c-8265-45c0-8027-80ac2480f1d6','KANBAN-FLOW-METRICS','DOCUMENT','Metricas de flujo','Lead time, cycle time, throughput y bloqueos.','SUPPORT','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,3,NULL,'2026-06-04 15:51:52.747','2026-06-04 15:51:52.747'),('7cd26415-d59d-4bd9-a40b-5f4a8f056ae6','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','02b761d9-b45a-474e-95e1-0f6889cdad47','CUSTOM-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9',1,1,8,NULL,'2026-06-04 15:54:48.917','2026-06-04 15:54:48.917'),('7d83d260-e124-4c41-b291-d35cd56a60a3','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','e3f27d6a-b989-4b0b-8d7e-cb166be7a80a','XP-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,6,NULL,'2026-06-04 15:53:50.989','2026-06-04 15:53:50.989'),('8343f04d-61f5-4929-ab8f-261ad1b898d6','f1580f49-7ecc-43da-b7e8-6745a96028a7','4c9b81f8-c71c-4479-a623-15641cacbce1','CASCADA-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9',1,1,9,NULL,'2026-06-04 15:53:06.781','2026-06-04 15:53:06.781'),('87f86616-bf22-436e-971e-ed17b8d7b434','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','8d662658-3b30-4056-806c-66db40665789','CUSTOM-REQUIREMENTS','DOCUMENT','Requisitos','Requisitos y criterios definidos por el equipo.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,2,NULL,'2026-06-04 15:54:29.532','2026-06-04 15:54:29.532'),('8c53c827-5db4-424a-a44c-87a4539bf6f5','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','9afaff21-b1b8-46d9-a7db-d894de031486','XP-PAIRING-NOTES','DOCUMENT','Notas de pairing','Registro de decisiones y aprendizaje tecnico.','SUPPORT','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',0,1,4,NULL,'2026-06-04 15:53:44.692','2026-06-04 15:53:44.692'),('8da19575-bb8e-4b72-955b-55dbd4f21b12','c1ca158e-63b3-43e7-b67f-5322e22d709c','dc81115a-7f6b-405c-8f3b-af192d9e7d84','KANBAN-BLOCKERS','DOCUMENT','Registro de bloqueos','Bloqueos y acciones de desbloqueo.','SUPPORT','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,4,NULL,'2026-06-04 15:51:55.959','2026-06-04 15:51:55.959'),('8e73c099-298c-47f9-9bcb-cb82365a9e88','f1580f49-7ecc-43da-b7e8-6745a96028a7','01eee506-2cbb-4d3d-8394-b21f0e1b0f22','CASCADA-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,5,NULL,'2026-06-04 15:52:53.521','2026-06-04 15:52:53.521'),('92a8185a-9559-4002-a736-7f9d31af8e4d','18f61e93-c621-4828-a0e7-ce19bfebd948','2f561bf8-6ec0-4401-ad36-cbf169bf07ab','RUP-USE-CASE','MODEL','Modelo de casos de uso','Diagramas y narrativas de casos de uso.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,3,NULL,'2026-06-04 15:49:42.745','2026-06-04 15:49:42.745'),('946dac0f-8425-48bb-9471-8e38d10317e1','f1580f49-7ecc-43da-b7e8-6745a96028a7','cd2ff961-9189-4154-abbf-37fbaf5c3302','CASCADA-DEPLOYMENT-PLAN','DOCUMENT','Plan de despliegue','Pasos, responsables y contingencia.','MASTER','1.0.0',NULL,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9',1,1,4,NULL,'2026-06-04 15:52:50.334','2026-06-04 15:52:50.334'),('9b011bd4-73fc-45b3-8ec6-a5ec2085205e','c1ca158e-63b3-43e7-b67f-5322e22d709c','84e4b409-19e5-49f7-bd8c-6398d5ae352d','KANBAN-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,6,NULL,'2026-06-04 15:52:02.413','2026-06-04 15:52:02.413'),('a07827ee-910d-4e6a-806e-9103dbab0509','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','51cf37a9-4bcd-46e8-932e-bc41a7eac05f','XP-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,8,NULL,'2026-06-04 15:53:57.696','2026-06-04 15:53:57.696'),('a9a00d7f-8e2b-4a93-affd-43d1fa3bbb0c','c1ca158e-63b3-43e7-b67f-5322e22d709c','4fd93455-e53c-484f-8eb3-72e82063284b','KANBAN-BOARD','CONFIGURATION','Tablero Kanban','Columnas, estados y reglas del tablero.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,2,NULL,'2026-06-04 15:51:49.609','2026-06-04 15:51:49.609'),('aed0f669-996f-467a-b53f-ee46bc3cfedf','18f61e93-c621-4828-a0e7-ce19bfebd948','64194157-a66e-474c-bbc1-5a072500508b','RUP-DB-MODEL','MODEL','Modelo de datos','Modelo logico/fisico de datos y restricciones.','WORK','1.0.0',NULL,'5549c648-c88e-4d49-aded-9ab8efbe4b02',1,1,7,NULL,'2026-06-04 15:49:55.493','2026-06-04 15:49:55.493'),('bd2dca49-b75e-4f9e-8b37-da464b257f81','f1580f49-7ecc-43da-b7e8-6745a96028a7','708cae56-3230-4738-8a45-ba766dbed2a9','CASCADA-SAD','DOCUMENT','Diseno de arquitectura','Arquitectura, componentes e interfaces.','WORK','1.0.0',NULL,'5549c648-c88e-4d49-aded-9ab8efbe4b02',1,1,2,NULL,'2026-06-04 15:52:44.012','2026-06-04 15:52:44.012'),('c0e6a205-f146-4c81-9844-88015a9e2836','18f61e93-c621-4828-a0e7-ce19bfebd948','6be9669b-6a5c-4d8b-b7ab-aab0a14569a2','RUP-BUILD','SCRIPT','Script de build','Scripts para compilar, empaquetar o ejecutar pipelines.','INTEGRATION','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,9,NULL,'2026-06-04 15:50:02.290','2026-06-04 15:50:02.290'),('c3f6ec73-c4c2-402d-bd2b-d542844c8394','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','1b5c6acd-6f59-41e8-96e8-08e0eaf721a6','XP-UNIT-TESTS','CODE','Pruebas unitarias','Pruebas automatizadas del incremento.','WORK','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,3,NULL,'2026-06-04 15:53:41.433','2026-06-04 15:53:41.433'),('c4d1fb1e-c122-49cb-b7fd-ded0a4b54fec','18f61e93-c621-4828-a0e7-ce19bfebd948','68f8b40e-37bf-4bfa-9f60-6224a7a432f2','RUP-SEQUENCE-DIAGRAM','MODEL','Diagramas de secuencia','Interacciones de escenarios clave.','WORK','1.0.0',NULL,'5549c648-c88e-4d49-aded-9ab8efbe4b02',1,1,6,NULL,'2026-06-04 15:49:52.340','2026-06-04 15:49:52.340'),('d0b436ef-46d8-4c0d-9aa1-ae3c4f562d35','18f61e93-c621-4828-a0e7-ce19bfebd948','2ded3c51-f2db-45fc-ab0a-1b22d9a003c7','RUP-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,10,NULL,'2026-06-04 15:50:05.567','2026-06-04 15:50:05.567'),('d1653c7e-3e19-492b-a43a-1fab5358b5e3','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','54ed5993-5925-437f-b70f-ef97b58e1404','SCRUM-SPRINT-BACKLOG','DOCUMENT','Sprint Backlog','Items comprometidos, capacidad y objetivo del sprint.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,2,NULL,'2026-06-04 15:50:48.977','2026-06-04 15:50:48.977'),('db9cc094-4340-4538-b8a7-757d1a0f707c','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','ad9baf23-27ad-4149-9010-24bd6477ff45','SCRUM-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,9,NULL,'2026-06-04 15:51:11.291','2026-06-04 15:51:11.291'),('df7460d7-a202-454d-97f5-3212d7c24340','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','23fa82ef-574b-497b-8eb9-f2dfa0318d22','SCRUM-RETRO','DOCUMENT','Retrospectiva','Lecciones y acciones de mejora.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,11,NULL,'2026-06-04 15:51:17.659','2026-06-04 15:51:17.659'),('e0e5ee2f-4c0d-42bd-8787-25294a8d4043','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','4a77475c-54b6-40a7-aad6-4e86ef3f22de','XP-RELEASE-NOTES','DOCUMENT','Notas de version','Resumen de cambios, riesgos y compatibilidad de la entrega.','MASTER','1.0.0',NULL,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9',1,1,9,NULL,'2026-06-04 15:54:00.902','2026-06-04 15:54:00.902'),('e23179d2-0677-4e7e-a91a-f6929cd3deac','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','b0950aca-9e8f-4ea2-bcfe-451b36880a72','SCRUM-PRODUCT-BACKLOG','DOCUMENT','Product Backlog','Lista priorizada de epicas, features e historias.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,1,NULL,'2026-06-04 15:50:45.780','2026-06-04 15:50:45.780'),('e4e54976-4828-40ff-a529-9913cd5ca877','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','016d58b5-d260-463b-a858-e5489a32ac7e','XP-USER-STORIES','DOCUMENT','Historias XP','Historias, valores y criterios de aceptacion.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,1,NULL,'2026-06-04 15:53:34.880','2026-06-04 15:53:34.880'),('ea5d1a0f-7225-41d3-a956-8b20498bc27d','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','39b88931-a37f-4e48-8979-76d8c5bbf661','XP-TEST-PLAN','DOCUMENT','Plan de pruebas','Estrategia, alcance y criterios de pruebas.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,7,NULL,'2026-06-04 15:53:54.501','2026-06-04 15:53:54.501'),('ec105fa8-c75e-4e85-9ce5-b5666287de5c','c1ca158e-63b3-43e7-b67f-5322e22d709c','55f2f13b-464d-4844-ba8e-967991fab4bf','KANBAN-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,5,NULL,'2026-06-04 15:51:59.235','2026-06-04 15:51:59.235'),('ec6e0ca9-eee6-4f64-ae68-ed389ada7904','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','1431b5e6-5c02-4c56-9922-a25e3510ed18','SCRUM-USER-STORIES','DOCUMENT','Historias de usuario','Historias con criterios de aceptacion y estimacion.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,3,NULL,'2026-06-04 15:50:52.125','2026-06-04 15:50:52.125'),('ed2fdcc7-0879-42e6-aff2-e2d4ddc7a402','f1580f49-7ecc-43da-b7e8-6745a96028a7','bc957373-1364-4e9b-8084-f5d289c637c9','CASCADA-SRS','DOCUMENT','Especificacion de requisitos','Requisitos completos y aprobados.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,1,NULL,'2026-06-04 15:52:40.811','2026-06-04 15:52:40.811'),('ee682827-4b4a-4180-aa5e-df43274a3468','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','6794f6e6-d94b-480b-a82f-7a346388f305','CUSTOM-TEST-CASES','DOCUMENT','Casos de prueba','Casos funcionales, integracion, regresion y aceptacion.','SUPPORT','1.0.0',NULL,'896b05d4-6ec8-4595-b695-afb2b4aa3216',1,1,7,NULL,'2026-06-04 15:54:45.539','2026-06-04 15:54:45.539'),('f5bbf0de-56ea-4a2c-8c0e-da99b0e8dd7c','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','cc38b5a5-7a7e-46f0-a5f9-a581644eb02f','CUSTOM-ARCHITECTURE','DOCUMENT','Arquitectura','Diseno tecnico segun el proyecto.','WORK','1.0.0',NULL,'5549c648-c88e-4d49-aded-9ab8efbe4b02',1,1,3,NULL,'2026-06-04 15:54:32.929','2026-06-04 15:54:32.929'),('fed058b4-a53b-4eff-9cb2-030995b2f283','18f61e93-c621-4828-a0e7-ce19bfebd948','5f9cdb2d-f2d2-4729-b91d-d1dba4a496f4','RUP-SRC','CODE','Codigo fuente','Codigo fuente principal del producto.','WORK','1.0.0',NULL,'6eefe5a7-7376-4c40-807f-bae1d94ac94b',1,1,8,NULL,'2026-06-04 15:49:58.773','2026-06-04 15:49:58.773'),('ff1bfcd1-20d9-4d59-bd28-b1b83a9ace36','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','426214d6-3577-4f85-b08f-bf8c410392e0','CUSTOM-PLAN','DOCUMENT','Plan del proyecto','Cronograma, alcance y responsables.','WORK','1.0.0',NULL,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a',1,1,1,NULL,'2026-06-04 15:54:26.267','2026-06-04 15:54:26.267');
/*!40000 ALTER TABLE `project_setup_template_config_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_setup_template_members`
--

DROP TABLE IF EXISTS `project_setup_template_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_setup_template_members` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `templateId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `defaultUserId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roleNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `allocationHours` int DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_setup_template_members_templateId_roleId_key` (`templateId`,`roleId`),
  KEY `project_setup_template_members_templateId_sortOrder_idx` (`templateId`,`sortOrder`),
  KEY `project_setup_template_members_roleId_fkey` (`roleId`),
  KEY `project_setup_template_members_defaultUserId_fkey` (`defaultUserId`),
  CONSTRAINT `project_setup_template_members_defaultUserId_fkey` FOREIGN KEY (`defaultUserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_template_members_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_setup_template_members_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `project_setup_templates` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_setup_template_members`
--

LOCK TABLES `project_setup_template_members` WRITE;
/*!40000 ALTER TABLE `project_setup_template_members` DISABLE KEYS */;
INSERT INTO `project_setup_template_members` VALUES ('003fe79f-ca4a-4948-b6d2-87bd78a82019','c1ca158e-63b3-43e7-b67f-5322e22d709c','e98cf7c8-de6b-490e-bdc7-e7c83a358faa',NULL,'Rol sugerido para proyectos KANBAN.',NULL,6,1,'2026-06-04 15:52:22.210','2026-06-04 15:52:22.210'),('028aae75-d3b2-4049-a919-e8d4408225d1','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','5549c648-c88e-4d49-aded-9ab8efbe4b02',NULL,'Rol sugerido para proyectos XP.',NULL,2,1,'2026-06-04 15:54:04.270','2026-06-04 15:54:04.270'),('0890ab02-f17a-4756-a8ab-4f569f868975','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','47bad1e1-fb9a-4aa5-8419-b0a585238f7a',NULL,'Rol sugerido para proyectos XP.',NULL,1,1,'2026-06-04 15:54:02.610','2026-06-04 15:54:02.610'),('0a8e7b34-5e54-4b0c-ab25-917af5572608','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','6eefe5a7-7376-4c40-807f-bae1d94ac94b',NULL,'Rol sugerido para proyectos CUSTOM.',NULL,4,1,'2026-06-04 15:54:55.983','2026-06-04 15:54:55.983'),('0cbd33c6-c97f-4c8e-95ef-77d3da8cfca8','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','e98cf7c8-de6b-490e-bdc7-e7c83a358faa',NULL,'Rol sugerido para proyectos SCRUM.',NULL,6,1,'2026-06-04 15:51:27.573','2026-06-04 15:51:27.573'),('0f6cbf4e-a433-4226-8a40-433ffb05c834','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','5549c648-c88e-4d49-aded-9ab8efbe4b02',NULL,'Rol sugerido para proyectos SCRUM.',NULL,2,1,'2026-06-04 15:51:20.834','2026-06-04 15:51:20.834'),('14f0457e-b987-4afc-85ad-278fc8ea581b','c1ca158e-63b3-43e7-b67f-5322e22d709c','cb44a58c-e674-4c44-8b44-d91a0bbb46b9',NULL,'Rol sugerido para proyectos KANBAN.',NULL,3,1,'2026-06-04 15:52:17.156','2026-06-04 15:52:17.156'),('23ce55fe-f12e-478a-9287-f662ab231542','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','896b05d4-6ec8-4595-b695-afb2b4aa3216',NULL,'Rol sugerido para proyectos XP.',NULL,5,1,'2026-06-04 15:54:09.140','2026-06-04 15:54:09.140'),('253690a2-7827-4a54-be9c-e32eff5c86ad','c1ca158e-63b3-43e7-b67f-5322e22d709c','47bad1e1-fb9a-4aa5-8419-b0a585238f7a',NULL,'Rol sugerido para proyectos KANBAN.',NULL,1,1,'2026-06-04 15:52:13.951','2026-06-04 15:52:13.951'),('2635ad3d-2168-42b9-a2c1-49fd4732af39','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','6eefe5a7-7376-4c40-807f-bae1d94ac94b',NULL,'Rol sugerido para proyectos XP.',NULL,4,1,'2026-06-04 15:54:07.595','2026-06-04 15:54:07.595'),('36435583-2480-4a25-aeb4-c60ca8d1c266','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','896b05d4-6ec8-4595-b695-afb2b4aa3216',NULL,'Rol sugerido para proyectos SCRUM.',NULL,5,1,'2026-06-04 15:51:25.954','2026-06-04 15:51:25.954'),('393836d3-c8c0-4254-98a4-ac6400cd9642','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','47bad1e1-fb9a-4aa5-8419-b0a585238f7a',NULL,'Rol sugerido para proyectos CUSTOM.',NULL,1,1,'2026-06-04 15:54:50.556','2026-06-04 15:54:50.556'),('3a82eab0-93f0-47a0-b080-e936e3eeb025','f1580f49-7ecc-43da-b7e8-6745a96028a7','cb44a58c-e674-4c44-8b44-d91a0bbb46b9',NULL,'Rol sugerido para proyectos CASCADA.',NULL,3,1,'2026-06-04 15:53:11.461','2026-06-04 15:53:11.461'),('40f3a056-1bd2-46e0-a5d0-f97ecfc7abbe','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','47bad1e1-fb9a-4aa5-8419-b0a585238f7a',NULL,'Rol sugerido para proyectos SCRUM.',NULL,1,1,'2026-06-04 15:51:19.224','2026-06-04 15:51:19.224'),('4608dc63-991e-44ca-b000-6c8c3571744e','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','e98cf7c8-de6b-490e-bdc7-e7c83a358faa',NULL,'Rol sugerido para proyectos CUSTOM.',NULL,6,1,'2026-06-04 15:54:59.189','2026-06-04 15:54:59.189'),('4ab3c6bd-9677-44e2-8f09-37c8f41bb744','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','cb44a58c-e674-4c44-8b44-d91a0bbb46b9',NULL,'Rol sugerido para proyectos XP.',NULL,3,1,'2026-06-04 15:54:05.970','2026-06-04 15:54:05.970'),('556b9dae-dde3-4879-9c5b-c254c24fbd19','18f61e93-c621-4828-a0e7-ce19bfebd948','cb44a58c-e674-4c44-8b44-d91a0bbb46b9',NULL,'Rol sugerido para proyectos RUP.',NULL,3,1,'2026-06-04 15:50:20.415','2026-06-04 15:50:20.415'),('5ae334fa-78e8-4001-8cef-d23b75376a9a','f1580f49-7ecc-43da-b7e8-6745a96028a7','e98cf7c8-de6b-490e-bdc7-e7c83a358faa',NULL,'Rol sugerido para proyectos CASCADA.',NULL,6,1,'2026-06-04 15:53:16.345','2026-06-04 15:53:16.345'),('675b64d5-e60b-4c85-9987-9b36580ed6cb','f1580f49-7ecc-43da-b7e8-6745a96028a7','47bad1e1-fb9a-4aa5-8419-b0a585238f7a',NULL,'Rol sugerido para proyectos CASCADA.',NULL,1,1,'2026-06-04 15:53:08.308','2026-06-04 15:53:08.308'),('794c420e-f79a-471b-9bff-c6fcc936abe8','18f61e93-c621-4828-a0e7-ce19bfebd948','47bad1e1-fb9a-4aa5-8419-b0a585238f7a',NULL,'Rol sugerido para proyectos RUP.',NULL,1,1,'2026-06-04 15:50:17.068','2026-06-04 15:50:17.068'),('8712fcd1-01ae-4ed8-8e7e-aa26822268c5','18f61e93-c621-4828-a0e7-ce19bfebd948','e98cf7c8-de6b-490e-bdc7-e7c83a358faa',NULL,'Rol sugerido para proyectos RUP.',NULL,6,1,'2026-06-04 15:50:25.434','2026-06-04 15:50:25.434'),('89ea6510-7544-4150-ab44-8991f4cf639f','c1ca158e-63b3-43e7-b67f-5322e22d709c','5549c648-c88e-4d49-aded-9ab8efbe4b02',NULL,'Rol sugerido para proyectos KANBAN.',NULL,2,1,'2026-06-04 15:52:15.537','2026-06-04 15:52:15.537'),('8b6a6194-52b7-4f51-b283-9763b0e93252','18f61e93-c621-4828-a0e7-ce19bfebd948','6eefe5a7-7376-4c40-807f-bae1d94ac94b',NULL,'Rol sugerido para proyectos RUP.',NULL,4,1,'2026-06-04 15:50:22.138','2026-06-04 15:50:22.138'),('8f734f94-e261-4d66-9176-71364b7c59a1','18f61e93-c621-4828-a0e7-ce19bfebd948','5549c648-c88e-4d49-aded-9ab8efbe4b02',NULL,'Rol sugerido para proyectos RUP.',NULL,2,1,'2026-06-04 15:50:18.778','2026-06-04 15:50:18.778'),('99bd7f92-e7a3-41dc-b704-d28623fce1ff','c1ca158e-63b3-43e7-b67f-5322e22d709c','896b05d4-6ec8-4595-b695-afb2b4aa3216',NULL,'Rol sugerido para proyectos KANBAN.',NULL,5,1,'2026-06-04 15:52:20.433','2026-06-04 15:52:20.433'),('9ffa5624-bd50-44aa-897f-c1ffc718fa17','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','cb44a58c-e674-4c44-8b44-d91a0bbb46b9',NULL,'Rol sugerido para proyectos SCRUM.',NULL,3,1,'2026-06-04 15:51:22.575','2026-06-04 15:51:22.575'),('a4535ee6-1abd-4f19-b428-692b3cb97a2f','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','896b05d4-6ec8-4595-b695-afb2b4aa3216',NULL,'Rol sugerido para proyectos CUSTOM.',NULL,5,1,'2026-06-04 15:54:57.622','2026-06-04 15:54:57.622'),('aaf4c8f2-3be7-4f30-bdd3-83657333f066','f1580f49-7ecc-43da-b7e8-6745a96028a7','5549c648-c88e-4d49-aded-9ab8efbe4b02',NULL,'Rol sugerido para proyectos CASCADA.',NULL,2,1,'2026-06-04 15:53:09.873','2026-06-04 15:53:09.873'),('aee243e0-25a5-48c5-8600-f5be0f598d65','c1ca158e-63b3-43e7-b67f-5322e22d709c','6eefe5a7-7376-4c40-807f-bae1d94ac94b',NULL,'Rol sugerido para proyectos KANBAN.',NULL,4,1,'2026-06-04 15:52:18.783','2026-06-04 15:52:18.783'),('afc25adc-7b27-4d70-9110-088de4ddfd1d','f1580f49-7ecc-43da-b7e8-6745a96028a7','896b05d4-6ec8-4595-b695-afb2b4aa3216',NULL,'Rol sugerido para proyectos CASCADA.',NULL,5,1,'2026-06-04 15:53:14.714','2026-06-04 15:53:14.714'),('b16bf214-318b-4460-928c-7b78a0dadb68','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','e98cf7c8-de6b-490e-bdc7-e7c83a358faa',NULL,'Rol sugerido para proyectos XP.',NULL,6,1,'2026-06-04 15:54:10.788','2026-06-04 15:54:10.788'),('d1ef14c2-1cf5-4b30-9c10-fea36d3c6628','18f61e93-c621-4828-a0e7-ce19bfebd948','896b05d4-6ec8-4595-b695-afb2b4aa3216',NULL,'Rol sugerido para proyectos RUP.',NULL,5,1,'2026-06-04 15:50:23.740','2026-06-04 15:50:23.740'),('d9fb05bf-45de-4c2a-bc07-196b00367e9b','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','cb44a58c-e674-4c44-8b44-d91a0bbb46b9',NULL,'Rol sugerido para proyectos CUSTOM.',NULL,3,1,'2026-06-04 15:54:54.260','2026-06-04 15:54:54.260'),('e37e45d8-c86b-4ac8-a4c7-ddad18fc3416','f1580f49-7ecc-43da-b7e8-6745a96028a7','6eefe5a7-7376-4c40-807f-bae1d94ac94b',NULL,'Rol sugerido para proyectos CASCADA.',NULL,4,1,'2026-06-04 15:53:13.140','2026-06-04 15:53:13.140'),('f9d44f8d-2ba9-4120-9752-1e8146734bf9','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','5549c648-c88e-4d49-aded-9ab8efbe4b02',NULL,'Rol sugerido para proyectos CUSTOM.',NULL,2,1,'2026-06-04 15:54:52.706','2026-06-04 15:54:52.706'),('fdefc093-aa64-4c51-9a10-888867b4f865','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','6eefe5a7-7376-4c40-807f-bae1d94ac94b',NULL,'Rol sugerido para proyectos SCRUM.',NULL,4,1,'2026-06-04 15:51:24.214','2026-06-04 15:51:24.214');
/*!40000 ALTER TABLE `project_setup_template_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_setup_template_phases`
--

DROP TABLE IF EXISTS `project_setup_template_phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_setup_template_phases` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `templateId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `methodologyType` enum('SCRUM','KANBAN','RUP','CASCADA','XP','CUSTOM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `startOffsetDays` int NOT NULL DEFAULT '0',
  `durationDays` int NOT NULL DEFAULT '1',
  `ownerRoleId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requiredDeliverables` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `acceptanceCriteria` text COLLATE utf8mb4_unicode_ci,
  `status` enum('PENDING','IN_PROGRESS','DONE','BLOCKED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_setup_template_phases_templateId_name_key` (`templateId`,`name`),
  KEY `project_setup_template_phases_templateId_sortOrder_idx` (`templateId`,`sortOrder`),
  KEY `project_setup_template_phases_ownerRoleId_fkey` (`ownerRoleId`),
  CONSTRAINT `project_setup_template_phases_ownerRoleId_fkey` FOREIGN KEY (`ownerRoleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_template_phases_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `project_setup_templates` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_setup_template_phases`
--

LOCK TABLES `project_setup_template_phases` WRITE;
/*!40000 ALTER TABLE `project_setup_template_phases` DISABLE KEYS */;
INSERT INTO `project_setup_template_phases` VALUES ('07055532-58a7-41fe-9aef-1e891852194b','18f61e93-c621-4828-a0e7-ce19bfebd948','Elaboracion','RUP',2,10,15,'5549c648-c88e-4d49-aded-9ab8efbe4b02','SRS; casos de uso; SAD; modelos UML.','Arquitectura y requisitos versionados como ECS.','PENDING','2026-06-04 15:49:20.681','2026-06-04 15:49:20.681'),('0d8d6a92-98ea-4982-8f5a-a5ab38cfc97b','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','Planificacion','XP',1,0,4,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Historias, release plan y criterios.','Historias listas para iteracion.','PENDING','2026-06-04 15:53:19.656','2026-06-04 15:53:19.656'),('102e16d2-3b2b-463e-8a94-ccf5beb4cc87','f1580f49-7ecc-43da-b7e8-6745a96028a7','Pruebas y despliegue','CASCADA',4,40,10,'896b05d4-6ec8-4595-b695-afb2b4aa3216','QA, UAT, release y cierre.','Producto probado y desplegado.','PENDING','2026-06-04 15:52:30.468','2026-06-04 15:52:30.468'),('16d836b4-7906-4f03-b5af-9fd5a728b2a7','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','Iteracion','XP',2,4,12,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Tareas, pares, pruebas y commits.','Trabajo probado continuamente.','PENDING','2026-06-04 15:53:21.465','2026-06-04 15:53:21.465'),('26d655ed-749c-4840-b46c-5b388816f6c9','18f61e93-c621-4828-a0e7-ce19bfebd948','Construccion','RUP',3,25,20,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Incrementos; pruebas unitarias; ramas; lineas base.','Incrementos versionados y listos para QA.','PENDING','2026-06-04 15:49:22.276','2026-06-04 15:49:22.276'),('30a3dae8-9238-4e06-b10f-9da2b0df77d1','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','Sprint Planning','SCRUM',2,5,3,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Sprint, objetivo, capacidad y compromiso.','Sprint planificado con responsables.','PENDING','2026-06-04 15:50:30.364','2026-06-04 15:50:30.364'),('331a5af1-2df5-485a-9b1d-22f14163f0a2','c1ca158e-63b3-43e7-b67f-5322e22d709c','Entrada','KANBAN',1,0,5,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Backlog, politicas y criterios de preparado.','Items listos para flujo.','PENDING','2026-06-04 15:51:30.748','2026-06-04 15:51:30.748'),('3dc2b947-d1a6-4449-91ae-cac99ddcdd53','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','Ejecucion y Review','SCRUM',3,8,17,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Incremento, PRs, pruebas y demo.','Incremento probado y revisado.','PENDING','2026-06-04 15:50:31.917','2026-06-04 15:50:31.917'),('3ff6c32d-7be7-421e-bf9d-328e9388d3d0','f1580f49-7ecc-43da-b7e8-6745a96028a7','Diseno','CASCADA',2,10,12,'5549c648-c88e-4d49-aded-9ab8efbe4b02','SAD, modelos y plan de pruebas.','Diseno completo y aprobado.','PENDING','2026-06-04 15:52:27.191','2026-06-04 15:52:27.191'),('49c77526-e31c-468d-a8b8-439e4388ac7a','18f61e93-c621-4828-a0e7-ce19bfebd948','Inicio','RUP',1,0,10,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Vision; alcance; caso de negocio; plan SCM inicial.','Alcance, riesgos y responsables aprobados.','PENDING','2026-06-04 15:49:19.135','2026-06-04 15:49:19.135'),('52d95205-3336-4aec-8e95-830b98f0bb05','c1ca158e-63b3-43e7-b67f-5322e22d709c','En progreso','KANBAN',2,5,15,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Trabajo asignado, ramas y reportes.','WIP controlado y visible.','PENDING','2026-06-04 15:51:32.406','2026-06-04 15:51:32.406'),('68e25a60-2d11-4ca0-b4a2-c301706a251e','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','Ejecucion','CUSTOM',2,5,20,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Cambios, pruebas y evidencias.','Trabajo versionado y validado.','PENDING','2026-06-04 15:54:15.576','2026-06-04 15:54:15.576'),('7e91c670-4c25-4b88-913c-f56c17782ab9','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','Product Backlog','SCRUM',1,0,5,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Backlog, epicas, historias y criterios.','Backlog priorizado y listo para planning.','PENDING','2026-06-04 15:50:28.777','2026-06-04 15:50:28.777'),('86ff9be0-dc6b-4bc5-b74b-f1c457eb9935','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','Release','XP',4,22,3,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Version, UAT y cierre.','Release aceptado.','PENDING','2026-06-04 15:53:24.587','2026-06-04 15:53:24.587'),('a3906d5d-b90c-4165-b500-cd168f7a4169','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','Preparacion','CUSTOM',1,0,5,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','Alcance, equipo, cronograma y ECS inicial.','Setup listo para ejecucion.','PENDING','2026-06-04 15:54:13.967','2026-06-04 15:54:13.967'),('bb536f4b-8795-4f94-9f16-b1c455e95419','f1580f49-7ecc-43da-b7e8-6745a96028a7','Requisitos','CASCADA',1,0,10,'47bad1e1-fb9a-4aa5-8419-b0a585238f7a','SRS, alcance y criterios.','Requisitos aprobados.','PENDING','2026-06-04 15:52:25.552','2026-06-04 15:52:25.552'),('bc032092-9d05-4714-9d9a-861d1a6d2cef','18f61e93-c621-4828-a0e7-ce19bfebd948','Transicion','RUP',4,45,15,'896b05d4-6ec8-4595-b695-afb2b4aa3216','UAT; acta de aceptacion; release; cierre.','Entrega aceptada y liberada con trazabilidad.','PENDING','2026-06-04 15:49:23.843','2026-06-04 15:49:23.843'),('bf0ba1a4-ade0-4853-b69d-66d72beae530','c1ca158e-63b3-43e7-b67f-5322e22d709c','Hecho','KANBAN',4,27,3,'cb44a58c-e674-4c44-8b44-d91a0bbb46b9','Release, linea base y cierre.','Entrega cerrada con trazabilidad.','PENDING','2026-06-04 15:51:35.682','2026-06-04 15:51:35.682'),('c40b6115-4a65-4c47-a029-a891915e5d3e','0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','Retrospectiva','SCRUM',4,25,5,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Lecciones y acciones de mejora.','Acciones registradas para siguiente ciclo.','PENDING','2026-06-04 15:50:33.495','2026-06-04 15:50:33.495'),('cd6aafca-7fcb-4a8f-8517-80bd2b8b2660','f1580f49-7ecc-43da-b7e8-6745a96028a7','Implementacion','CASCADA',3,22,18,'6eefe5a7-7376-4c40-807f-bae1d94ac94b','Codigo, scripts y pruebas unitarias.','Implementacion versionada.','PENDING','2026-06-04 15:52:28.794','2026-06-04 15:52:28.794'),('df96ecf7-2241-4875-b915-54b1a1fda86d','c1ca158e-63b3-43e7-b67f-5322e22d709c','Validacion','KANBAN',3,20,7,'896b05d4-6ec8-4595-b695-afb2b4aa3216','PR, pruebas, UAT y evidencias.','Items validados sin defectos criticos.','PENDING','2026-06-04 15:51:34.044','2026-06-04 15:51:34.044'),('f55f0934-9657-47e9-b84e-4940ff73eead','d7fb492d-ba9a-469e-8830-7e1bd3b44b36','Cierre','CUSTOM',3,25,5,'896b05d4-6ec8-4595-b695-afb2b4aa3216','Aceptacion, release y lecciones.','Proyecto cerrado con trazabilidad.','PENDING','2026-06-04 15:54:17.275','2026-06-04 15:54:17.275'),('f843371b-d61e-44ba-a362-4e5e93fb547f','8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','Integracion continua','XP',3,16,6,'5549c648-c88e-4d49-aded-9ab8efbe4b02','Integracion, PR y feedback.','Cambios integrados sin regresiones.','PENDING','2026-06-04 15:53:23.060','2026-06-04 15:53:23.060');
/*!40000 ALTER TABLE `project_setup_template_phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_setup_templates`
--

DROP TABLE IF EXISTS `project_setup_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_setup_templates` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `methodologyType` enum('SCRUM','KANBAN','RUP','CASCADA','XP','CUSTOM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `methodologyNotes` text COLLATE utf8mb4_unicode_ci,
  `plannedDurationDays` int DEFAULT NULL,
  `status` enum('ACTIVE','ARCHIVED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `sourceProjectId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_setup_templates_name_key` (`name`),
  KEY `project_setup_templates_methodologyType_status_idx` (`methodologyType`,`status`),
  KEY `project_setup_templates_sourceProjectId_fkey` (`sourceProjectId`),
  KEY `project_setup_templates_createdById_fkey` (`createdById`),
  KEY `project_setup_templates_updatedById_fkey` (`updatedById`),
  CONSTRAINT `project_setup_templates_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_templates_sourceProjectId_fkey` FOREIGN KEY (`sourceProjectId`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `project_setup_templates_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_setup_templates`
--

LOCK TABLES `project_setup_templates` WRITE;
/*!40000 ALTER TABLE `project_setup_templates` DISABLE KEYS */;
INSERT INTO `project_setup_templates` VALUES ('0a5d726b-206b-4fd5-b5ac-0e4cb77e910f','Plantilla base SCRUM','Cronograma, equipo y ECS base para proyectos SCRUM.','SCRUM','Plantilla inicial reutilizable para metodologia SCRUM.',30,'ACTIVE',NULL,'9665e051-d7e6-4e38-9891-e91e88a65f1c',NULL,'2026-06-04 15:50:27.175','2026-06-04 15:50:27.175'),('18f61e93-c621-4828-a0e7-ce19bfebd948','Plantilla base RUP','Cronograma, equipo y ECS base para proyectos RUP.','RUP','Plantilla inicial reutilizable para metodologia RUP.',60,'ACTIVE',NULL,'9665e051-d7e6-4e38-9891-e91e88a65f1c',NULL,'2026-06-04 15:49:17.575','2026-06-04 15:49:17.575'),('8db4cb3b-3aa5-4ef0-80d4-b48380a56cd5','Plantilla base XP','Cronograma, equipo y ECS base para proyectos XP.','XP','Plantilla inicial reutilizable para metodologia XP.',25,'ACTIVE',NULL,'9665e051-d7e6-4e38-9891-e91e88a65f1c',NULL,'2026-06-04 15:53:17.983','2026-06-04 15:53:17.983'),('c1ca158e-63b3-43e7-b67f-5322e22d709c','Plantilla base KANBAN','Cronograma, equipo y ECS base para proyectos KANBAN.','KANBAN','Plantilla inicial reutilizable para metodologia KANBAN.',30,'ACTIVE',NULL,'9665e051-d7e6-4e38-9891-e91e88a65f1c',NULL,'2026-06-04 15:51:29.136','2026-06-04 15:51:29.136'),('d7fb492d-ba9a-469e-8830-7e1bd3b44b36','Plantilla base CUSTOM','Cronograma, equipo y ECS base para proyectos CUSTOM.','CUSTOM','Plantilla inicial reutilizable para metodologia CUSTOM.',30,'ACTIVE',NULL,'9665e051-d7e6-4e38-9891-e91e88a65f1c',NULL,'2026-06-04 15:54:12.374','2026-06-04 15:54:12.374'),('f1580f49-7ecc-43da-b7e8-6745a96028a7','Plantilla base CASCADA','Cronograma, equipo y ECS base para proyectos CASCADA.','CASCADA','Plantilla inicial reutilizable para metodologia CASCADA.',50,'ACTIVE',NULL,'9665e051-d7e6-4e38-9891-e91e88a65f1c',NULL,'2026-06-04 15:52:23.812','2026-06-04 15:52:23.812');
/*!40000 ALTER TABLE `project_setup_templates` ENABLE KEYS */;
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
  `sourceTemplateMemberId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_users_projectId_userId_key` (`projectId`,`userId`),
  KEY `project_users_userId_fkey` (`userId`),
  KEY `project_users_roleId_fkey` (`roleId`),
  KEY `project_users_sourceTemplateMemberId_fkey` (`sourceTemplateMemberId`),
  CONSTRAINT `project_users_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `project_users_sourceTemplateMemberId_fkey` FOREIGN KEY (`sourceTemplateMemberId`) REFERENCES `project_setup_template_members` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_project_users_prevent_locked_insert_bi` BEFORE INSERT ON `project_users` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el equipo: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_project_users_prevent_locked_update_bu` BEFORE UPDATE ON `project_users` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el equipo: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_project_users_prevent_locked_delete_bd` BEFORE DELETE ON `project_users` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el equipo: el proyecto ya tiene tareas.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `plannedEndDate` datetime(3) DEFAULT NULL,
  `plannedStartDate` datetime(3) DEFAULT NULL,
  `setupCompletedAt` datetime(3) DEFAULT NULL,
  `setupLockReason` enum('FIRST_WORK_ITEM','MANUAL') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `setupLockedAt` datetime(3) DEFAULT NULL,
  `setupLockedById` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `setupStatus` enum('DRAFT','READY','LOCKED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `setupTemplateId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `setupVersion` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_code_key` (`code`),
  KEY `projects_managerId_fkey` (`managerId`),
  KEY `projects_createdById_fkey` (`createdById`),
  KEY `projects_setupStatus_setupLockedAt_idx` (`setupStatus`,`setupLockedAt`),
  KEY `projects_setupTemplateId_idx` (`setupTemplateId`),
  KEY `projects_setupLockedById_fkey` (`setupLockedById`),
  CONSTRAINT `projects_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `projects_setupLockedById_fkey` FOREIGN KEY (`setupLockedById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_setupTemplateId_fkey` FOREIGN KEY (`setupTemplateId`) REFERENCES `project_setup_templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_projects_prevent_setup_update_bu` BEFORE UPDATE ON `projects` FOR EACH ROW BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND OLD.setupLockedAt IS NOT NULL AND (
    NOT (OLD.code <=> NEW.code)
    OR NOT (OLD.name <=> NEW.name)
    OR NOT (OLD.description <=> NEW.description)
    OR NOT (OLD.managerId <=> NEW.managerId)
    OR NOT (OLD.createdById <=> NEW.createdById)
    OR NOT (OLD.githubOwner <=> NEW.githubOwner)
    OR NOT (OLD.githubRepo <=> NEW.githubRepo)
    OR NOT (OLD.methodologyType <=> NEW.methodologyType)
    OR NOT (OLD.methodologyNotes <=> NEW.methodologyNotes)
    OR NOT (OLD.methodologyConfiguredAt <=> NEW.methodologyConfiguredAt)
    OR NOT (OLD.plannedStartDate <=> NEW.plannedStartDate)
    OR NOT (OLD.plannedEndDate <=> NEW.plannedEndDate)
    OR NOT (OLD.setupStatus <=> NEW.setupStatus)
    OR NOT (OLD.setupTemplateId <=> NEW.setupTemplateId)
    OR NOT (OLD.setupCompletedAt <=> NEW.setupCompletedAt)
    OR NOT (OLD.setupLockedAt <=> NEW.setupLockedAt)
    OR NOT (OLD.setupLockedById <=> NEW.setupLockedById)
    OR NOT (OLD.setupLockReason <=> NEW.setupLockReason)
    OR NOT (OLD.setupVersion <=> NEW.setupVersion)
  ) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El setup del proyecto esta bloqueado porque ya existe al menos una tarea.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
INSERT INTO `users` VALUES ('9665e051-d7e6-4e38-9891-e91e88a65f1c','Carlos Daniel','carlosdaniel@gmail.com','$2b$12$h2UEjopfKLYDaOatQzspcOejWf9/WbPoVf0Rn.J7tUswCUzbIWDxO','ACTIVE','dc7d5d28-ce54-409c-9e45-053a69cba584',NULL,NULL,'2026-06-04 16:05:33.245','2026-06-04 14:49:57.549','2026-06-04 16:05:33.766');
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_work_items_lock_project_setup_bi` BEFORE INSERT ON `work_items` FOR EACH ROW BEGIN
  UPDATE projects
  SET
    setupStatus = 'LOCKED',
    setupLockedAt = COALESCE(setupLockedAt, CURRENT_TIMESTAMP(3)),
    setupLockedById = COALESCE(setupLockedById, NEW.createdById),
    setupLockReason = COALESCE(setupLockReason, 'FIRST_WORK_ITEM')
  WHERE id = NEW.projectId
    AND setupLockedAt IS NULL
    AND COALESCE(@sgcsw_skip_setup_lock, 0) <> 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-04 11:45:18
