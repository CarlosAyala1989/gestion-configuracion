import { handoffOrderToQa } from "@/lib/automation";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function verifySignature(body: string, signature: string | null) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) return true;
  if (!signature?.startsWith("sha256=")) return false;

  const expected = `sha256=${crypto.createHmac("sha256", secret).update(body).digest("hex")}`;
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);
  return expectedBuffer.length === actualBuffer.length && crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

function branchFromRef(ref?: string) {
  const prefix = "refs/heads/";
  return ref?.startsWith(prefix) ? ref.slice(prefix.length) : null;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  if (!verifySignature(body, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ ok: false, error: "Firma GitHub invalida." }, { status: 401 });
  }

  const event = request.headers.get("x-github-event");
  if (event !== "push") {
    return NextResponse.json({ ok: true, ignored: event ?? "unknown" });
  }

  const payload = JSON.parse(body);
  const branch = branchFromRef(payload.ref);
  const owner = String(payload.repository?.owner?.login ?? payload.repository?.owner?.name ?? "");
  const repo = String(payload.repository?.name ?? "");
  const commit = String(payload.head_commit?.id ?? payload.after ?? "");
  const pushUrl = String(payload.head_commit?.url ?? payload.compare ?? "");

  if (!branch || !owner || !repo || !commit) {
    return NextResponse.json({ ok: false, error: "Payload push incompleto." }, { status: 400 });
  }

  const project = await prisma.project.findFirst({
    where: {
      githubOwner: { equals: owner },
      githubRepo: { equals: repo }
    }
  });
  if (!project) {
    return NextResponse.json({ ok: true, ignored: "Repositorio no vinculado al SGCSW." }, { status: 202 });
  }

  const order = await prisma.changeOrder.findFirst({
    where: {
      projectId: project.id,
      gitBranch: branch,
      status: { in: ["IMPLEMENTING", "UNIT_TESTING", "QA_FAILED"] }
    },
    orderBy: { updatedAt: "desc" }
  });
  if (!order) {
    return NextResponse.json({ ok: true, ignored: "No hay orden activa para la rama." }, { status: 202 });
  }

  const result = await handoffOrderToQa({
    changeOrderId: order.id,
    actorUserId: order.developerId,
    gitCommit: commit,
    gitPushRef: pushUrl || `refs/heads/${branch}`,
    source: "github_push"
  });

  return NextResponse.json({
    ok: true,
    order: result.order.code,
    branch,
    commit,
    qaNotifications: result.notifications
  });
}
