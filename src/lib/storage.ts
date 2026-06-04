import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const storageRoot = process.env.SGCSW_STORAGE_DIR ?? "storage";

export async function sha256Buffer(buffer: Buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

export async function sha256File(filePath: string) {
  return sha256Buffer(await readFile(filePath));
}

export async function saveUploadedFile(file: File, scope: string, preferredName?: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const hash = await sha256Buffer(buffer);
  const safeName = (preferredName || file.name || "archivo").replace(/[^a-zA-Z0-9._-]/g, "_");
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), storageRoot, scope);
  await mkdir(dir, { recursive: true });
  const target = path.join(dir, `${Date.now()}-${safeName}`);
  await writeFile(target, buffer);
  return {
    storagePath: path.relative(/*turbopackIgnore: true*/ process.cwd(), target),
    sha256Hash: hash,
    fileName: safeName,
    mimeType: file.type || "application/octet-stream"
  };
}

export async function writeTextArtifact(scope: string, fileName: string, content: string) {
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), storageRoot, scope);
  await mkdir(dir, { recursive: true });
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const target = path.join(dir, `${Date.now()}-${safeName}`);
  await writeFile(target, content, "utf8");
  return {
    storagePath: path.relative(/*turbopackIgnore: true*/ process.cwd(), target),
    sha256Hash: createHash("sha256").update(content).digest("hex"),
    fileName: safeName,
    mimeType: "text/plain"
  };
}
