DROP TRIGGER IF EXISTS trg_work_items_lock_project_setup_bi;
DROP TRIGGER IF EXISTS trg_projects_prevent_setup_update_bu;
DROP TRIGGER IF EXISTS trg_project_users_prevent_locked_insert_bi;
DROP TRIGGER IF EXISTS trg_project_users_prevent_locked_update_bu;
DROP TRIGGER IF EXISTS trg_project_users_prevent_locked_delete_bd;
DROP TRIGGER IF EXISTS trg_methodology_phases_prevent_locked_insert_bi;
DROP TRIGGER IF EXISTS trg_methodology_phases_prevent_locked_update_bu;
DROP TRIGGER IF EXISTS trg_methodology_phases_prevent_locked_delete_bd;
DROP TRIGGER IF EXISTS trg_project_activities_prevent_locked_insert_bi;
DROP TRIGGER IF EXISTS trg_project_activities_prevent_locked_update_bu;
DROP TRIGGER IF EXISTS trg_project_activities_prevent_locked_delete_bd;
DROP TRIGGER IF EXISTS trg_config_item_plans_prevent_locked_insert_bi;
DROP TRIGGER IF EXISTS trg_config_item_plans_prevent_locked_update_bu;
DROP TRIGGER IF EXISTS trg_config_item_plans_prevent_locked_delete_bd;

DELIMITER //

CREATE TRIGGER trg_work_items_lock_project_setup_bi
BEFORE INSERT ON work_items
FOR EACH ROW
BEGIN
  UPDATE projects
  SET
    setupStatus = 'LOCKED',
    setupLockedAt = COALESCE(setupLockedAt, CURRENT_TIMESTAMP(3)),
    setupLockedById = COALESCE(setupLockedById, NEW.createdById),
    setupLockReason = COALESCE(setupLockReason, 'FIRST_WORK_ITEM')
  WHERE id = NEW.projectId
    AND setupLockedAt IS NULL
    AND COALESCE(@sgcsw_skip_setup_lock, 0) <> 1;
END//

CREATE TRIGGER trg_projects_prevent_setup_update_bu
BEFORE UPDATE ON projects
FOR EACH ROW
BEGIN
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
END//

CREATE TRIGGER trg_project_users_prevent_locked_insert_bi
BEFORE INSERT ON project_users
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el equipo: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_project_users_prevent_locked_update_bu
BEFORE UPDATE ON project_users
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el equipo: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_project_users_prevent_locked_delete_bd
BEFORE DELETE ON project_users
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el equipo: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_methodology_phases_prevent_locked_insert_bi
BEFORE INSERT ON methodology_phases
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la metodologia: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_methodology_phases_prevent_locked_update_bu
BEFORE UPDATE ON methodology_phases
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la metodologia: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_methodology_phases_prevent_locked_delete_bd
BEFORE DELETE ON methodology_phases
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la metodologia: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_project_activities_prevent_locked_insert_bi
BEFORE INSERT ON project_activities
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el cronograma: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_project_activities_prevent_locked_update_bu
BEFORE UPDATE ON project_activities
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el cronograma: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_project_activities_prevent_locked_delete_bd
BEFORE DELETE ON project_activities
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar el cronograma: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_config_item_plans_prevent_locked_insert_bi
BEFORE INSERT ON project_configuration_item_plans
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = NEW.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la seleccion ECS inicial: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_config_item_plans_prevent_locked_update_bu
BEFORE UPDATE ON project_configuration_item_plans
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la seleccion ECS inicial: el proyecto ya tiene tareas.';
  END IF;
END//

CREATE TRIGGER trg_config_item_plans_prevent_locked_delete_bd
BEFORE DELETE ON project_configuration_item_plans
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_setup_lock, 0) <> 1 AND EXISTS (SELECT 1 FROM projects WHERE id = OLD.projectId AND setupLockedAt IS NOT NULL) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede modificar la seleccion ECS inicial: el proyecto ya tiene tareas.';
  END IF;
END//

DELIMITER ;
