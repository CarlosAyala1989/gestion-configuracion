import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const session = await getSession();
  if (!session || !session.projectSelected || !session.permissions.includes("reports.read")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const changes = await prisma.changeRequest.findMany({
    include: { project: true, requester: true },
    orderBy: { createdAt: "desc" },
    where: session.projectId ? { projectId: session.projectId } : undefined
  });
  const workItems = await prisma.workItem.findMany({
    include: { project: true, assignedTo: true, sprint: true },
    orderBy: { updatedAt: "desc" },
    where: session.projectId ? { projectId: session.projectId } : undefined
  });
  const dailyLogs = await prisma.dailyWorkLog.findMany({
    include: { project: true, user: true, workItem: true, activity: true },
    orderBy: [{ logDate: "desc" }, { createdAt: "desc" }],
    where: session.projectId ? { projectId: session.projectId } : undefined
  });
  const rows = [
    ["seccion", "id", "proyecto", "titulo", "tipo", "prioridad_horas", "estado", "responsable", "fecha", "detalle"],
    ...changes.map((change) => [
      "solicitud",
      change.ticketId,
      change.project.code,
      change.title,
      change.type,
      change.priority,
      change.status,
      change.requester.email,
      change.createdAt.toISOString(),
      change.justification
    ]),
    ...workItems.map((item) => [
      "work_item",
      item.code,
      item.project.code,
      item.title,
      item.type,
      item.storyPoints ?? "",
      item.state,
      item.assignedTo?.email ?? "",
      item.updatedAt.toISOString(),
      item.githubBranch ?? item.githubPullRequestUrl ?? item.githubIssueUrl ?? ""
    ]),
    ...dailyLogs.map((log) => [
      "reporte_diario",
      log.workItem?.code ?? log.activity?.title ?? log.id,
      log.project.code,
      log.completed,
      "DAILY_LOG",
      String(log.hours),
      log.blockers ? "BLOCKED" : "DONE",
      log.user.email,
      log.logDate.toISOString(),
      log.nextPlan
    ])
  ];
  const body = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sgcsw-solicitudes.csv"'
    }
  });
}
