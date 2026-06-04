import { prisma } from "@/lib/prisma";

type AuditInput = {
  userId?: string | null;
  module: string;
  action: string;
  previous?: unknown;
  next?: unknown;
  ip?: string | null;
};

export async function audit(input: AuditInput) {
  await prisma.auditLog.create({
    data: {
      userId: input.userId ?? undefined,
      module: input.module,
      action: input.action,
      ip: input.ip ?? undefined,
      previousDetail: input.previous ? JSON.stringify(input.previous) : undefined,
      newDetail: input.next ? JSON.stringify(input.next) : undefined
    }
  });
}

export async function notify(userId: string, title: string, message: string, link?: string, type: "INFO" | "WARNING" | "ERROR" | "SUCCESS" = "INFO") {
  await prisma.notification.create({
    data: { userId, title, message, link, type }
  });
}
