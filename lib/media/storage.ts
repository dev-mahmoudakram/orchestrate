import "server-only";

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const allowedMimeTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export const maxUploadSize = 5 * 1024 * 1024;

export function getUploadDir() {
  const configuredUploadDir = process.env.UPLOAD_DIR;

  if (configuredUploadDir) {
    return path.resolve(/*turbopackIgnore: true*/ configuredUploadDir);
  }

  return path.join(/*turbopackIgnore: true*/ process.cwd(), "storage", "uploads");
}

export function isAllowedImageType(mimeType: string) {
  return allowedMimeTypes.has(mimeType);
}

export function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 102.4) / 10} KB`;
  }

  return `${Math.round(size / 1024 / 102.4) / 10} MB`;
}

function generatedFilename(mimeType: string) {
  const extension = allowedMimeTypes.get(mimeType);

  if (!extension) {
    throw new Error("unsupported-file-type");
  }

  return `${randomUUID()}.${extension}`;
}

export async function saveUploadedImage(file: File) {
  if (!file.size) {
    throw new Error("missing-file");
  }

  if (file.size > maxUploadSize) {
    throw new Error("file-too-large");
  }

  if (!isAllowedImageType(file.type)) {
    throw new Error("unsupported-file-type");
  }

  const uploadDir = getUploadDir();
  const filename = generatedFilename(file.type);
  const filePath = path.join(uploadDir, /*turbopackIgnore: true*/ filename);
  const bytes = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, bytes);

  return {
    filename,
    originalName: file.name || null,
    mimeType: file.type,
    size: file.size,
    path: filePath,
    url: `/uploads/${filename}`,
  };
}

export function resolveUploadFilename(filename: string) {
  if (!filename || filename !== path.basename(filename) || filename.includes("..")) {
    return null;
  }

  return path.join(getUploadDir(), /*turbopackIgnore: true*/ filename);
}

export async function readUploadedFile(filename: string) {
  const filePath = resolveUploadFilename(filename);

  if (!filePath) {
    return null;
  }

  try {
    const [metadata, content] = await Promise.all([
      stat(/*turbopackIgnore: true*/ filePath),
      readFile(/*turbopackIgnore: true*/ filePath),
    ]);

    if (!metadata.isFile()) {
      return null;
    }

    return { content, metadata };
  } catch {
    return null;
  }
}
