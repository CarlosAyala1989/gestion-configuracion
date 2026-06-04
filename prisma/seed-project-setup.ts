import { prisma } from "../src/lib/prisma";

type MethodologySeed = {
  type: "RUP" | "SCRUM" | "KANBAN" | "CASCADA" | "XP" | "CUSTOM";
  durationDays: number;
  phases: Array<{
    name: string;
    startOffsetDays: number;
    durationDays: number;
    ownerRole: string;
    deliverables: string;
    acceptance: string;
  }>;
  activities: Array<{
    phase: string;
    title: string;
    startOffsetDays: number;
    durationDays: number;
    role: string;
    deliverable: string;
  }>;
  items: Array<{
    code: string;
    type: "CODE" | "DOCUMENT" | "SCRIPT" | "MODEL" | "CONFIGURATION" | "OTHER";
    name: string;
    description: string;
    library: "WORK" | "INTEGRATION" | "SUPPORT" | "MASTER";
    role: string;
    required?: boolean;
  }>;
};

type PhaseTuple = readonly [string, number, number, string, string, string];
type ActivityTuple = readonly [string, string, number, number, string, string];
type ItemTuple = readonly [
  string,
  "CODE" | "DOCUMENT" | "SCRIPT" | "MODEL" | "CONFIGURATION" | "OTHER",
  string,
  string,
  "WORK" | "INTEGRATION" | "SUPPORT" | "MASTER",
  string,
  boolean?
];

function toPhases(rows: readonly PhaseTuple[]): MethodologySeed["phases"] {
  return rows.map(([name, startOffsetDays, durationDays, ownerRole, deliverables, acceptance]) => ({
    name,
    startOffsetDays,
    durationDays,
    ownerRole,
    deliverables,
    acceptance
  }));
}

function toActivities(rows: readonly ActivityTuple[]): MethodologySeed["activities"] {
  return rows.map(([phase, title, startOffsetDays, durationDays, role, deliverable]) => ({
    phase,
    title,
    startOffsetDays,
    durationDays,
    role,
    deliverable
  }));
}

function toItems(rows: readonly ItemTuple[]): MethodologySeed["items"] {
  return rows.map(([code, type, name, description, library, role, required]) => ({
    code,
    type,
    name,
    description,
    library,
    role,
    required
  }));
}

const commonItems = [
  ["SRC", "CODE", "Codigo fuente", "Codigo fuente principal del producto.", "WORK", "DESARROLLADOR"],
  ["BUILD", "SCRIPT", "Script de build", "Scripts para compilar, empaquetar o ejecutar pipelines.", "INTEGRATION", "DESARROLLADOR"],
  ["TEST-PLAN", "DOCUMENT", "Plan de pruebas", "Estrategia, alcance y criterios de pruebas.", "SUPPORT", "QA"],
  ["TEST-CASES", "DOCUMENT", "Casos de prueba", "Casos funcionales, integracion, regresion y aceptacion.", "SUPPORT", "QA"],
  ["RELEASE-NOTES", "DOCUMENT", "Notas de version", "Resumen de cambios, riesgos y compatibilidad de la entrega.", "MASTER", "BIBLIOTECARIO"]
] as const satisfies readonly ItemTuple[];

const seeds: MethodologySeed[] = [
  {
    type: "RUP",
    durationDays: 60,
    phases: toPhases([
      ["Inicio", 0, 10, "JEFE_PROYECTO", "Vision; alcance; caso de negocio; plan SCM inicial.", "Alcance, riesgos y responsables aprobados."],
      ["Elaboracion", 10, 15, "LIDER_TECNICO", "SRS; casos de uso; SAD; modelos UML.", "Arquitectura y requisitos versionados como ECS."],
      ["Construccion", 25, 20, "DESARROLLADOR", "Incrementos; pruebas unitarias; ramas; lineas base.", "Incrementos versionados y listos para QA."],
      ["Transicion", 45, 15, "QA", "UAT; acta de aceptacion; release; cierre.", "Entrega aceptada y liberada con trazabilidad."]
    ]),
    activities: toActivities([
      ["Inicio", "Definir alcance y plan SCM", 0, 5, "JEFE_PROYECTO", "Plan SCM inicial"],
      ["Elaboracion", "Elaborar SRS y casos de uso", 10, 8, "JEFE_PROYECTO", "SRS y modelo de casos de uso"],
      ["Elaboracion", "Disenar arquitectura y modelos", 15, 10, "LIDER_TECNICO", "SAD, clases y secuencias"],
      ["Construccion", "Implementar incrementos", 25, 15, "DESARROLLADOR", "Codigo fuente versionado"],
      ["Transicion", "Ejecutar UAT y release", 45, 10, "QA", "Acta de aceptacion y release"]
    ]),
    items: toItems([
      ["VISION", "DOCUMENT", "Documento de vision", "Objetivos, alcance, actores y restricciones del producto.", "WORK", "JEFE_PROYECTO"],
      ["SRS", "DOCUMENT", "Especificacion de requisitos", "Requisitos funcionales/no funcionales, reglas y trazabilidad.", "WORK", "JEFE_PROYECTO"],
      ["USE-CASE", "MODEL", "Modelo de casos de uso", "Diagramas y narrativas de casos de uso.", "WORK", "JEFE_PROYECTO"],
      ["SAD", "DOCUMENT", "Documento de arquitectura", "Componentes, decisiones tecnicas y vistas arquitectonicas.", "WORK", "LIDER_TECNICO"],
      ["CLASS-DIAGRAM", "MODEL", "Diagrama de clases", "Modelo de clases y relaciones principales.", "WORK", "LIDER_TECNICO"],
      ["SEQUENCE-DIAGRAM", "MODEL", "Diagramas de secuencia", "Interacciones de escenarios clave.", "WORK", "LIDER_TECNICO"],
      ["DB-MODEL", "MODEL", "Modelo de datos", "Modelo logico/fisico de datos y restricciones.", "WORK", "LIDER_TECNICO"],
      ...commonItems,
      ["UAT", "DOCUMENT", "Evidencia UAT", "Pruebas de aceptacion y acta firmada.", "MASTER", "QA"]
    ])
  },
  {
    type: "SCRUM",
    durationDays: 30,
    phases: toPhases([
      ["Product Backlog", 0, 5, "JEFE_PROYECTO", "Backlog, epicas, historias y criterios.", "Backlog priorizado y listo para planning."],
      ["Sprint Planning", 5, 3, "JEFE_PROYECTO", "Sprint, objetivo, capacidad y compromiso.", "Sprint planificado con responsables."],
      ["Ejecucion y Review", 8, 17, "DESARROLLADOR", "Incremento, PRs, pruebas y demo.", "Incremento probado y revisado."],
      ["Retrospectiva", 25, 5, "QA", "Lecciones y acciones de mejora.", "Acciones registradas para siguiente ciclo."]
    ]),
    activities: toActivities([
      ["Product Backlog", "Refinar historias", 0, 4, "JEFE_PROYECTO", "Historias priorizadas"],
      ["Sprint Planning", "Planificar sprint", 5, 2, "JEFE_PROYECTO", "Sprint backlog"],
      ["Ejecucion y Review", "Implementar historias", 8, 12, "DESARROLLADOR", "Incremento funcional"],
      ["Ejecucion y Review", "Validar incremento", 18, 5, "QA", "Evidencia QA"],
      ["Retrospectiva", "Registrar mejoras", 25, 2, "QA", "Acciones de mejora"]
    ]),
    items: toItems([
      ["PRODUCT-BACKLOG", "DOCUMENT", "Product Backlog", "Lista priorizada de epicas, features e historias.", "WORK", "JEFE_PROYECTO"],
      ["SPRINT-BACKLOG", "DOCUMENT", "Sprint Backlog", "Items comprometidos, capacidad y objetivo del sprint.", "WORK", "JEFE_PROYECTO"],
      ["USER-STORIES", "DOCUMENT", "Historias de usuario", "Historias con criterios de aceptacion y estimacion.", "WORK", "JEFE_PROYECTO"],
      ["DOD", "CONFIGURATION", "Definition of Done", "Criterios de terminado del equipo.", "SUPPORT", "QA"],
      ["BURNDOWN", "DOCUMENT", "Burndown / avance", "Seguimiento de avance del sprint.", "SUPPORT", "JEFE_PROYECTO"],
      ...commonItems,
      ["RETRO", "DOCUMENT", "Retrospectiva", "Lecciones y acciones de mejora.", "SUPPORT", "QA"]
    ])
  },
  {
    type: "KANBAN",
    durationDays: 30,
    phases: toPhases([
      ["Entrada", 0, 5, "JEFE_PROYECTO", "Backlog, politicas y criterios de preparado.", "Items listos para flujo."],
      ["En progreso", 5, 15, "DESARROLLADOR", "Trabajo asignado, ramas y reportes.", "WIP controlado y visible."],
      ["Validacion", 20, 7, "QA", "PR, pruebas, UAT y evidencias.", "Items validados sin defectos criticos."],
      ["Hecho", 27, 3, "BIBLIOTECARIO", "Release, linea base y cierre.", "Entrega cerrada con trazabilidad."]
    ]),
    activities: toActivities([
      ["Entrada", "Definir politicas Kanban", 0, 3, "JEFE_PROYECTO", "Politicas y WIP"],
      ["En progreso", "Ejecutar flujo de trabajo", 5, 12, "DESARROLLADOR", "Items versionados"],
      ["Validacion", "Validar y corregir", 20, 5, "QA", "Evidencia de pruebas"],
      ["Hecho", "Cerrar y liberar", 27, 2, "BIBLIOTECARIO", "Linea base y release"]
    ]),
    items: toItems([
      ["KANBAN-POLICIES", "CONFIGURATION", "Politicas Kanban", "Politicas explicitas, limites WIP y criterios de flujo.", "WORK", "JEFE_PROYECTO"],
      ["BOARD", "CONFIGURATION", "Tablero Kanban", "Columnas, estados y reglas del tablero.", "WORK", "JEFE_PROYECTO"],
      ["FLOW-METRICS", "DOCUMENT", "Metricas de flujo", "Lead time, cycle time, throughput y bloqueos.", "SUPPORT", "JEFE_PROYECTO"],
      ["BLOCKERS", "DOCUMENT", "Registro de bloqueos", "Bloqueos y acciones de desbloqueo.", "SUPPORT", "JEFE_PROYECTO"],
      ...commonItems
    ])
  },
  {
    type: "CASCADA",
    durationDays: 50,
    phases: toPhases([
      ["Requisitos", 0, 10, "JEFE_PROYECTO", "SRS, alcance y criterios.", "Requisitos aprobados."],
      ["Diseno", 10, 12, "LIDER_TECNICO", "SAD, modelos y plan de pruebas.", "Diseno completo y aprobado."],
      ["Implementacion", 22, 18, "DESARROLLADOR", "Codigo, scripts y pruebas unitarias.", "Implementacion versionada."],
      ["Pruebas y despliegue", 40, 10, "QA", "QA, UAT, release y cierre.", "Producto probado y desplegado."]
    ]),
    activities: toActivities([
      ["Requisitos", "Aprobar requisitos", 0, 8, "JEFE_PROYECTO", "SRS aprobado"],
      ["Diseno", "Cerrar diseno tecnico", 10, 10, "LIDER_TECNICO", "SAD aprobado"],
      ["Implementacion", "Construir producto", 22, 15, "DESARROLLADOR", "Codigo versionado"],
      ["Pruebas y despliegue", "Probar y liberar", 40, 8, "QA", "Release aprobado"]
    ]),
    items: toItems([
      ["SRS", "DOCUMENT", "Especificacion de requisitos", "Requisitos completos y aprobados.", "WORK", "JEFE_PROYECTO"],
      ["SAD", "DOCUMENT", "Diseno de arquitectura", "Arquitectura, componentes e interfaces.", "WORK", "LIDER_TECNICO"],
      ["DESIGN-MODELS", "MODEL", "Modelos de diseno", "Modelos UML, datos e interfaces.", "WORK", "LIDER_TECNICO"],
      ["DEPLOYMENT-PLAN", "DOCUMENT", "Plan de despliegue", "Pasos, responsables y contingencia.", "MASTER", "BIBLIOTECARIO"],
      ...commonItems
    ])
  },
  {
    type: "XP",
    durationDays: 25,
    phases: toPhases([
      ["Planificacion", 0, 4, "JEFE_PROYECTO", "Historias, release plan y criterios.", "Historias listas para iteracion."],
      ["Iteracion", 4, 12, "DESARROLLADOR", "Tareas, pares, pruebas y commits.", "Trabajo probado continuamente."],
      ["Integracion continua", 16, 6, "LIDER_TECNICO", "Integracion, PR y feedback.", "Cambios integrados sin regresiones."],
      ["Release", 22, 3, "QA", "Version, UAT y cierre.", "Release aceptado."]
    ]),
    activities: toActivities([
      ["Planificacion", "Priorizar historias XP", 0, 3, "JEFE_PROYECTO", "Release plan"],
      ["Iteracion", "Implementar con pruebas", 4, 10, "DESARROLLADOR", "Codigo y pruebas"],
      ["Integracion continua", "Integrar y revisar", 16, 5, "LIDER_TECNICO", "PR validado"],
      ["Release", "Liberar iteracion", 22, 2, "QA", "Release aceptado"]
    ]),
    items: toItems([
      ["USER-STORIES", "DOCUMENT", "Historias XP", "Historias, valores y criterios de aceptacion.", "WORK", "JEFE_PROYECTO"],
      ["RELEASE-PLAN", "DOCUMENT", "Release plan", "Iteraciones, alcance y prioridades.", "WORK", "JEFE_PROYECTO"],
      ["UNIT-TESTS", "CODE", "Pruebas unitarias", "Pruebas automatizadas del incremento.", "WORK", "DESARROLLADOR"],
      ["PAIRING-NOTES", "DOCUMENT", "Notas de pairing", "Registro de decisiones y aprendizaje tecnico.", "SUPPORT", "DESARROLLADOR", false],
      ...commonItems
    ])
  },
  {
    type: "CUSTOM",
    durationDays: 30,
    phases: toPhases([
      ["Preparacion", 0, 5, "JEFE_PROYECTO", "Alcance, equipo, cronograma y ECS inicial.", "Setup listo para ejecucion."],
      ["Ejecucion", 5, 20, "DESARROLLADOR", "Cambios, pruebas y evidencias.", "Trabajo versionado y validado."],
      ["Cierre", 25, 5, "QA", "Aceptacion, release y lecciones.", "Proyecto cerrado con trazabilidad."]
    ]),
    activities: toActivities([
      ["Preparacion", "Definir setup personalizado", 0, 4, "JEFE_PROYECTO", "Setup del proyecto"],
      ["Ejecucion", "Ejecutar trabajo planificado", 5, 15, "DESARROLLADOR", "Evidencia de trabajo"],
      ["Cierre", "Validar y cerrar", 25, 4, "QA", "Cierre aceptado"]
    ]),
    items: toItems([
      ["PLAN", "DOCUMENT", "Plan del proyecto", "Cronograma, alcance y responsables.", "WORK", "JEFE_PROYECTO"],
      ["REQUIREMENTS", "DOCUMENT", "Requisitos", "Requisitos y criterios definidos por el equipo.", "WORK", "JEFE_PROYECTO"],
      ["ARCHITECTURE", "DOCUMENT", "Arquitectura", "Diseno tecnico segun el proyecto.", "WORK", "LIDER_TECNICO"],
      ...commonItems
    ])
  }
];

async function roleBySlug() {
  const roles = await prisma.role.findMany();
  return new Map(roles.map((role) => [role.slug, role]));
}

async function main() {
  const roles = await roleBySlug();
  const admin = await prisma.user.findUnique({ where: { email: "carlosdaniel@gmail.com" } });

  for (const seed of seeds) {
    const template = await prisma.projectSetupTemplate.upsert({
      where: { name: `Plantilla base ${seed.type}` },
      create: {
        name: `Plantilla base ${seed.type}`,
        description: `Cronograma, equipo y ECS base para proyectos ${seed.type}.`,
        methodologyType: seed.type,
        methodologyNotes: `Plantilla inicial reutilizable para metodologia ${seed.type}.`,
        plannedDurationDays: seed.durationDays,
        createdById: admin?.id
      },
      update: {
        description: `Cronograma, equipo y ECS base para proyectos ${seed.type}.`,
        methodologyType: seed.type,
        methodologyNotes: `Plantilla inicial reutilizable para metodologia ${seed.type}.`,
        plannedDurationDays: seed.durationDays,
        status: "ACTIVE",
        updatedById: admin?.id
      }
    });

    const phases = new Map<string, { id: string }>();
    for (const [index, phase] of seed.phases.entries()) {
      const ownerRole = roles.get(phase.ownerRole);
      const saved = await prisma.projectSetupTemplatePhase.upsert({
        where: { templateId_name: { templateId: template.id, name: phase.name } },
        create: {
          templateId: template.id,
          name: phase.name,
          methodologyType: seed.type,
          sortOrder: index + 1,
          startOffsetDays: phase.startOffsetDays,
          durationDays: phase.durationDays,
          ownerRoleId: ownerRole?.id,
          requiredDeliverables: phase.deliverables,
          acceptanceCriteria: phase.acceptance
        },
        update: {
          methodologyType: seed.type,
          sortOrder: index + 1,
          startOffsetDays: phase.startOffsetDays,
          durationDays: phase.durationDays,
          ownerRoleId: ownerRole?.id,
          requiredDeliverables: phase.deliverables,
          acceptanceCriteria: phase.acceptance
        }
      });
      phases.set(phase.name, saved);
    }

    for (const [index, activity] of seed.activities.entries()) {
      const phase = phases.get(activity.phase);
      const responsibleRole = roles.get(activity.role);
      const existing = await prisma.projectSetupTemplateActivity.findFirst({
        where: { templateId: template.id, title: activity.title }
      });
      const data = {
        templateId: template.id,
        phaseId: phase?.id,
        title: activity.title,
        startOffsetDays: activity.startOffsetDays,
        durationDays: activity.durationDays,
        responsibleRoleId: responsibleRole?.id,
        deliverable: activity.deliverable,
        description: `Actividad ${index + 1} de la plantilla ${seed.type}.`
      };
      if (existing) {
        await prisma.projectSetupTemplateActivity.update({ where: { id: existing.id }, data });
      } else {
        await prisma.projectSetupTemplateActivity.create({ data });
      }
    }

    for (const [index, item] of seed.items.entries()) {
      const code = `${seed.type}-${item.code}`;
      const catalog = await prisma.configurationItemCatalog.upsert({
        where: { code },
        create: {
          code,
          methodologyType: seed.type,
          type: item.type,
          name: item.name,
          description: item.description,
          defaultLibraryType: item.library,
          required: item.required ?? true,
          sortOrder: index + 1
        },
        update: {
          methodologyType: seed.type,
          type: item.type,
          name: item.name,
          description: item.description,
          defaultLibraryType: item.library,
          required: item.required ?? true,
          sortOrder: index + 1,
          active: true
        }
      });
      const responsibleRole = roles.get(item.role);
      await prisma.projectSetupTemplateConfigItem.upsert({
        where: { templateId_code: { templateId: template.id, code } },
        create: {
          templateId: template.id,
          catalogItemId: catalog.id,
          code,
          type: item.type,
          name: item.name,
          description: item.description,
          libraryType: item.library,
          responsibleRoleId: responsibleRole?.id,
          required: item.required ?? true,
          selected: true,
          sortOrder: index + 1
        },
        update: {
          catalogItemId: catalog.id,
          type: item.type,
          name: item.name,
          description: item.description,
          libraryType: item.library,
          responsibleRoleId: responsibleRole?.id,
          required: item.required ?? true,
          selected: true,
          sortOrder: index + 1
        }
      });
    }

    for (const [index, roleSlug] of ["JEFE_PROYECTO", "LIDER_TECNICO", "BIBLIOTECARIO", "DESARROLLADOR", "QA", "SOLICITANTE"].entries()) {
      const role = roles.get(roleSlug);
      if (!role) continue;
      await prisma.projectSetupTemplateMember.upsert({
        where: { templateId_roleId: { templateId: template.id, roleId: role.id } },
        create: {
          templateId: template.id,
          roleId: role.id,
          roleNote: `Rol sugerido para proyectos ${seed.type}.`,
          sortOrder: index + 1
        },
        update: {
          roleNote: `Rol sugerido para proyectos ${seed.type}.`,
          sortOrder: index + 1,
          active: true
        }
      });
    }
  }

  const [catalogItems, templates, templateItems] = await Promise.all([
    prisma.configurationItemCatalog.count(),
    prisma.projectSetupTemplate.count(),
    prisma.projectSetupTemplateConfigItem.count()
  ]);
  console.log(JSON.stringify({ catalogItems, templates, templateItems }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
