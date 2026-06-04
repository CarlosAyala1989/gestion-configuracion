-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `roleId` VARCHAR(36) NOT NULL,
    `githubTokenEncrypted` TEXT NULL,
    `githubTokenLast4` VARCHAR(12) NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `isSystem` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `module` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `permissions_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `roleId` VARCHAR(36) NOT NULL,
    `permissionId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('ACTIVE', 'PAUSED', 'CLOSED', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `managerId` VARCHAR(36) NOT NULL,
    `createdById` VARCHAR(36) NULL,
    `githubOwner` VARCHAR(191) NULL,
    `githubRepo` VARCHAR(191) NULL,
    `methodologyType` ENUM('SCRUM', 'KANBAN', 'RUP', 'CASCADA', 'XP', 'CUSTOM') NULL,
    `methodologyNotes` TEXT NULL,
    `methodologyConfiguredAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `closedAt` DATETIME(3) NULL,

    UNIQUE INDEX `projects_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_users` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `roleId` VARCHAR(36) NOT NULL,
    `roleNote` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `project_users_projectId_userId_key`(`projectId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `libraries` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `type` ENUM('WORK', 'INTEGRATION', 'SUPPORT', 'MASTER') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `libraries_projectId_type_key`(`projectId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuration_items` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `libraryId` VARCHAR(36) NOT NULL,
    `type` ENUM('CODE', 'DOCUMENT', 'SCRIPT', 'MODEL', 'CONFIGURATION', 'OTHER') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `currentVersion` VARCHAR(191) NOT NULL,
    `status` ENUM('REGISTERED', 'AVAILABLE', 'LOCKED', 'BASELINED', 'ARCHIVED', 'INACTIVE') NOT NULL DEFAULT 'REGISTERED',
    `metadata` TEXT NULL,
    `storagePath` VARCHAR(191) NULL,
    `sha256Hash` CHAR(64) NULL,
    `responsibleId` VARCHAR(36) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `configuration_items_code_key`(`code`),
    INDEX `configuration_items_projectId_libraryId_idx`(`projectId`, `libraryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuration_item_versions` (
    `id` VARCHAR(36) NOT NULL,
    `itemId` VARCHAR(36) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `storagePath` VARCHAR(191) NOT NULL,
    `sha256Hash` CHAR(64) NOT NULL,
    `comment` TEXT NOT NULL,
    `status` ENUM('DRAFT', 'CHECKED_IN', 'BASELINED', 'RELEASED') NOT NULL DEFAULT 'CHECKED_IN',
    `createdById` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NULL,
    `changeOrderId` VARCHAR(36) NULL,
    `gitBranch` VARCHAR(191) NULL,
    `gitCommit` VARCHAR(191) NULL,
    `gitPushRef` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `configuration_item_versions_itemId_version_key`(`itemId`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuration_item_locks` (
    `id` VARCHAR(36) NOT NULL,
    `itemId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `status` ENUM('ACTIVE', 'RELEASED', 'FORCED') NOT NULL DEFAULT 'ACTIVE',
    `reason` TEXT NULL,
    `lockedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unlockedAt` DATETIME(3) NULL,
    `forcedById` VARCHAR(36) NULL,
    `forceReason` TEXT NULL,

    INDEX `configuration_item_locks_itemId_status_idx`(`itemId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library_transfers` (
    `id` VARCHAR(36) NOT NULL,
    `itemId` VARCHAR(36) NOT NULL,
    `fromLibraryId` VARCHAR(36) NOT NULL,
    `toLibraryId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `reason` TEXT NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baselines` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `milestone` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'FROZEN', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdById` VARCHAR(36) NOT NULL,
    `frozenAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `baselines_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baseline_items` (
    `id` VARCHAR(36) NOT NULL,
    `baselineId` VARCHAR(36) NOT NULL,
    `itemId` VARCHAR(36) NOT NULL,
    `itemVersionId` VARCHAR(36) NOT NULL,
    `versionLabel` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `baseline_items_baselineId_itemId_key`(`baselineId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incidents` (
    `id` VARCHAR(36) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `reportedById` VARCHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `severity` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
    `description` TEXT NOT NULL,
    `reproductionSteps` TEXT NOT NULL,
    `affectedItemId` VARCHAR(36) NULL,
    `assignedToId` VARCHAR(36) NULL,
    `status` ENUM('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'DERIVED_TO_CHANGE', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `incidents_ticketId_key`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `change_requests` (
    `id` VARCHAR(36) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `requesterId` VARCHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `justification` TEXT NOT NULL,
    `type` ENUM('CORRECTIVE', 'EVOLUTIONARY', 'PREVENTIVE', 'EMERGENCY') NOT NULL,
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
    `originIncidentId` VARCHAR(36) NULL,
    `status` ENUM('DRAFT', 'INITIAL_VALIDATION', 'FORMAT_OBSERVED', 'ALIGNMENT_REJECTED', 'REGISTERED', 'CLASSIFIED', 'IMPACT_ANALYSIS', 'FAST_APPROVAL', 'CCB_REVIEW', 'APPROVED', 'REJECTED', 'RESOURCE_ASSIGNMENT', 'IMPLEMENTATION', 'UNIT_TESTING', 'QA_TESTING', 'QA_DEFECTS', 'UAT', 'UAT_OBSERVATIONS', 'UAT_ACCEPTED', 'INTEGRATION', 'FINAL_VALIDATION', 'RELEASE_APPROVED', 'RELEASED', 'ARCHIVED', 'CLOSED') NOT NULL DEFAULT 'INITIAL_VALIDATION',
    `observations` TEXT NULL,
    `classificationCriteria` TEXT NULL,
    `alignmentDecision` ENUM('PENDING', 'ALIGNED', 'NOT_ALIGNED') NOT NULL DEFAULT 'PENDING',
    `alignmentReason` TEXT NULL,
    `alignedById` VARCHAR(36) NULL,
    `formalRegisteredAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `closedAt` DATETIME(3) NULL,

    UNIQUE INDEX `change_requests_ticketId_key`(`ticketId`),
    UNIQUE INDEX `change_requests_originIncidentId_key`(`originIncidentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `change_request_items` (
    `id` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NOT NULL,
    `itemId` VARCHAR(36) NOT NULL,
    `relationNote` VARCHAR(191) NULL,

    UNIQUE INDEX `change_request_items_changeRequestId_itemId_key`(`changeRequestId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `impact_assessments` (
    `id` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NOT NULL,
    `costEstimated` DECIMAL(12, 2) NOT NULL,
    `timeEstimatedHours` INTEGER NOT NULL,
    `risks` TEXT NOT NULL,
    `requiredResources` TEXT NOT NULL,
    `technicalImpact` TEXT NOT NULL,
    `functionalImpact` TEXT NOT NULL,
    `affectedItemsImpact` TEXT NOT NULL,
    `roi` TEXT NOT NULL,
    `highImpact` BOOLEAN NOT NULL DEFAULT false,
    `route` ENUM('TECHNICAL_LEAD', 'CCB') NOT NULL,
    `assessedById` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `impact_assessments_changeRequestId_key`(`changeRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technical_approvals` (
    `id` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NOT NULL,
    `reviewerId` VARCHAR(36) NOT NULL,
    `decision` ENUM('PENDING', 'APPROVED', 'REJECTED', 'POSTPONED') NOT NULL DEFAULT 'PENDING',
    `reason` TEXT NULL,
    `decidedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `technical_approvals_changeRequestId_key`(`changeRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ccb_reviews` (
    `id` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'POSTPONED') NOT NULL DEFAULT 'PENDING',
    `summary` TEXT NULL,
    `scheduledAt` DATETIME(3) NULL,
    `reviewedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ccb_votes` (
    `id` VARCHAR(36) NOT NULL,
    `reviewId` VARCHAR(36) NOT NULL,
    `voterId` VARCHAR(36) NOT NULL,
    `decision` ENUM('PENDING', 'APPROVED', 'REJECTED', 'POSTPONED') NOT NULL,
    `comment` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ccb_votes_reviewId_voterId_key`(`reviewId`, `voterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ccb_resolutions` (
    `id` VARCHAR(36) NOT NULL,
    `reviewId` VARCHAR(36) NOT NULL,
    `decision` ENUM('PENDING', 'APPROVED', 'REJECTED', 'POSTPONED') NOT NULL,
    `resolution` TEXT NOT NULL,
    `issuedById` VARCHAR(36) NOT NULL,
    `issuedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ccb_resolutions_reviewId_key`(`reviewId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `change_orders` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `changeRequestId` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `developerId` VARCHAR(36) NULL,
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
    `dueDate` DATETIME(3) NULL,
    `estimatedHours` INTEGER NULL,
    `peopleResources` TEXT NOT NULL,
    `environment` VARCHAR(191) NOT NULL,
    `status` ENUM('ASSIGNED', 'IMPLEMENTING', 'UNIT_TESTING', 'READY_FOR_QA', 'QA_FAILED', 'READY_FOR_UAT', 'UAT_FAILED', 'READY_FOR_INTEGRATION', 'INTEGRATED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'ASSIGNED',
    `gitBranch` VARCHAR(191) NULL,
    `gitCommit` VARCHAR(191) NULL,
    `gitPushRef` VARCHAR(191) NULL,
    `integrationBranch` VARCHAR(191) NULL,
    `integrationCommit` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `change_orders_code_key`(`code`),
    UNIQUE INDEX `change_orders_changeRequestId_key`(`changeRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `methodology_phases` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `methodologyType` ENUM('SCRUM', 'KANBAN', 'RUP', 'CASCADA', 'XP', 'CUSTOM') NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `ownerId` VARCHAR(36) NULL,
    `requiredDeliverables` TEXT NOT NULL,
    `acceptanceCriteria` TEXT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'DONE', 'BLOCKED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `methodology_phases_projectId_sortOrder_idx`(`projectId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_activities` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `phaseId` VARCHAR(36) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `responsibleId` VARCHAR(36) NOT NULL,
    `deliverable` TEXT NOT NULL,
    `progress` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'DONE', 'BLOCKED') NOT NULL DEFAULT 'PLANNED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_activities_projectId_startDate_endDate_idx`(`projectId`, `startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_sprints` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `goal` TEXT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `capacityHours` INTEGER NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_sprints_projectId_startDate_endDate_idx`(`projectId`, `startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_items` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `type` ENUM('EPIC', 'FEATURE', 'USER_STORY', 'TASK', 'BUG', 'ISSUE') NOT NULL,
    `state` ENUM('NEW', 'ACTIVE', 'RESOLVED', 'CLOSED', 'REMOVED') NOT NULL DEFAULT 'NEW',
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
    `storyPoints` INTEGER NULL,
    `createdById` VARCHAR(36) NOT NULL,
    `assignedToId` VARCHAR(36) NULL,
    `sprintId` VARCHAR(36) NULL,
    `activityId` VARCHAR(36) NULL,
    `changeRequestId` VARCHAR(36) NULL,
    `changeOrderId` VARCHAR(36) NULL,
    `githubBranch` VARCHAR(191) NULL,
    `githubCommit` VARCHAR(191) NULL,
    `githubPullRequestUrl` VARCHAR(191) NULL,
    `githubIssueUrl` VARCHAR(191) NULL,
    `dueDate` DATETIME(3) NULL,
    `closedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `work_items_code_key`(`code`),
    INDEX `work_items_projectId_state_type_idx`(`projectId`, `state`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_item_links` (
    `id` VARCHAR(36) NOT NULL,
    `sourceWorkItemId` VARCHAR(36) NOT NULL,
    `targetWorkItemId` VARCHAR(36) NULL,
    `linkType` ENUM('PARENT', 'CHILD', 'RELATED', 'PREDECESSOR', 'SUCCESSOR', 'GITHUB_BRANCH', 'GITHUB_COMMIT', 'GITHUB_PULL_REQUEST', 'GITHUB_ISSUE', 'CHANGE_REQUEST', 'CHANGE_ORDER', 'CONFIG_ITEM', 'RELEASE') NOT NULL,
    `targetUrl` VARCHAR(191) NULL,
    `externalId` VARCHAR(191) NULL,
    `note` TEXT NULL,
    `createdById` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `work_item_links_sourceWorkItemId_linkType_idx`(`sourceWorkItemId`, `linkType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_work_logs` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `workItemId` VARCHAR(36) NULL,
    `changeOrderId` VARCHAR(36) NULL,
    `activityId` VARCHAR(36) NULL,
    `logDate` DATETIME(3) NOT NULL,
    `hours` DECIMAL(5, 2) NOT NULL,
    `completed` TEXT NOT NULL,
    `nextPlan` TEXT NOT NULL,
    `blockers` TEXT NULL,
    `githubBranch` VARCHAR(191) NULL,
    `githubCommit` VARCHAR(191) NULL,
    `githubPullRequestUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `daily_work_logs_projectId_logDate_idx`(`projectId`, `logDate`),
    INDEX `daily_work_logs_userId_logDate_idx`(`userId`, `logDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `change_order_assignments` (
    `id` VARCHAR(36) NOT NULL,
    `changeOrderId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `roleInOrder` VARCHAR(191) NOT NULL,
    `hoursAssigned` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `change_order_assignments_changeOrderId_userId_key`(`changeOrderId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit_tests` (
    `id` VARCHAR(36) NOT NULL,
    `changeOrderId` VARCHAR(36) NOT NULL,
    `itemVersionId` VARCHAR(36) NULL,
    `executedById` VARCHAR(36) NOT NULL,
    `result` ENUM('PENDING', 'PASSED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `errors` TEXT NULL,
    `notes` TEXT NULL,
    `executedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qa_tests` (
    `id` VARCHAR(36) NOT NULL,
    `changeOrderId` VARCHAR(36) NOT NULL,
    `executedById` VARCHAR(36) NOT NULL,
    `type` ENUM('FUNCTIONAL', 'INTEGRATION', 'REGRESSION', 'FINAL_QUALITY') NOT NULL,
    `result` ENUM('PENDING', 'PASSED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `notes` TEXT NULL,
    `executedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `defects` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `qaTestId` VARCHAR(36) NULL,
    `changeOrderId` VARCHAR(36) NOT NULL,
    `itemId` VARCHAR(36) NULL,
    `itemVersionId` VARCHAR(36) NULL,
    `severity` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
    `description` TEXT NOT NULL,
    `responsibleId` VARCHAR(36) NULL,
    `status` ENUM('OPEN', 'ASSIGNED', 'FIXED', 'RETEST', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `defects_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uat_tests` (
    `id` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NOT NULL,
    `changeOrderId` VARCHAR(36) NULL,
    `executedById` VARCHAR(36) NOT NULL,
    `result` ENUM('PENDING', 'ACCEPTED', 'OBSERVED') NOT NULL DEFAULT 'PENDING',
    `observations` TEXT NULL,
    `executedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acceptance_records` (
    `id` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NOT NULL,
    `uatTestId` VARCHAR(36) NOT NULL,
    `signedById` VARCHAR(36) NOT NULL,
    `documentPath` VARCHAR(191) NOT NULL,
    `sha256Hash` CHAR(64) NOT NULL,
    `signedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `acceptance_records_uatTestId_key`(`uatTestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `releases` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `changeRequestId` VARCHAR(36) NULL,
    `changeOrderId` VARCHAR(36) NULL,
    `version` VARCHAR(191) NOT NULL,
    `semver` VARCHAR(191) NOT NULL,
    `environment` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING_SIGNAL', 'APPROVED', 'EXECUTED', 'FAILED', 'NOTIFIED', 'CLOSED') NOT NULL DEFAULT 'PENDING_SIGNAL',
    `responsibleId` VARCHAR(36) NOT NULL,
    `result` TEXT NULL,
    `targetBranch` VARCHAR(191) NULL,
    `mergeCommit` VARCHAR(191) NULL,
    `tagName` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `releasedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `release_logs` (
    `id` VARCHAR(36) NOT NULL,
    `releaseId` VARCHAR(36) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `createdById` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `type` ENUM('INFO', 'WARNING', 'ERROR', 'SUCCESS') NOT NULL DEFAULT 'INFO',
    `link` VARCHAR(191) NULL,
    `readAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NULL,
    `module` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NULL,
    `previousDetail` TEXT NULL,
    `newDetail` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_module_action_idx`(`module`, `action`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `integrity_alerts` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NULL,
    `itemId` VARCHAR(36) NULL,
    `expectedHash` CHAR(64) NOT NULL,
    `actualHash` CHAR(64) NOT NULL,
    `detail` TEXT NOT NULL,
    `status` ENUM('OPEN', 'REVIEWED', 'RESOLVED') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolvedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `traceability_links` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `sourceType` VARCHAR(191) NOT NULL,
    `sourceId` VARCHAR(191) NOT NULL,
    `targetType` VARCHAR(191) NOT NULL,
    `targetId` VARCHAR(191) NOT NULL,
    `relationType` VARCHAR(191) NOT NULL,
    `createdById` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `traceability_links_sourceType_sourceId_idx`(`sourceType`, `sourceId`),
    INDEX `traceability_links_targetType_targetId_idx`(`targetType`, `targetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachments` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `ownerType` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NULL,
    `storagePath` VARCHAR(191) NOT NULL,
    `sha256Hash` CHAR(64) NOT NULL,
    `version` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
    `uploadedById` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `attachments_ownerType_ownerId_idx`(`ownerType`, `ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_users` ADD CONSTRAINT `project_users_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_users` ADD CONSTRAINT `project_users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_users` ADD CONSTRAINT `project_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `libraries` ADD CONSTRAINT `libraries_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_items` ADD CONSTRAINT `configuration_items_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_items` ADD CONSTRAINT `configuration_items_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_items` ADD CONSTRAINT `configuration_items_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_item_versions` ADD CONSTRAINT `configuration_item_versions_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_item_versions` ADD CONSTRAINT `configuration_item_versions_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_item_versions` ADD CONSTRAINT `configuration_item_versions_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_item_versions` ADD CONSTRAINT `configuration_item_versions_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_item_locks` ADD CONSTRAINT `configuration_item_locks_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_item_locks` ADD CONSTRAINT `configuration_item_locks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_item_locks` ADD CONSTRAINT `configuration_item_locks_forcedById_fkey` FOREIGN KEY (`forcedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `library_transfers` ADD CONSTRAINT `library_transfers_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `library_transfers` ADD CONSTRAINT `library_transfers_fromLibraryId_fkey` FOREIGN KEY (`fromLibraryId`) REFERENCES `libraries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `library_transfers` ADD CONSTRAINT `library_transfers_toLibraryId_fkey` FOREIGN KEY (`toLibraryId`) REFERENCES `libraries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `library_transfers` ADD CONSTRAINT `library_transfers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `baselines` ADD CONSTRAINT `baselines_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `baselines` ADD CONSTRAINT `baselines_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `baseline_items` ADD CONSTRAINT `baseline_items_baselineId_fkey` FOREIGN KEY (`baselineId`) REFERENCES `baselines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `baseline_items` ADD CONSTRAINT `baseline_items_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `baseline_items` ADD CONSTRAINT `baseline_items_itemVersionId_fkey` FOREIGN KEY (`itemVersionId`) REFERENCES `configuration_item_versions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_reportedById_fkey` FOREIGN KEY (`reportedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_affectedItemId_fkey` FOREIGN KEY (`affectedItemId`) REFERENCES `configuration_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_requests` ADD CONSTRAINT `change_requests_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_requests` ADD CONSTRAINT `change_requests_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_requests` ADD CONSTRAINT `change_requests_alignedById_fkey` FOREIGN KEY (`alignedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_requests` ADD CONSTRAINT `change_requests_originIncidentId_fkey` FOREIGN KEY (`originIncidentId`) REFERENCES `incidents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_request_items` ADD CONSTRAINT `change_request_items_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_request_items` ADD CONSTRAINT `change_request_items_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `impact_assessments` ADD CONSTRAINT `impact_assessments_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `impact_assessments` ADD CONSTRAINT `impact_assessments_assessedById_fkey` FOREIGN KEY (`assessedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technical_approvals` ADD CONSTRAINT `technical_approvals_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `technical_approvals` ADD CONSTRAINT `technical_approvals_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ccb_reviews` ADD CONSTRAINT `ccb_reviews_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ccb_votes` ADD CONSTRAINT `ccb_votes_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `ccb_reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ccb_votes` ADD CONSTRAINT `ccb_votes_voterId_fkey` FOREIGN KEY (`voterId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ccb_resolutions` ADD CONSTRAINT `ccb_resolutions_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `ccb_reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ccb_resolutions` ADD CONSTRAINT `ccb_resolutions_issuedById_fkey` FOREIGN KEY (`issuedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_orders` ADD CONSTRAINT `change_orders_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_orders` ADD CONSTRAINT `change_orders_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_orders` ADD CONSTRAINT `change_orders_developerId_fkey` FOREIGN KEY (`developerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `methodology_phases` ADD CONSTRAINT `methodology_phases_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `methodology_phases` ADD CONSTRAINT `methodology_phases_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_activities` ADD CONSTRAINT `project_activities_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_activities` ADD CONSTRAINT `project_activities_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `methodology_phases`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_activities` ADD CONSTRAINT `project_activities_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_sprints` ADD CONSTRAINT `project_sprints_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_items` ADD CONSTRAINT `work_items_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_items` ADD CONSTRAINT `work_items_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_items` ADD CONSTRAINT `work_items_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_items` ADD CONSTRAINT `work_items_sprintId_fkey` FOREIGN KEY (`sprintId`) REFERENCES `project_sprints`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_items` ADD CONSTRAINT `work_items_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `project_activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_items` ADD CONSTRAINT `work_items_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_items` ADD CONSTRAINT `work_items_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_item_links` ADD CONSTRAINT `work_item_links_sourceWorkItemId_fkey` FOREIGN KEY (`sourceWorkItemId`) REFERENCES `work_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_item_links` ADD CONSTRAINT `work_item_links_targetWorkItemId_fkey` FOREIGN KEY (`targetWorkItemId`) REFERENCES `work_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_item_links` ADD CONSTRAINT `work_item_links_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_work_logs` ADD CONSTRAINT `daily_work_logs_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_work_logs` ADD CONSTRAINT `daily_work_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_work_logs` ADD CONSTRAINT `daily_work_logs_workItemId_fkey` FOREIGN KEY (`workItemId`) REFERENCES `work_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_work_logs` ADD CONSTRAINT `daily_work_logs_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_work_logs` ADD CONSTRAINT `daily_work_logs_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `project_activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_order_assignments` ADD CONSTRAINT `change_order_assignments_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_order_assignments` ADD CONSTRAINT `change_order_assignments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_tests` ADD CONSTRAINT `unit_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_tests` ADD CONSTRAINT `unit_tests_itemVersionId_fkey` FOREIGN KEY (`itemVersionId`) REFERENCES `configuration_item_versions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_tests` ADD CONSTRAINT `unit_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qa_tests` ADD CONSTRAINT `qa_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qa_tests` ADD CONSTRAINT `qa_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `defects` ADD CONSTRAINT `defects_qaTestId_fkey` FOREIGN KEY (`qaTestId`) REFERENCES `qa_tests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `defects` ADD CONSTRAINT `defects_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `defects` ADD CONSTRAINT `defects_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `defects` ADD CONSTRAINT `defects_itemVersionId_fkey` FOREIGN KEY (`itemVersionId`) REFERENCES `configuration_item_versions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `defects` ADD CONSTRAINT `defects_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uat_tests` ADD CONSTRAINT `uat_tests_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uat_tests` ADD CONSTRAINT `uat_tests_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uat_tests` ADD CONSTRAINT `uat_tests_executedById_fkey` FOREIGN KEY (`executedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acceptance_records` ADD CONSTRAINT `acceptance_records_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acceptance_records` ADD CONSTRAINT `acceptance_records_uatTestId_fkey` FOREIGN KEY (`uatTestId`) REFERENCES `uat_tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acceptance_records` ADD CONSTRAINT `acceptance_records_signedById_fkey` FOREIGN KEY (`signedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `releases` ADD CONSTRAINT `releases_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `releases` ADD CONSTRAINT `releases_changeRequestId_fkey` FOREIGN KEY (`changeRequestId`) REFERENCES `change_requests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `releases` ADD CONSTRAINT `releases_changeOrderId_fkey` FOREIGN KEY (`changeOrderId`) REFERENCES `change_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `releases` ADD CONSTRAINT `releases_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `release_logs` ADD CONSTRAINT `release_logs_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `releases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `release_logs` ADD CONSTRAINT `release_logs_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `integrity_alerts` ADD CONSTRAINT `integrity_alerts_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `integrity_alerts` ADD CONSTRAINT `integrity_alerts_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `configuration_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `traceability_links` ADD CONSTRAINT `traceability_links_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `traceability_links` ADD CONSTRAINT `traceability_links_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `attachments_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `attachments_uploadedById_fkey` FOREIGN KEY (`uploadedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
