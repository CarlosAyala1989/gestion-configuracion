import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { config as loadEnv } from "dotenv";

if (!process.env.DB_HOST && !process.env.DATABASE_URL) {
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env", override: false });
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function mariadbConfigFromUrl(connectionString: string) {
  const url = new URL(connectionString);
  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, "")
  };
}

function databaseUrlFromEnv() {
  if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
    const user = encodeURIComponent(process.env.DB_USER);
    const password = encodeURIComponent(process.env.DB_PASSWORD ?? "");
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT ?? "3306";
    const database = process.env.DB_NAME;
    return `mysql://${user}:${password}@${host}:${port}/${database}`;
  }
  return process.env.DATABASE_URL;
}

function createClient() {
  const databaseUrl = databaseUrlFromEnv();
  if (!databaseUrl) {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
    });
  }
  const adapter = new PrismaMariaDb(mariadbConfigFromUrl(databaseUrl));
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
}

export const prisma =
  globalForPrisma.prisma ??
  createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
