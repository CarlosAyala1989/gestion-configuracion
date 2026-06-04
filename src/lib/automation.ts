import { audit, notify } from "@/lib/audit";
import { prisma } from "@/lib/prisma";

type NotificationType = "INFO" | "WARNING" | "ERROR" | "SUCCESS";

export async function notifyProjectRole(
  projectId: string,
  roleSlug: string,
  title: string,
  message: string,
  link: string,
  type: NotificationType = "INFO"
) {
  const recipients = await prisma.projectUser.findMany({
    where: {
      projectId,
      active: true,
      role: { slug: roleSlug },
      user: { status: "ACTIVE" }
    },
    include: { user: true }
  });

  for (const recipient of recipients) {
    await notify(recipient.userId, title, message, link, type);
  }

  return recipients.length;
}

export async function handoffOrderToQa(input: {
  changeOrderId: string;
  actorUserId?: string | null;
  gitCommit?: string | null;
  gitPushRef?: string | null;
  githubPullRequestUrl?: string | null;
  source: "unit_tests" | "github_push";
}) {
  const order = await prisma.changeOrder.findUniqueOrThrow({
    where: { id: input.changeOrderId },
    include: { changeRequest: true, project: true }
  });

  await prisma.changeOrder.update({
    where: { id: order.id },
    data: {
      status: "READY_FOR_QA",
      gitCommit: input.gitCommit || order.gitCommit,
      gitPushRef: input.gitPushRef || order.gitPushRef
    }
  });
  await prisma.changeRequest.update({
    where: { id: order.changeRequestId },
    data: { status: "QA_TESTING" }
  });

  const prText = input.githubPullRequestUrl ? ` PR: ${input.githubPullRequestUrl}.` : "";
  const commitText = input.gitCommit ? ` Commit: ${input.gitCommit}.` : "";
  const notifications = await notifyProjectRole(
    order.projectId,
    "QA",
    "Orden lista para QA",
    `${order.code} / ${order.changeRequest.ticketId} esta lista para pruebas.${commitText}${prText}`,
    "/qa/pruebas",
    "INFO"
  );

  await audit({
    userId: input.actorUserId ?? order.developerId,
    module: "automatizacion",
    action: "qa_handoff",
    next: {
      changeOrderId: order.id,
      source: input.source,
      gitCommit: input.gitCommit,
      gitPushRef: input.gitPushRef,
      githubPullRequestUrl: input.githubPullRequestUrl,
      qaNotifications: notifications
    }
  });

  return { order, notifications };
}
