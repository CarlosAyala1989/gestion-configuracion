import { ChangePriority, ChangeType } from "@prisma/client";

const requiredChangeFields = ["projectId", "title", "description", "justification", "priority"];

export function missingChangeFields(formData: FormData) {
  return requiredChangeFields.filter((field) => !String(formData.get(field) ?? "").trim());
}

export function classifyChange(input: {
  title: string;
  description: string;
  justification: string;
  priority: ChangePriority;
  originIncidentId?: string | null;
}) {
  const text = `${input.title} ${input.description} ${input.justification}`.toLowerCase();
  if (input.priority === "CRITICAL" || /emergencia|caida|produccion|hotfix|critico/.test(text)) {
    return {
      type: "EMERGENCY" as ChangeType,
      criteria: "Prioridad critica o palabras clave de emergencia/hotfix/produccion."
    };
  }
  if (input.originIncidentId || /error|defecto|bug|fallo|incidencia|corregir/.test(text)) {
    return {
      type: "CORRECTIVE" as ChangeType,
      criteria: "Existe incidencia origen o palabras clave de correccion."
    };
  }
  if (/prevenir|riesgo|obsolescencia|seguridad|mantenimiento/.test(text)) {
    return {
      type: "PREVENTIVE" as ChangeType,
      criteria: "El texto indica prevencion, reduccion de riesgo o mantenimiento."
    };
  }
  return {
    type: "EVOLUTIONARY" as ChangeType,
    criteria: "El cambio agrega o mejora capacidad funcional sin incidencia correctiva."
  };
}

export function nextSemver(current: string, type: ChangeType) {
  const [major = 0, minor = 0, patch = 0] = current.split(".").map((part) => Number(part) || 0);
  if (type === "EMERGENCY" || type === "CORRECTIVE") return `${major}.${minor}.${patch + 1}`;
  if (type === "PREVENTIVE") return `${major}.${minor + 1}.0`;
  return `${major + 1}.0.0`;
}
