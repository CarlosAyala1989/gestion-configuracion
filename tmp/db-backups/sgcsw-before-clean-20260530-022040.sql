-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: 149.34.48.176    Database: sgcsw
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.14-MariaDB-0+deb12u2

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
  `id` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) NOT NULL,
  `uatTestId` varchar(36) NOT NULL,
  `signedById` varchar(36) NOT NULL,
  `documentPath` varchar(191) NOT NULL,
  `sha256Hash` char(64) NOT NULL,
  `signedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `acceptance_records_uatTestId_key` (`uatTestId`),
  KEY `acceptance_records_changeRequestId_fkey` (`changeRequestId`),
  KEY `acceptance_records_signedById_fkey` (`signedById`),
  CONSTRAINT `acceptance_records_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `acceptance_records_signedById_fkey` FOREIGN KEY (`signedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `acceptance_records_uatTestId_fkey` FOREIGN KEY (`uatTestId`) REFERENCES `uat_tests` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `ownerType` varchar(191) NOT NULL,
  `ownerId` varchar(191) NOT NULL,
  `fileName` varchar(191) NOT NULL,
  `mimeType` varchar(191) DEFAULT NULL,
  `storagePath` varchar(191) NOT NULL,
  `sha256Hash` char(64) NOT NULL,
  `version` varchar(191) DEFAULT NULL,
  `status` enum('ACTIVE','ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
  `uploadedById` varchar(36) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `attachments_ownerType_ownerId_idx` (`ownerType`,`ownerId`),
  KEY `attachments_projectId_fkey` (`projectId`),
  KEY `attachments_uploadedById_fkey` (`uploadedById`),
  CONSTRAINT `attachments_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `attachments_uploadedById_fkey` FOREIGN KEY (`uploadedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `module` varchar(191) NOT NULL,
  `action` varchar(191) NOT NULL,
  `ip` varchar(191) DEFAULT NULL,
  `previousDetail` text DEFAULT NULL,
  `newDetail` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
INSERT INTO `audit_logs` VALUES ('3d191130-8531-4f47-97b5-5b7364197c0e','42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','seed','initialize','127.0.0.1',NULL,'Seed SGCSW ejecutado con roles, permisos, usuarios, proyecto, bibliotecas, ECS, incidencia y solicitud.','2026-05-28 23:26:56.993'),('3fe74b01-c565-4e94-9be2-41316f6fba33','42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','integridad','ok',NULL,NULL,'{\"itemId\":\"fd70d2ff-53c9-4b76-9ee4-6a33873d047b\"}','2026-05-30 07:11:01.185'),('73a62c4a-b836-4a06-9b57-916ac9f475f9','42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','usuarios','create',NULL,NULL,'{\"id\":\"89c7d1e2-f4b7-487b-8c45-0a453323af51\",\"email\":\"carlosdaniel@gmail.com\"}','2026-05-29 00:13:04.523'),('d368ea7e-a2c6-4466-b31a-c52d9eabfa89','42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','proyectos','create',NULL,NULL,'{\"id\":\"3b4f6701-a544-4447-b2aa-01264cdc773e\",\"code\":\"29211828138123\",\"name\":\"Py-Nuevo\",\"description\":\"Nuevo Py\",\"status\":\"ACTIVE\",\"managerId\":\"16647f38-584a-4ba8-92ee-b8bcb910d0af\",\"createdById\":\"42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b\",\"githubOwner\":\"CarlosAyala1989\",\"githubRepo\":\"hola\",\"createdAt\":\"2026-05-29T00:21:52.932Z\",\"updatedAt\":\"2026-05-29T00:21:52.932Z\",\"closedAt\":null}','2026-05-29 00:21:54.094');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baseline_items`
--

DROP TABLE IF EXISTS `baseline_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baseline_items` (
  `id` varchar(36) NOT NULL,
  `baselineId` varchar(36) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  `itemVersionId` varchar(36) NOT NULL,
  `versionLabel` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `baseline_items_baselineId_itemId_key` (`baselineId`,`itemId`),
  KEY `baseline_items_itemId_fkey` (`itemId`),
  KEY `baseline_items_itemVersionId_fkey` (`itemVersionId`),
  CONSTRAINT `baseline_items_baselineId_fkey` FOREIGN KEY (`baselineId`) REFERENCES `baselines` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `baseline_items_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `baseline_items_itemVersionId_fkey` FOREIGN KEY (`itemVersionId`) REFERENCES `configuration_item_versions` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `code` varchar(191) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `milestone` varchar(191) DEFAULT NULL,
  `status` enum('DRAFT','FROZEN','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  `createdById` varchar(36) NOT NULL,
  `frozenAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `baselines_code_key` (`code`),
  KEY `baselines_projectId_fkey` (`projectId`),
  KEY `baselines_createdById_fkey` (`createdById`),
  CONSTRAINT `baselines_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `baselines_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `reviewId` varchar(36) NOT NULL,
  `decision` enum('PENDING','APPROVED','REJECTED','POSTPONED') NOT NULL,
  `resolution` text NOT NULL,
  `issuedById` varchar(36) NOT NULL,
  `issuedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ccb_resolutions_reviewId_key` (`reviewId`),
  KEY `ccb_resolutions_issuedById_fkey` (`issuedById`),
  CONSTRAINT `ccb_resolutions_issuedById_fkey` FOREIGN KEY (`issuedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ccb_resolutions_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `ccb_reviews` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED','POSTPONED') NOT NULL DEFAULT 'PENDING',
  `summary` text DEFAULT NULL,
  `scheduledAt` datetime(3) DEFAULT NULL,
  `reviewedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `ccb_reviews_changeRequestId_fkey` (`changeRequestId`),
  CONSTRAINT `ccb_reviews_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `reviewId` varchar(36) NOT NULL,
  `voterId` varchar(36) NOT NULL,
  `decision` enum('PENDING','APPROVED','REJECTED','POSTPONED') NOT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ccb_votes_reviewId_voterId_key` (`reviewId`,`voterId`),
  KEY `ccb_votes_voterId_fkey` (`voterId`),
  CONSTRAINT `ccb_votes_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `ccb_reviews` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ccb_votes_voterId_fkey` FOREIGN KEY (`voterId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `changeOrderId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `roleInOrder` varchar(191) NOT NULL,
  `hoursAssigned` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `change_order_assignments_changeOrderId_userId_key` (`changeOrderId`,`userId`),
  KEY `change_order_assignments_userId_fkey` (`userId`),
  CONSTRAINT `change_order_assignments_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `change_order_assignments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `code` varchar(191) NOT NULL,
  `changeRequestId` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `developerId` varchar(36) DEFAULT NULL,
  `priority` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
  `dueDate` datetime(3) DEFAULT NULL,
  `estimatedHours` int(11) DEFAULT NULL,
  `peopleResources` text NOT NULL,
  `environment` varchar(191) NOT NULL,
  `status` enum('ASSIGNED','IMPLEMENTING','UNIT_TESTING','READY_FOR_QA','QA_FAILED','READY_FOR_UAT','UAT_FAILED','READY_FOR_INTEGRATION','INTEGRATED','COMPLETED','CANCELLED') NOT NULL DEFAULT 'ASSIGNED',
  `gitBranch` varchar(191) DEFAULT NULL,
  `gitCommit` varchar(191) DEFAULT NULL,
  `gitPushRef` varchar(191) DEFAULT NULL,
  `integrationBranch` varchar(191) DEFAULT NULL,
  `integrationCommit` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `change_orders_code_key` (`code`),
  UNIQUE KEY `change_orders_changeRequestId_key` (`changeRequestId`),
  KEY `change_orders_projectId_fkey` (`projectId`),
  KEY `change_orders_developerId_fkey` (`developerId`),
  CONSTRAINT `change_orders_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `change_orders_developerId_fkey` FOREIGN KEY (`developerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `change_orders_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  `relationNote` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `change_request_items_changeRequestId_itemId_key` (`changeRequestId`,`itemId`),
  KEY `change_request_items_itemId_fkey` (`itemId`),
  CONSTRAINT `change_request_items_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `change_request_items_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_request_items`
--

LOCK TABLES `change_request_items` WRITE;
/*!40000 ALTER TABLE `change_request_items` DISABLE KEYS */;
INSERT INTO `change_request_items` VALUES ('05790303-fe48-4dd7-83ce-112a5c707792','fe8e9639-369e-4c89-9832-d56c9d0d2e8f','fd70d2ff-53c9-4b76-9ee4-6a33873d047b','ECS afectado por validacion RBAC.');
/*!40000 ALTER TABLE `change_request_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_requests`
--

DROP TABLE IF EXISTS `change_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_requests` (
  `id` varchar(36) NOT NULL,
  `ticketId` varchar(191) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `requesterId` varchar(36) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `justification` text NOT NULL,
  `type` enum('CORRECTIVE','EVOLUTIONARY','PREVENTIVE','EMERGENCY') NOT NULL,
  `priority` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
  `originIncidentId` varchar(36) DEFAULT NULL,
  `status` enum('DRAFT','INITIAL_VALIDATION','FORMAT_OBSERVED','ALIGNMENT_REJECTED','REGISTERED','CLASSIFIED','IMPACT_ANALYSIS','FAST_APPROVAL','CCB_REVIEW','APPROVED','REJECTED','RESOURCE_ASSIGNMENT','IMPLEMENTATION','UNIT_TESTING','QA_TESTING','QA_DEFECTS','UAT','UAT_OBSERVATIONS','UAT_ACCEPTED','INTEGRATION','FINAL_VALIDATION','RELEASE_APPROVED','RELEASED','ARCHIVED','CLOSED') NOT NULL DEFAULT 'INITIAL_VALIDATION',
  `observations` text DEFAULT NULL,
  `classificationCriteria` text DEFAULT NULL,
  `alignmentDecision` enum('PENDING','ALIGNED','NOT_ALIGNED') NOT NULL DEFAULT 'PENDING',
  `alignmentReason` text DEFAULT NULL,
  `alignedById` varchar(36) DEFAULT NULL,
  `formalRegisteredAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
  CONSTRAINT `change_requests_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `change_requests_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_requests`
--

LOCK TABLES `change_requests` WRITE;
/*!40000 ALTER TABLE `change_requests` DISABLE KEYS */;
INSERT INTO `change_requests` VALUES ('fe8e9639-369e-4c89-9832-d56c9d0d2e8f','SC-0001','d3c6c929-4746-42a5-91ff-8c96d85240fa','7cf38f04-c59a-42af-aacf-ca30450c0bb0','Agregar validacion de permisos por modulo','Fortalecer la validacion de acceso para rutas y acciones SGCSW.','Evitar que usuarios ejecuten acciones fuera de su rol.','CORRECTIVE','HIGH','c91bfed0-e412-4471-8ac2-d0c7524b900b','IMPACT_ANALYSIS','Solicitud seed lista para evaluacion de impacto.','Clasificada como correctiva por incidencia origen de control de acceso.','ALIGNED',NULL,'16647f38-584a-4ba8-92ee-b8bcb910d0af','2026-05-28 23:26:54.864','2026-05-28 23:26:55.062','2026-05-28 23:26:55.062',NULL);
/*!40000 ALTER TABLE `change_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuration_item_locks`
--

DROP TABLE IF EXISTS `configuration_item_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration_item_locks` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `status` enum('ACTIVE','RELEASED','FORCED') NOT NULL DEFAULT 'ACTIVE',
  `reason` text DEFAULT NULL,
  `lockedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `unlockedAt` datetime(3) DEFAULT NULL,
  `forcedById` varchar(36) DEFAULT NULL,
  `forceReason` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `configuration_item_locks_itemId_status_idx` (`itemId`,`status`),
  KEY `configuration_item_locks_userId_fkey` (`userId`),
  KEY `configuration_item_locks_forcedById_fkey` (`forcedById`),
  CONSTRAINT `configuration_item_locks_forcedById_fkey` FOREIGN KEY (`forcedById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_locks_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_locks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  `version` varchar(191) NOT NULL,
  `storagePath` varchar(191) NOT NULL,
  `sha256Hash` char(64) NOT NULL,
  `comment` text NOT NULL,
  `status` enum('DRAFT','CHECKED_IN','BASELINED','RELEASED') NOT NULL DEFAULT 'CHECKED_IN',
  `createdById` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) DEFAULT NULL,
  `changeOrderId` varchar(36) DEFAULT NULL,
  `gitBranch` varchar(191) DEFAULT NULL,
  `gitCommit` varchar(191) DEFAULT NULL,
  `gitPushRef` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `configuration_item_versions_itemId_version_key` (`itemId`,`version`),
  KEY `configuration_item_versions_createdById_fkey` (`createdById`),
  KEY `configuration_item_versions_changeRequestId_fkey` (`changeRequestId`),
  KEY `configuration_item_versions_changeOrderId_fkey` (`changeOrderId`),
  CONSTRAINT `configuration_item_versions_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_versions_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_versions_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `configuration_item_versions_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration_item_versions`
--

LOCK TABLES `configuration_item_versions` WRITE;
/*!40000 ALTER TABLE `configuration_item_versions` DISABLE KEYS */;
INSERT INTO `configuration_item_versions` VALUES ('b36dbc67-04e9-40f5-8e19-de58e19a227a','fd70d2ff-53c9-4b76-9ee4-6a33873d047b','1.0.0','storage/ecs/SGCSW-CORE/auth.controller.ts','b2dc2f2aa5787e39f0b9b9417ad07b9df7dfa72a88eb1c1d6e9d15d547db967c','Version inicial seed del ECS.','CHECKED_IN','f8bcd2ab-e30b-494e-a67a-1b3a64195b2e',NULL,NULL,'main','seed-inicial',NULL,'2026-05-28 23:26:52.555');
/*!40000 ALTER TABLE `configuration_item_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuration_items`
--

DROP TABLE IF EXISTS `configuration_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration_items` (
  `id` varchar(36) NOT NULL,
  `code` varchar(191) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `libraryId` varchar(36) NOT NULL,
  `type` enum('CODE','DOCUMENT','SCRIPT','MODEL','CONFIGURATION','OTHER') NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `currentVersion` varchar(191) NOT NULL,
  `status` enum('REGISTERED','AVAILABLE','LOCKED','BASELINED','ARCHIVED','INACTIVE') NOT NULL DEFAULT 'REGISTERED',
  `metadata` text DEFAULT NULL,
  `storagePath` varchar(191) DEFAULT NULL,
  `sha256Hash` char(64) DEFAULT NULL,
  `responsibleId` varchar(36) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `configuration_items_code_key` (`code`),
  KEY `configuration_items_projectId_libraryId_idx` (`projectId`,`libraryId`),
  KEY `configuration_items_libraryId_fkey` (`libraryId`),
  KEY `configuration_items_responsibleId_fkey` (`responsibleId`),
  CONSTRAINT `configuration_items_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `configuration_items_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `configuration_items_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration_items`
--

LOCK TABLES `configuration_items` WRITE;
/*!40000 ALTER TABLE `configuration_items` DISABLE KEYS */;
INSERT INTO `configuration_items` VALUES ('fd70d2ff-53c9-4b76-9ee4-6a33873d047b','ECS-API-001','d3c6c929-4746-42a5-91ff-8c96d85240fa','d2c935df-099d-4b64-a7f8-6647b3ac4ce1','CODE','auth.controller.ts','Controlador de autenticacion y autorizacion RBAC.','1.0.0','AVAILABLE','lenguaje=TypeScript; capa=backend','storage/ecs/SGCSW-CORE/auth.controller.ts','b2dc2f2aa5787e39f0b9b9417ad07b9df7dfa72a88eb1c1d6e9d15d547db967c','f8bcd2ab-e30b-494e-a67a-1b3a64195b2e',1,'2026-05-28 23:26:52.092','2026-05-28 23:26:52.092');
/*!40000 ALTER TABLE `configuration_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defects`
--

DROP TABLE IF EXISTS `defects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defects` (
  `id` varchar(36) NOT NULL,
  `code` varchar(191) NOT NULL,
  `qaTestId` varchar(36) DEFAULT NULL,
  `changeOrderId` varchar(36) NOT NULL,
  `itemId` varchar(36) DEFAULT NULL,
  `itemVersionId` varchar(36) DEFAULT NULL,
  `severity` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
  `description` text NOT NULL,
  `responsibleId` varchar(36) DEFAULT NULL,
  `status` enum('OPEN','ASSIGNED','FIXED','RETEST','CLOSED') NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `defects_code_key` (`code`),
  KEY `defects_qaTestId_fkey` (`qaTestId`),
  KEY `defects_changeOrderId_fkey` (`changeOrderId`),
  KEY `defects_itemId_fkey` (`itemId`),
  KEY `defects_itemVersionId_fkey` (`itemVersionId`),
  KEY `defects_responsibleId_fkey` (`responsibleId`),
  CONSTRAINT `defects_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON UPDATE CASCADE,
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
  `id` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) NOT NULL,
  `costEstimated` decimal(12,2) NOT NULL,
  `timeEstimatedHours` int(11) NOT NULL,
  `risks` text NOT NULL,
  `requiredResources` text NOT NULL,
  `technicalImpact` text NOT NULL,
  `functionalImpact` text NOT NULL,
  `affectedItemsImpact` text NOT NULL,
  `roi` text NOT NULL,
  `highImpact` tinyint(1) NOT NULL DEFAULT 0,
  `route` enum('TECHNICAL_LEAD','CCB') NOT NULL,
  `assessedById` varchar(36) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `impact_assessments_changeRequestId_key` (`changeRequestId`),
  KEY `impact_assessments_assessedById_fkey` (`assessedById`),
  CONSTRAINT `impact_assessments_assessedById_fkey` FOREIGN KEY (`assessedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `impact_assessments_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `ticketId` varchar(191) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `reportedById` varchar(36) NOT NULL,
  `title` varchar(191) NOT NULL,
  `severity` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
  `description` text NOT NULL,
  `reproductionSteps` text NOT NULL,
  `affectedItemId` varchar(36) DEFAULT NULL,
  `assignedToId` varchar(36) DEFAULT NULL,
  `status` enum('OPEN','ASSIGNED','IN_PROGRESS','DERIVED_TO_CHANGE','RESOLVED','CLOSED') NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `incidents_ticketId_key` (`ticketId`),
  KEY `incidents_projectId_fkey` (`projectId`),
  KEY `incidents_reportedById_fkey` (`reportedById`),
  KEY `incidents_assignedToId_fkey` (`assignedToId`),
  KEY `incidents_affectedItemId_fkey` (`affectedItemId`),
  CONSTRAINT `incidents_affectedItemId_fkey` FOREIGN KEY (`affectedItemId`) REFERENCES `configuration_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `incidents_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `incidents_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `incidents_reportedById_fkey` FOREIGN KEY (`reportedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidents`
--

LOCK TABLES `incidents` WRITE;
/*!40000 ALTER TABLE `incidents` DISABLE KEYS */;
INSERT INTO `incidents` VALUES ('c91bfed0-e412-4471-8ac2-d0c7524b900b','INC-0001','d3c6c929-4746-42a5-91ff-8c96d85240fa','7cf38f04-c59a-42af-aacf-ca30450c0bb0','Validacion RBAC incompleta','HIGH','El menu debe ocultar acciones no autorizadas por rol.','Ingresar con un rol limitado y revisar opciones visibles.','fd70d2ff-53c9-4b76-9ee4-6a33873d047b','6a4627bf-007a-4531-808c-1605162622f8','DERIVED_TO_CHANGE','2026-05-28 23:26:53.388','2026-05-28 23:26:53.388');
/*!40000 ALTER TABLE `incidents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `integrity_alerts`
--

DROP TABLE IF EXISTS `integrity_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `integrity_alerts` (
  `id` varchar(36) NOT NULL,
  `projectId` varchar(36) DEFAULT NULL,
  `itemId` varchar(36) DEFAULT NULL,
  `expectedHash` char(64) NOT NULL,
  `actualHash` char(64) NOT NULL,
  `detail` text NOT NULL,
  `status` enum('OPEN','REVIEWED','RESOLVED') NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
  `id` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `type` enum('WORK','INTEGRATION','SUPPORT','MASTER') NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `libraries_projectId_type_key` (`projectId`,`type`),
  CONSTRAINT `libraries_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libraries`
--

LOCK TABLES `libraries` WRITE;
/*!40000 ALTER TABLE `libraries` DISABLE KEYS */;
INSERT INTO `libraries` VALUES ('0a1f7672-d63a-4ce1-a775-5b95c392096a','3b4f6701-a544-4447-b2aa-01264cdc773e','SUPPORT','Soporte',NULL,1,'2026-05-29 00:21:53.494','2026-05-29 00:21:53.494'),('287f0b1c-e041-46b9-ad0b-0ef525dc4b61','d3c6c929-4746-42a5-91ff-8c96d85240fa','MASTER','Maestra','Biblioteca master del proyecto SGCSW.',1,'2026-05-28 23:26:51.249','2026-05-28 23:26:51.249'),('4d6c587d-7c5e-40a6-b8f4-563eac877aad','3b4f6701-a544-4447-b2aa-01264cdc773e','MASTER','Maestra',NULL,1,'2026-05-29 00:21:53.776','2026-05-29 00:21:53.776'),('554ad543-229e-4715-b292-242e40e4d4c6','3b4f6701-a544-4447-b2aa-01264cdc773e','INTEGRATION','Integracion',NULL,1,'2026-05-29 00:21:53.317','2026-05-29 00:21:53.317'),('7c96b2b7-3002-4903-9409-01d9deb350ee','d3c6c929-4746-42a5-91ff-8c96d85240fa','SUPPORT','Soporte','Biblioteca support del proyecto SGCSW.',1,'2026-05-28 23:26:50.968','2026-05-28 23:26:50.968'),('818953c1-36a9-4fee-a3d6-669be92078eb','d3c6c929-4746-42a5-91ff-8c96d85240fa','INTEGRATION','Integracion','Biblioteca integration del proyecto SGCSW.',1,'2026-05-28 23:26:50.517','2026-05-28 23:26:50.517'),('b830aec6-e602-4090-9ae3-c945fece9875','3b4f6701-a544-4447-b2aa-01264cdc773e','WORK','Trabajo',NULL,1,'2026-05-29 00:21:53.107','2026-05-29 00:21:53.107'),('d2c935df-099d-4b64-a7f8-6647b3ac4ce1','d3c6c929-4746-42a5-91ff-8c96d85240fa','WORK','Trabajo','Biblioteca work del proyecto SGCSW.',1,'2026-05-28 23:26:49.500','2026-05-28 23:26:49.500');
/*!40000 ALTER TABLE `libraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library_transfers`
--

DROP TABLE IF EXISTS `library_transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_transfers` (
  `id` varchar(36) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  `fromLibraryId` varchar(36) NOT NULL,
  `toLibraryId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `reason` text NOT NULL,
  `status` enum('PENDING','COMPLETED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `completedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `library_transfers_itemId_fkey` (`itemId`),
  KEY `library_transfers_fromLibraryId_fkey` (`fromLibraryId`),
  KEY `library_transfers_toLibraryId_fkey` (`toLibraryId`),
  KEY `library_transfers_userId_fkey` (`userId`),
  CONSTRAINT `library_transfers_fromLibraryId_fkey` FOREIGN KEY (`fromLibraryId`) REFERENCES `libraries` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `library_transfers_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `library_transfers_toLibraryId_fkey` FOREIGN KEY (`toLibraryId`) REFERENCES `libraries` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `library_transfers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `title` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `type` enum('INFO','WARNING','ERROR','SUCCESS') NOT NULL DEFAULT 'INFO',
  `link` varchar(191) DEFAULT NULL,
  `readAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `notifications_userId_fkey` (`userId`),
  CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('bb1b8a29-82f5-4db5-801d-8f91528e15c0','16647f38-584a-4ba8-92ee-b8bcb910d0af','Solicitud en analisis de impacto','SC-0001 requiere registrar costo, ROI, riesgos y trazabilidad.','INFO','/cambios/evaluacion-impacto',NULL,'2026-05-28 23:26:56.602');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` varchar(36) NOT NULL,
  `code` varchar(191) NOT NULL,
  `module` varchar(191) NOT NULL,
  `action` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('13bae59b-7e68-4adf-8db4-cc1299ccf933','changes.ccb.manage','cambios/ccb','manage','Revision CCB','2026-05-28 23:26:02.219'),('15badb9d-9b49-49f9-8689-380299c11a0f','config.locks.manage','configuracion/bloqueos','manage','Gestionar bloqueos','2026-05-28 23:26:00.533'),('19b32af8-cdb6-4088-997e-4cddd2cca707','admin.users.manage','admin/usuarios','manage','Gestionar usuarios','2026-05-28 23:25:58.359'),('1f7b5e6c-3e45-48c0-ab00-5cab77eaaf3e','support.incidents.manage','soporte/incidencias','manage','Incidencias','2026-05-28 23:26:04.782'),('294f2a3d-cecd-4980-8d6b-3ebd72646b05','release.manage','liberacion/releases','manage','Liberaciones','2026-05-28 23:26:04.502'),('3df3e95a-0768-4cd6-9ba7-0b5695008a57','qa.uat.manage','qa/uat','manage','UAT','2026-05-28 23:26:03.926'),('4ff668e7-5a4e-403b-8753-c29434d8b6d9','config.baselines.manage','configuracion/lineas-base','manage','Gestionar lineas base','2026-05-28 23:26:01.005'),('51fca473-c13b-4036-b8a0-f5c5ce36f503','changes.orders.manage','cambios/ordenes','manage','Ordenes de cambio','2026-05-28 23:26:02.542'),('55cab449-0601-4c6a-b683-33ed0d0314f8','qa.final.manage','qa/validacion-final','manage','Validacion final','2026-05-28 23:26:04.250'),('56869f32-13b4-4f24-9b8a-cef198569356','changes.technical.manage','cambios/aprobacion-tecnica','manage','Aprobacion tecnica','2026-05-28 23:26:01.981'),('58b6a651-7d58-492c-9270-c93ea01004ff','admin.roles.manage','admin/roles','manage','Gestionar roles y permisos','2026-05-28 23:25:59.016'),('5dc8663d-fd8e-40da-b113-c03ddbf5e8bc','changes.impact.manage','cambios/evaluacion-impacto','manage','Evaluar impacto','2026-05-28 23:26:01.737'),('63a79dc3-16ce-45b1-9a8d-38c9306f185a','config.traceability.read','configuracion/trazabilidad','read','Consultar trazabilidad','2026-05-28 23:26:01.220'),('8d9d6816-7b5d-40e6-811c-60a1529be834','dashboard.read','dashboard','read','Ver dashboard','2026-05-28 23:25:57.400'),('9348b51b-e0dd-4071-a199-bdf6dac97c58','config.ecs.manage','configuracion/ecs','manage','Gestionar ECS','2026-05-28 23:26:00.092'),('9557a50c-cd0d-47ab-aa31-6c3a14fd9776','config.versions.manage','configuracion/versiones','manage','Check-out, check-in y versiones','2026-05-28 23:26:00.319'),('a5cc0904-d521-416a-85cc-56479283b3fe','admin.integrity.read','admin/integridad','read','Consultar alertas de integridad','2026-05-28 23:25:59.858'),('a7ca5635-dcc0-4609-a714-c6fb9aae72b5','dev.unit.manage','desarrollo/pruebas-unitarias','manage','Pruebas unitarias','2026-05-28 23:26:03.035'),('b60a9667-a4cb-4270-995b-77df8e75b89d','config.libraries.manage','configuracion/bibliotecas','manage','Transferir bibliotecas','2026-05-28 23:26:00.764'),('c5d84217-268c-4e73-b8cd-e99150461025','dev.orders.manage','desarrollo/mis-ordenes','manage','Ordenes asignadas','2026-05-28 23:26:02.824'),('c9ab2dce-561d-4f1b-9a44-1ce92bcd25e0','admin.audit.read','admin/auditoria','read','Consultar auditoria','2026-05-28 23:25:59.545'),('dd4c6de8-59f2-4462-a862-451465f1ea79','admin.projects.manage','admin/proyectos','manage','Gestionar proyectos','2026-05-28 23:25:59.250'),('e4fd62ce-9214-496c-b16c-8858849499a7','changes.requests.manage','cambios/solicitudes','manage','Gestionar solicitudes de cambio','2026-05-28 23:26:01.504'),('e7a83c78-033e-4799-bdd8-5a1388dd1395','reports.read','reportes','read','Reportes filtrables','2026-05-28 23:26:05.036'),('e812a866-c1fe-4b18-beda-7ae8c75823b0','qa.tests.manage','qa/pruebas','manage','Pruebas QA','2026-05-28 23:26:03.339'),('ecdfdf3d-c0fd-41b1-ae95-756e7b949d05','qa.defects.manage','qa/defectos','manage','Defectos','2026-05-28 23:26:03.618');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_users`
--

DROP TABLE IF EXISTS `project_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_users` (
  `id` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `roleId` varchar(36) NOT NULL,
  `roleNote` varchar(191) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_users_projectId_userId_key` (`projectId`,`userId`),
  KEY `project_users_userId_fkey` (`userId`),
  KEY `project_users_roleId_fkey` (`roleId`),
  CONSTRAINT `project_users_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `project_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `project_users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_users`
--

LOCK TABLES `project_users` WRITE;
/*!40000 ALTER TABLE `project_users` DISABLE KEYS */;
INSERT INTO `project_users` VALUES ('1a2bd8ee-634f-44da-8b04-f736bebe796b','d3c6c929-4746-42a5-91ff-8c96d85240fa','7cf38f04-c59a-42af-aacf-ca30450c0bb0','85cd8178-820b-4cc4-a563-66f210fc5423','Equipo seed SGCSW',1,'2026-05-28 23:26:43.310'),('391a8fdc-8084-47b3-a071-d628cd02b56c','d3c6c929-4746-42a5-91ff-8c96d85240fa','f8bcd2ab-e30b-494e-a67a-1b3a64195b2e','e6c104e9-433d-4cb3-931a-652735609a04','Equipo seed SGCSW',1,'2026-05-28 23:26:46.743'),('394f5f31-9da3-47c2-980b-6c10c1f3b79c','d3c6c929-4746-42a5-91ff-8c96d85240fa','31b204ae-472f-4a48-8eb0-a9df0c5c5874','7423534b-ffdf-49d5-ae42-c772eb23a271','Equipo seed SGCSW',1,'2026-05-28 23:26:46.319'),('4c7ed7ec-3ecf-4188-866f-f3ce16e3d716','d3c6c929-4746-42a5-91ff-8c96d85240fa','16647f38-584a-4ba8-92ee-b8bcb910d0af','bdbb7c7d-11d1-471a-86ea-920f5813415a','Equipo seed SGCSW',1,'2026-05-28 23:26:44.597'),('7637eddf-dc74-47f6-bdaa-722696a4e0c8','d3c6c929-4746-42a5-91ff-8c96d85240fa','42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','5b75b1db-74d6-4b97-a137-c565d513e0f7','Equipo seed SGCSW',1,'2026-05-28 23:26:41.532'),('a4d80bd0-92a2-4d01-a23c-08cbc2e5f9c2','d3c6c929-4746-42a5-91ff-8c96d85240fa','5773ffb1-192a-4c43-ac5e-7943ad45314c','c4d450a9-9074-417b-943f-5d777fc67052','Equipo seed SGCSW',1,'2026-05-28 23:26:45.355'),('d35a33d5-8d3d-4237-8a52-38d46a0ef481','d3c6c929-4746-42a5-91ff-8c96d85240fa','6a4627bf-007a-4531-808c-1605162622f8','6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','Equipo seed SGCSW',1,'2026-05-28 23:26:47.686'),('eab28125-75a1-4850-bcfc-42666e6af2bc','d3c6c929-4746-42a5-91ff-8c96d85240fa','d75c8f96-89e2-47bb-ab5f-d24c6ffa0f0d','6e7b75e5-e1c4-409f-b33d-6428ce03b348','Equipo seed SGCSW',1,'2026-05-28 23:26:48.623');
/*!40000 ALTER TABLE `project_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` varchar(36) NOT NULL,
  `code` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('ACTIVE','PAUSED','CLOSED','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `managerId` varchar(36) NOT NULL,
  `createdById` varchar(36) DEFAULT NULL,
  `githubOwner` varchar(191) DEFAULT NULL,
  `githubRepo` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `closedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_code_key` (`code`),
  KEY `projects_managerId_fkey` (`managerId`),
  KEY `projects_createdById_fkey` (`createdById`),
  CONSTRAINT `projects_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('3b4f6701-a544-4447-b2aa-01264cdc773e','29211828138123','Py-Nuevo','Nuevo Py','ACTIVE','16647f38-584a-4ba8-92ee-b8bcb910d0af','42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','CarlosAyala1989','hola','2026-05-29 00:21:52.932','2026-05-29 00:21:52.932',NULL),('d3c6c929-4746-42a5-91ff-8c96d85240fa','SGCSW-CORE','SGCSW Core','Proyecto base del Sistema de Gestion de Configuracion de Software.','ACTIVE','16647f38-584a-4ba8-92ee-b8bcb910d0af','42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','organizacion-demo','sgcsw-core','2026-05-28 23:26:41.059','2026-05-28 23:26:41.059',NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qa_tests`
--

DROP TABLE IF EXISTS `qa_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qa_tests` (
  `id` varchar(36) NOT NULL,
  `changeOrderId` varchar(36) NOT NULL,
  `executedById` varchar(36) NOT NULL,
  `type` enum('FUNCTIONAL','INTEGRATION','REGRESSION','FINAL_QUALITY') NOT NULL,
  `result` enum('PENDING','PASSED','FAILED') NOT NULL DEFAULT 'PENDING',
  `notes` text DEFAULT NULL,
  `executedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `qa_tests_changeOrderId_fkey` (`changeOrderId`),
  KEY `qa_tests_executedById_fkey` (`executedById`),
  CONSTRAINT `qa_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `qa_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `releaseId` varchar(36) NOT NULL,
  `level` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `createdById` varchar(36) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `release_logs_releaseId_fkey` (`releaseId`),
  KEY `release_logs_createdById_fkey` (`createdById`),
  CONSTRAINT `release_logs_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `release_logs_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `releases` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) DEFAULT NULL,
  `changeOrderId` varchar(36) DEFAULT NULL,
  `version` varchar(191) NOT NULL,
  `semver` varchar(191) NOT NULL,
  `environment` varchar(191) NOT NULL,
  `status` enum('PENDING_SIGNAL','APPROVED','EXECUTED','FAILED','NOTIFIED','CLOSED') NOT NULL DEFAULT 'PENDING_SIGNAL',
  `responsibleId` varchar(36) NOT NULL,
  `result` text DEFAULT NULL,
  `targetBranch` varchar(191) DEFAULT NULL,
  `mergeCommit` varchar(191) DEFAULT NULL,
  `tagName` varchar(191) DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `releasedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `releases_projectId_fkey` (`projectId`),
  KEY `releases_changeRequestId_fkey` (`changeRequestId`),
  KEY `releases_changeOrderId_fkey` (`changeOrderId`),
  KEY `releases_responsibleId_fkey` (`responsibleId`),
  CONSTRAINT `releases_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `releases_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `releases_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `releases_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `roleId` varchar(36) NOT NULL,
  `permissionId` varchar(36) NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `role_permissions_permissionId_fkey` (`permissionId`),
  CONSTRAINT `role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES ('2aed6f6b-f734-4ea0-b016-1669a9cdc9ed','8d9d6816-7b5d-40e6-811c-60a1529be834'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','19b32af8-cdb6-4088-997e-4cddd2cca707'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','58b6a651-7d58-492c-9270-c93ea01004ff'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','63a79dc3-16ce-45b1-9a8d-38c9306f185a'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','8d9d6816-7b5d-40e6-811c-60a1529be834'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','a5cc0904-d521-416a-85cc-56479283b3fe'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','c9ab2dce-561d-4f1b-9a44-1ce92bcd25e0'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','dd4c6de8-59f2-4462-a862-451465f1ea79'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','e7a83c78-033e-4799-bdd8-5a1388dd1395'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','1f7b5e6c-3e45-48c0-ab00-5cab77eaaf3e'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','8d9d6816-7b5d-40e6-811c-60a1529be834'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','9348b51b-e0dd-4071-a199-bdf6dac97c58'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','9557a50c-cd0d-47ab-aa31-6c3a14fd9776'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','a7ca5635-dcc0-4609-a714-c6fb9aae72b5'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','c5d84217-268c-4e73-b8cd-e99150461025'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','e4fd62ce-9214-496c-b16c-8858849499a7'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','294f2a3d-cecd-4980-8d6b-3ebd72646b05'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','3df3e95a-0768-4cd6-9ba7-0b5695008a57'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','55cab449-0601-4c6a-b683-33ed0d0314f8'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','63a79dc3-16ce-45b1-9a8d-38c9306f185a'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','8d9d6816-7b5d-40e6-811c-60a1529be834'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','e7a83c78-033e-4799-bdd8-5a1388dd1395'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','e812a866-c1fe-4b18-beda-7ae8c75823b0'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','ecdfdf3d-c0fd-41b1-ae95-756e7b949d05'),('7423534b-ffdf-49d5-ae42-c772eb23a271','13bae59b-7e68-4adf-8db4-cc1299ccf933'),('7423534b-ffdf-49d5-ae42-c772eb23a271','63a79dc3-16ce-45b1-9a8d-38c9306f185a'),('7423534b-ffdf-49d5-ae42-c772eb23a271','8d9d6816-7b5d-40e6-811c-60a1529be834'),('7423534b-ffdf-49d5-ae42-c772eb23a271','e4fd62ce-9214-496c-b16c-8858849499a7'),('7423534b-ffdf-49d5-ae42-c772eb23a271','e7a83c78-033e-4799-bdd8-5a1388dd1395'),('85cd8178-820b-4cc4-a563-66f210fc5423','1f7b5e6c-3e45-48c0-ab00-5cab77eaaf3e'),('85cd8178-820b-4cc4-a563-66f210fc5423','3df3e95a-0768-4cd6-9ba7-0b5695008a57'),('85cd8178-820b-4cc4-a563-66f210fc5423','63a79dc3-16ce-45b1-9a8d-38c9306f185a'),('85cd8178-820b-4cc4-a563-66f210fc5423','8d9d6816-7b5d-40e6-811c-60a1529be834'),('85cd8178-820b-4cc4-a563-66f210fc5423','e4fd62ce-9214-496c-b16c-8858849499a7'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','51fca473-c13b-4036-b8a0-f5c5ce36f503'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','5dc8663d-fd8e-40da-b113-c03ddbf5e8bc'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','63a79dc3-16ce-45b1-9a8d-38c9306f185a'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','8d9d6816-7b5d-40e6-811c-60a1529be834'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','dd4c6de8-59f2-4462-a862-451465f1ea79'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','e4fd62ce-9214-496c-b16c-8858849499a7'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','e7a83c78-033e-4799-bdd8-5a1388dd1395'),('c4d450a9-9074-417b-943f-5d777fc67052','56869f32-13b4-4f24-9b8a-cef198569356'),('c4d450a9-9074-417b-943f-5d777fc67052','63a79dc3-16ce-45b1-9a8d-38c9306f185a'),('c4d450a9-9074-417b-943f-5d777fc67052','8d9d6816-7b5d-40e6-811c-60a1529be834'),('c4d450a9-9074-417b-943f-5d777fc67052','e4fd62ce-9214-496c-b16c-8858849499a7'),('decc79a0-d9b6-480d-95ff-a0e15e6f4f3e','294f2a3d-cecd-4980-8d6b-3ebd72646b05'),('e6c104e9-433d-4cb3-931a-652735609a04','15badb9d-9b49-49f9-8689-380299c11a0f'),('e6c104e9-433d-4cb3-931a-652735609a04','4ff668e7-5a4e-403b-8753-c29434d8b6d9'),('e6c104e9-433d-4cb3-931a-652735609a04','63a79dc3-16ce-45b1-9a8d-38c9306f185a'),('e6c104e9-433d-4cb3-931a-652735609a04','8d9d6816-7b5d-40e6-811c-60a1529be834'),('e6c104e9-433d-4cb3-931a-652735609a04','9348b51b-e0dd-4071-a199-bdf6dac97c58'),('e6c104e9-433d-4cb3-931a-652735609a04','9557a50c-cd0d-47ab-aa31-6c3a14fd9776'),('e6c104e9-433d-4cb3-931a-652735609a04','b60a9667-a4cb-4270-995b-77df8e75b89d'),('e6c104e9-433d-4cb3-931a-652735609a04','e7a83c78-033e-4799-bdd8-5a1388dd1395');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` varchar(36) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `isSystem` tinyint(1) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
INSERT INTO `roles` VALUES ('2aed6f6b-f734-4ea0-b016-1669a9cdc9ed','Sistema Gestor de Configuracion','SISTEMA_CONFIGURACION','Actor logico automatizado del flujo SGCSW.',1,1,'2026-05-28 23:26:07.972','2026-05-28 23:26:07.972'),('5b75b1db-74d6-4b97-a137-c565d513e0f7','Administrador del Sistema','ADMINISTRADOR','Gestiona usuarios, roles, proyectos, auditoria e integridad.',0,1,'2026-05-28 23:26:05.288','2026-05-28 23:26:05.288'),('6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','Desarrollador Asignado','DESARROLLADOR','Implementa cambios, check-in y pruebas unitarias.',0,1,'2026-05-28 23:26:07.409','2026-05-28 23:26:07.409'),('6e7b75e5-e1c4-409f-b33d-6428ce03b348','Equipo QA / Tester','QA','Ejecuta QA, defectos, UAT y validacion final.',0,1,'2026-05-28 23:26:07.713','2026-05-28 23:26:07.713'),('7423534b-ffdf-49d5-ae42-c772eb23a271','Comite de Control de Cambios','CCB','Evalua cambios de alto impacto.',0,1,'2026-05-28 23:26:06.806','2026-05-28 23:26:06.806'),('85cd8178-820b-4cc4-a563-66f210fc5423','Solicitante / Cliente / Usuario Final','SOLICITANTE','Registra solicitudes, incidencias y ejecuta UAT.',0,1,'2026-05-28 23:26:05.924','2026-05-28 23:26:05.924'),('bdbb7c7d-11d1-471a-86ea-920f5813415a','Director / Jefe de Proyecto','JEFE_PROYECTO','Valida alineacion, evalua impacto y asigna recursos.',0,1,'2026-05-28 23:26:06.230','2026-05-28 23:26:06.230'),('c4d450a9-9074-417b-943f-5d777fc67052','Lider Tecnico / Analista','LIDER_TECNICO','Aprueba o rechaza cambios de bajo impacto.',0,1,'2026-05-28 23:26:06.483','2026-05-28 23:26:06.483'),('decc79a0-d9b6-480d-95ff-a0e15e6f4f3e','Sistema Gestor de Liberacion','SISTEMA_LIBERACION','Actor logico de ejecucion o registro de release.',1,1,'2026-05-28 23:26:08.175','2026-05-28 23:26:08.175'),('e6c104e9-433d-4cb3-931a-652735609a04','Administrador de Configuracion / Bibliotecario','BIBLIOTECARIO','Gestiona ECS, bibliotecas, bloqueos y lineas base.',0,1,'2026-05-28 23:26:07.077','2026-05-28 23:26:07.077');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technical_approvals`
--

DROP TABLE IF EXISTS `technical_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technical_approvals` (
  `id` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) NOT NULL,
  `reviewerId` varchar(36) NOT NULL,
  `decision` enum('PENDING','APPROVED','REJECTED','POSTPONED') NOT NULL DEFAULT 'PENDING',
  `reason` text DEFAULT NULL,
  `decidedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `technical_approvals_changeRequestId_key` (`changeRequestId`),
  KEY `technical_approvals_reviewerId_fkey` (`reviewerId`),
  CONSTRAINT `technical_approvals_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `technical_approvals_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  `sourceType` varchar(191) NOT NULL,
  `sourceId` varchar(191) NOT NULL,
  `targetType` varchar(191) NOT NULL,
  `targetId` varchar(191) NOT NULL,
  `relationType` varchar(191) NOT NULL,
  `createdById` varchar(36) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `traceability_links_sourceType_sourceId_idx` (`sourceType`,`sourceId`),
  KEY `traceability_links_targetType_targetId_idx` (`targetType`,`targetId`),
  KEY `traceability_links_projectId_fkey` (`projectId`),
  KEY `traceability_links_createdById_fkey` (`createdById`),
  CONSTRAINT `traceability_links_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `traceability_links_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traceability_links`
--

LOCK TABLES `traceability_links` WRITE;
/*!40000 ALTER TABLE `traceability_links` DISABLE KEYS */;
INSERT INTO `traceability_links` VALUES ('0feb7b89-b675-460d-9669-716a3e45a550','d3c6c929-4746-42a5-91ff-8c96d85240fa','INCIDENT','c91bfed0-e412-4471-8ac2-d0c7524b900b','CHANGE_REQUEST','fe8e9639-369e-4c89-9832-d56c9d0d2e8f','derived_to_change','16647f38-584a-4ba8-92ee-b8bcb910d0af','2026-05-28 23:26:55.845');
/*!40000 ALTER TABLE `traceability_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uat_tests`
--

DROP TABLE IF EXISTS `uat_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uat_tests` (
  `id` varchar(36) NOT NULL,
  `changeRequestId` varchar(36) NOT NULL,
  `changeOrderId` varchar(36) DEFAULT NULL,
  `executedById` varchar(36) NOT NULL,
  `result` enum('PENDING','ACCEPTED','OBSERVED') NOT NULL DEFAULT 'PENDING',
  `observations` text DEFAULT NULL,
  `executedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `uat_tests_changeRequestId_fkey` (`changeRequestId`),
  KEY `uat_tests_changeOrderId_fkey` (`changeOrderId`),
  KEY `uat_tests_executedById_fkey` (`executedById`),
  CONSTRAINT `uat_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `uat_tests_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `uat_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE
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
  `id` varchar(36) NOT NULL,
  `changeOrderId` varchar(36) NOT NULL,
  `itemVersionId` varchar(36) DEFAULT NULL,
  `executedById` varchar(36) NOT NULL,
  `result` enum('PENDING','PASSED','FAILED') NOT NULL DEFAULT 'PENDING',
  `errors` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `executedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `unit_tests_changeOrderId_fkey` (`changeOrderId`),
  KEY `unit_tests_itemVersionId_fkey` (`itemVersionId`),
  KEY `unit_tests_executedById_fkey` (`executedById`),
  CONSTRAINT `unit_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `unit_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
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
  `id` varchar(36) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `roleId` varchar(36) NOT NULL,
  `githubTokenEncrypted` text DEFAULT NULL,
  `githubTokenLast4` varchar(12) DEFAULT NULL,
  `lastLoginAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `users_roleId_fkey` (`roleId`),
  CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('16647f38-584a-4ba8-92ee-b8bcb910d0af','Jefe de Proyecto Demo','jefe@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','bdbb7c7d-11d1-471a-86ea-920f5813415a',NULL,NULL,'2026-05-29 00:25:36.262','2026-05-28 23:26:37.592','2026-05-29 00:25:36.318'),('31b204ae-472f-4a48-8eb0-a9df0c5c5874','Miembro CCB Demo','ccb@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','7423534b-ffdf-49d5-ae42-c772eb23a271',NULL,NULL,'2026-05-29 00:29:13.595','2026-05-28 23:26:38.571','2026-05-29 00:29:13.651'),('42882bd2-c4ab-4ce3-a0ba-ba4b64a3cf8b','Admin SGCSW','admin@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','5b75b1db-74d6-4b97-a137-c565d513e0f7',NULL,NULL,'2026-05-30 07:09:06.598','2026-05-28 23:26:36.440','2026-05-30 07:09:06.666'),('5773ffb1-192a-4c43-ac5e-7943ad45314c','Lider Tecnico Demo','lider@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','c4d450a9-9074-417b-943f-5d777fc67052',NULL,NULL,'2026-05-29 00:28:26.291','2026-05-28 23:26:38.034','2026-05-29 00:28:26.378'),('6a4627bf-007a-4531-808c-1605162622f8','Desarrollador Demo','dev@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','6b4ad3eb-05fd-44a0-bcab-3b5755f19d04',NULL,NULL,'2026-05-29 00:06:20.047','2026-05-28 23:26:39.596','2026-05-29 00:06:20.097'),('7cf38f04-c59a-42af-aacf-ca30450c0bb0','Solicitante Demo','solicitante@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','85cd8178-820b-4cc4-a563-66f210fc5423',NULL,NULL,'2026-05-29 00:23:10.738','2026-05-28 23:26:37.203','2026-05-29 00:23:10.986'),('89c7d1e2-f4b7-487b-8c45-0a453323af51','Carlos Daniel Ayala Ramos','carlosdaniel@gmail.com','$2b$12$bsBYRJjL9SVHqXjJ8g0fAO7bhMOAb8Fkw/3Rf/VDrpi/lkjpWi5s2','ACTIVE','6b4ad3eb-05fd-44a0-bcab-3b5755f19d04','0k5KgTOCcSZSeLj0.o64iwtrIk/p843KnY4Fmxg==.3fDOI88R1L64L+29RpWmD73ieS5QSD43cLvaSu3K6RskNCJyMXDXgg==','xOg2',NULL,'2026-05-29 00:13:04.361','2026-05-29 00:13:04.361'),('d75c8f96-89e2-47bb-ab5f-d24c6ffa0f0d','QA Tester Demo','qa@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','6e7b75e5-e1c4-409f-b33d-6428ce03b348',NULL,NULL,NULL,'2026-05-28 23:26:40.649','2026-05-28 23:26:40.649'),('f8bcd2ab-e30b-494e-a67a-1b3a64195b2e','Bibliotecario Demo','bibliotecario@sgcsw.local','$2b$12$QhK6qRGW8TxYBWtH9Hhxme87lHeHM5WCrqZ4Bk7zTbdzBRqKTELW6','ACTIVE','e6c104e9-433d-4cb3-931a-652735609a04',NULL,NULL,'2026-05-29 00:30:15.927','2026-05-28 23:26:39.163','2026-05-29 00:30:15.988');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sgcsw'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-30  2:20:49
