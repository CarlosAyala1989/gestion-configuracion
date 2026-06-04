import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env", override: false });

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

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrlFromEnv(),
  },
});
