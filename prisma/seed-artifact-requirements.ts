import { prisma } from "../src/lib/prisma";

type MethodologyType = "RUP" | "SCRUM" | "KANBAN" | "CASCADA" | "XP" | "CUSTOM";
type Stage = "ANALYSIS" | "DESIGN" | "IMPLEMENTATION";
type Kind =
  | "STAKEHOLDER_INTERVIEW"
  | "REQUIREMENT_SPEC"
  | "USE_CASE"
  | "USER_STORY"
  | "ACCEPTANCE_CRITERIA"
  | "BACKLOG_ITEM"
  | "PROCESS_POLICY"
  | "DOMAIN_MODEL"
  | "ARCHITECTURE_DOC"
  | "CLASS_DIAGRAM"
  | "SEQUENCE_DIAGRAM"
  | "DATA_MODEL"
  | "API_CONTRACT"
  | "UI_PROTOTYPE"
  | "SOURCE_CODE"
  | "DATABASE_SCRIPT"
  | "BUILD_SCRIPT"
  | "CONFIGURATION_FILE"
  | "UNIT_TEST_EVIDENCE"
  | "QA_TEST_CASE"
  | "RELEASE_NOTE"
  | "OTHER";
type ConfigType = "CODE" | "DOCUMENT" | "SCRIPT" | "MODEL" | "CONFIGURATION" | "OTHER";
type Library = "WORK" | "INTEGRATION" | "SUPPORT" | "MASTER";

type RequirementSeed = {
  methodologyType: MethodologyType;
  lifecycleStage: Stage;
  artifactKind: Kind;
  configItemType: ConfigType;
  libraryType: Library;
  name: string;
  description: string;
  role: string;
  required?: boolean;
  requiresQaApproval?: boolean;
};

const byMethodology: Record<MethodologyType, RequirementSeed[]> = {
  RUP: [
    req("RUP", "ANALYSIS", "STAKEHOLDER_INTERVIEW", "DOCUMENT", "WORK", "Entrevista del interesado", "Acta o notas de entrevista con necesidades, restricciones y criterios de aceptacion iniciales.", "JEFE_PROYECTO"),
    req("RUP", "ANALYSIS", "REQUIREMENT_SPEC", "DOCUMENT", "WORK", "Requisitos afectados", "SRS o seccion del SRS actualizada con requisitos funcionales/no funcionales afectados.", "JEFE_PROYECTO"),
    req("RUP", "ANALYSIS", "USE_CASE", "MODEL", "WORK", "Casos de uso afectados", "Diagrama y narrativas de casos de uso impactados por el cambio.", "JEFE_PROYECTO"),
    req("RUP", "DESIGN", "ARCHITECTURE_DOC", "DOCUMENT", "WORK", "Diseno arquitectonico afectado", "SAD o seccion de arquitectura actualizada con decisiones y componentes afectados.", "LIDER_TECNICO"),
    req("RUP", "DESIGN", "CLASS_DIAGRAM", "MODEL", "WORK", "Diagrama de clases", "Diagrama de clases actualizado para el modulo o requerimiento.", "LIDER_TECNICO"),
    req("RUP", "DESIGN", "SEQUENCE_DIAGRAM", "MODEL", "WORK", "Diagrama de secuencia", "Secuencia de interacciones del caso de uso o flujo modificado.", "LIDER_TECNICO"),
    req("RUP", "DESIGN", "DATA_MODEL", "MODEL", "WORK", "Modelo de datos", "Modelo de datos actualizado si el cambio toca entidades, tablas o contratos persistentes.", "LIDER_TECNICO", false),
    req("RUP", "IMPLEMENTATION", "SOURCE_CODE", "CODE", "WORK", "Codigo implementado", "Version del codigo fuente asociado al requerimiento o modulo.", "DESARROLLADOR"),
    req("RUP", "IMPLEMENTATION", "UNIT_TEST_EVIDENCE", "DOCUMENT", "SUPPORT", "Evidencia de pruebas unitarias", "Resultado de pruebas unitarias y comandos ejecutados.", "DESARROLLADOR")
  ],
  SCRUM: [
    req("SCRUM", "ANALYSIS", "USER_STORY", "DOCUMENT", "WORK", "Historia de usuario", "Historia con rol, necesidad, beneficio y criterios de aceptacion.", "JEFE_PROYECTO"),
    req("SCRUM", "ANALYSIS", "ACCEPTANCE_CRITERIA", "DOCUMENT", "WORK", "Criterios de aceptacion", "Criterios de aceptacion acordados con el interesado o product owner.", "JEFE_PROYECTO"),
    req("SCRUM", "ANALYSIS", "BACKLOG_ITEM", "DOCUMENT", "WORK", "Backlog refinado", "Detalle refinado del item, prioridad, alcance y dependencias.", "JEFE_PROYECTO"),
    req("SCRUM", "DESIGN", "UI_PROTOTYPE", "MODEL", "WORK", "Prototipo o flujo de pantalla", "Prototipo, wireframe o flujo de interaccion si aplica.", "LIDER_TECNICO", false),
    req("SCRUM", "DESIGN", "API_CONTRACT", "DOCUMENT", "WORK", "Contrato tecnico", "Contrato de API, eventos, componentes o interfaces afectadas.", "LIDER_TECNICO"),
    req("SCRUM", "DESIGN", "SEQUENCE_DIAGRAM", "MODEL", "WORK", "Secuencia del flujo", "Diagrama de secuencia del flujo principal o alterno tocado.", "LIDER_TECNICO"),
    req("SCRUM", "IMPLEMENTATION", "SOURCE_CODE", "CODE", "WORK", "Incremento de codigo", "Version del incremento de codigo asociado a la historia.", "DESARROLLADOR"),
    req("SCRUM", "IMPLEMENTATION", "UNIT_TEST_EVIDENCE", "DOCUMENT", "SUPPORT", "Evidencia de pruebas", "Evidencia de pruebas unitarias y validaciones del incremento.", "DESARROLLADOR")
  ],
  KANBAN: [
    req("KANBAN", "ANALYSIS", "BACKLOG_ITEM", "DOCUMENT", "WORK", "Item listo para flujo", "Descripcion del item, criterio de preparado y alcance.", "JEFE_PROYECTO"),
    req("KANBAN", "ANALYSIS", "ACCEPTANCE_CRITERIA", "DOCUMENT", "WORK", "Criterios de salida", "Criterios para mover el item entre columnas y considerarlo terminado.", "JEFE_PROYECTO"),
    req("KANBAN", "DESIGN", "API_CONTRACT", "DOCUMENT", "WORK", "Diseno tecnico ligero", "Contrato, interfaz, componente o decision tecnica del item.", "LIDER_TECNICO"),
    req("KANBAN", "DESIGN", "SEQUENCE_DIAGRAM", "MODEL", "WORK", "Flujo afectado", "Secuencia o flujo de trabajo afectado por el item.", "LIDER_TECNICO", false),
    req("KANBAN", "IMPLEMENTATION", "SOURCE_CODE", "CODE", "WORK", "Cambio versionado", "Codigo o script versionado que implementa el item.", "DESARROLLADOR"),
    req("KANBAN", "IMPLEMENTATION", "UNIT_TEST_EVIDENCE", "DOCUMENT", "SUPPORT", "Evidencia de validacion", "Pruebas unitarias, checklist o evidencia de validacion.", "DESARROLLADOR")
  ],
  CASCADA: [
    req("CASCADA", "ANALYSIS", "REQUIREMENT_SPEC", "DOCUMENT", "WORK", "Requisito aprobado", "Requisito actualizado y aprobado antes de pasar a diseno.", "JEFE_PROYECTO"),
    req("CASCADA", "ANALYSIS", "USE_CASE", "MODEL", "WORK", "Caso de uso o especificacion funcional", "Caso de uso, flujo funcional o especificacion detallada del cambio.", "JEFE_PROYECTO"),
    req("CASCADA", "DESIGN", "ARCHITECTURE_DOC", "DOCUMENT", "WORK", "Documento de diseno", "Diseno tecnico aprobado para implementar el requisito.", "LIDER_TECNICO"),
    req("CASCADA", "DESIGN", "CLASS_DIAGRAM", "MODEL", "WORK", "Modelo de clases", "Modelo de clases o componentes actualizado.", "LIDER_TECNICO"),
    req("CASCADA", "DESIGN", "DATA_MODEL", "MODEL", "WORK", "Modelo de datos", "Modelo de datos actualizado si corresponde.", "LIDER_TECNICO", false),
    req("CASCADA", "IMPLEMENTATION", "SOURCE_CODE", "CODE", "WORK", "Codigo implementado", "Codigo versionado segun el diseno aprobado.", "DESARROLLADOR"),
    req("CASCADA", "IMPLEMENTATION", "UNIT_TEST_EVIDENCE", "DOCUMENT", "SUPPORT", "Evidencia de pruebas", "Pruebas unitarias y evidencia de cumplimiento.", "DESARROLLADOR")
  ],
  XP: [
    req("XP", "ANALYSIS", "USER_STORY", "DOCUMENT", "WORK", "Historia XP", "Historia del cliente con conversacion y confirmacion.", "JEFE_PROYECTO"),
    req("XP", "ANALYSIS", "ACCEPTANCE_CRITERIA", "DOCUMENT", "WORK", "Pruebas de aceptacion", "Criterios o pruebas de aceptacion esperadas por el usuario.", "QA"),
    req("XP", "DESIGN", "API_CONTRACT", "DOCUMENT", "WORK", "Diseno simple", "Diseno simple, contrato o decision tecnica suficiente para implementar.", "LIDER_TECNICO"),
    req("XP", "DESIGN", "CLASS_DIAGRAM", "MODEL", "WORK", "Modelo simple", "Modelo de clases/componentes cuando aclare el cambio.", "LIDER_TECNICO", false),
    req("XP", "IMPLEMENTATION", "SOURCE_CODE", "CODE", "WORK", "Codigo con pruebas", "Codigo versionado del cambio.", "DESARROLLADOR"),
    req("XP", "IMPLEMENTATION", "UNIT_TEST_EVIDENCE", "DOCUMENT", "SUPPORT", "Pruebas automatizadas", "Evidencia de pruebas unitarias o TDD asociada.", "DESARROLLADOR")
  ],
  CUSTOM: [
    req("CUSTOM", "ANALYSIS", "STAKEHOLDER_INTERVIEW", "DOCUMENT", "WORK", "Levantamiento del interesado", "Notas, entrevista o solicitud detallada del interesado.", "JEFE_PROYECTO"),
    req("CUSTOM", "ANALYSIS", "REQUIREMENT_SPEC", "DOCUMENT", "WORK", "Requisitos afectados", "Requisitos o reglas de negocio afectados por el cambio.", "JEFE_PROYECTO"),
    req("CUSTOM", "DESIGN", "ARCHITECTURE_DOC", "DOCUMENT", "WORK", "Diseno tecnico", "Diseno tecnico suficiente para traducir el analisis a implementacion.", "LIDER_TECNICO"),
    req("CUSTOM", "DESIGN", "SEQUENCE_DIAGRAM", "MODEL", "WORK", "Flujo tecnico", "Flujo, secuencia o contrato del cambio.", "LIDER_TECNICO", false),
    req("CUSTOM", "IMPLEMENTATION", "SOURCE_CODE", "CODE", "WORK", "Codigo implementado", "Codigo o configuracion versionada.", "DESARROLLADOR"),
    req("CUSTOM", "IMPLEMENTATION", "UNIT_TEST_EVIDENCE", "DOCUMENT", "SUPPORT", "Evidencia de pruebas", "Pruebas o validaciones del cambio.", "DESARROLLADOR")
  ]
};

function req(
  methodologyType: MethodologyType,
  lifecycleStage: Stage,
  artifactKind: Kind,
  configItemType: ConfigType,
  libraryType: Library,
  name: string,
  description: string,
  role: string,
  required = true,
  requiresQaApproval = true
): RequirementSeed {
  return { methodologyType, lifecycleStage, artifactKind, configItemType, libraryType, name, description, role, required, requiresQaApproval };
}

async function main() {
  const roles = await prisma.role.findMany();
  const rolesBySlug = new Map(roles.map((role) => [role.slug, role.id]));

  for (const [methodologyType, requirements] of Object.entries(byMethodology) as Array<[MethodologyType, RequirementSeed[]]>) {
    for (const [index, requirement] of requirements.entries()) {
      const catalog = await prisma.configurationItemCatalog.findFirst({
        where: {
          methodologyType,
          artifactKind: requirement.artifactKind,
          lifecycleStage: requirement.lifecycleStage,
          active: true
        }
      });

      await prisma.methodologyArtifactRequirement.upsert({
        where: {
          methodologyType_lifecycleStage_artifactKind_name: {
            methodologyType,
            lifecycleStage: requirement.lifecycleStage,
            artifactKind: requirement.artifactKind,
            name: requirement.name
          }
        },
        create: {
          methodologyType,
          lifecycleStage: requirement.lifecycleStage,
          artifactKind: requirement.artifactKind,
          catalogItemId: catalog?.id,
          configItemType: requirement.configItemType,
          libraryType: requirement.libraryType,
          name: requirement.name,
          description: requirement.description,
          required: requirement.required ?? true,
          requiresQaApproval: requirement.requiresQaApproval ?? true,
          responsibleRoleId: rolesBySlug.get(requirement.role),
          sortOrder: index + 1
        },
        update: {
          catalogItemId: catalog?.id,
          configItemType: requirement.configItemType,
          libraryType: requirement.libraryType,
          description: requirement.description,
          required: requirement.required ?? true,
          requiresQaApproval: requirement.requiresQaApproval ?? true,
          responsibleRoleId: rolesBySlug.get(requirement.role),
          sortOrder: index + 1,
          active: true
        }
      });
    }
  }

  const counts = await prisma.methodologyArtifactRequirement.groupBy({
    by: ["methodologyType"],
    _count: { _all: true },
    orderBy: { methodologyType: "asc" }
  });
  console.log(JSON.stringify(counts, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
