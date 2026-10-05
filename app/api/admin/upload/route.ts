import { NextRequest, NextResponse } from "next/server";
import { putBinaryFile, tryGetSha } from "@/lib/admin/github";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const file = form.get("file");
  const folder = form.get("folder"); // e.g. "team", "vehicles", "news", "hero"

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (typeof folder !== "string" || !/^[a-z0-9-]+$/.test(folder)) {
    return NextResponse.json({ error: "Invalid folder." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 8MB)." }, { status: 400 });
  }
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json({ error: `Unsupported file type ${ext}.` }, { status: 400 });
  }

  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");
  const path = `public/images/${folder}/${Date.now()}-${safeName}`;
  const publicPath = path.replace(/^public/, "");

  const bytes = Buffer.from(await file.arrayBuffer()).toString("base64");

  try {
    const existingSha = await tryGetSha(path);
    await putBinaryFile(path, bytes, `admin: upload ${publicPath}`, existingSha);
    return NextResponse.json({ ok: true, path: publicPath });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
