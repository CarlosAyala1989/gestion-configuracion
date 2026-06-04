DROP TRIGGER IF EXISTS trg_work_items_create_artifact_requirements_ai;
DROP TRIGGER IF EXISTS trg_qa_tests_require_artifacts_bi;

DELIMITER //

CREATE TRIGGER trg_work_items_create_artifact_requirements_ai
AFTER INSERT ON work_items
FOR EACH ROW
BEGIN
  INSERT INTO work_item_artifact_requirements (
    id,
    workItemId,
    sourceRequirementId,
    lifecycleStage,
    artifactKind,
    configItemType,
    libraryType,
    name,
    description,
    required,
    requiresQaApproval,
    sortOrder,
    createdAt,
    updatedAt
  )
  SELECT
    UUID(),
    NEW.id,
    req.id,
    req.lifecycleStage,
    req.artifactKind,
    req.configItemType,
    req.libraryType,
    req.name,
    req.description,
    req.required,
    req.requiresQaApproval,
    req.sortOrder,
    CURRENT_TIMESTAMP(3),
    CURRENT_TIMESTAMP(3)
  FROM methodology_artifact_requirements req
  INNER JOIN projects p ON p.id = NEW.projectId
  WHERE req.active = 1
    AND req.methodologyType = COALESCE(p.methodologyType, 'CUSTOM');
END//

CREATE TRIGGER trg_qa_tests_require_artifacts_bi
BEFORE INSERT ON qa_tests
FOR EACH ROW
BEGIN
  IF COALESCE(@sgcsw_skip_artifact_qa_gate, 0) <> 1 AND NEW.result = 'PASSED' THEN
    IF NOT EXISTS (
      SELECT 1
      FROM work_items wi
      INNER JOIN change_orders co ON co.id = NEW.changeOrderId
      WHERE wi.projectId = co.projectId
        AND (wi.changeOrderId = co.id OR wi.changeRequestId = co.changeRequestId)
    ) THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'QA no puede aprobar: la orden debe tener al menos un requerimiento/backlog asociado.';
    END IF;

    IF EXISTS (
      SELECT 1
      FROM work_item_artifact_requirements req
      INNER JOIN work_items wi ON wi.id = req.workItemId
      INNER JOIN change_orders co ON co.id = NEW.changeOrderId
      WHERE req.required = 1
        AND req.requiresQaApproval = 1
        AND wi.projectId = co.projectId
        AND (wi.changeOrderId = co.id OR wi.changeRequestId = co.changeRequestId)
        AND req.status <> 'QA_APPROVED'
    ) THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'QA no puede aprobar: faltan artefactos de analisis, diseno o codigo versionados y aprobados.';
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM work_item_artifact_requirements req
      INNER JOIN work_items wi ON wi.id = req.workItemId
      INNER JOIN change_orders co ON co.id = NEW.changeOrderId
      WHERE req.required = 1
        AND wi.projectId = co.projectId
        AND (wi.changeOrderId = co.id OR wi.changeRequestId = co.changeRequestId)
        AND req.lifecycleStage = 'IMPLEMENTATION'
        AND req.status = 'QA_APPROVED'
    ) THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'QA no puede aprobar: falta una version de codigo o implementacion aprobada.';
    END IF;
  END IF;
END//

DELIMITER ;
