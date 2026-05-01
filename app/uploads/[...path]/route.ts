import { NextResponse } from "next/server";

import { readUploadedFile } from "@/lib/media/storage";

const mimeByExtension: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;

  if (path.length !== 1) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filename = path[0];
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  const mimeType = mimeByExtension[extension];

  if (!mimeType) {
    return new NextResponse("Not found", { status: 404 });
  }

  const file = await readUploadedFile(filename);

  if (!file) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(file.content, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(file.metadata.size),
      "Content-Type": mimeType,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
