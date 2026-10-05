import { NextRequest, NextResponse } from "next/server";
import { CONTENT_REGISTRY, isContentKey } from "@/lib/admin/content-registry";
import { getFile, GithubConflictError, putFile } from "@/lib/admin/github";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!isContentKey(file)) {
    return NextResponse.json({ error: "Unknown content file." }, { status: 404 });
  }
  try {
    const { content, sha } = await getFile(CONTENT_REGISTRY[file].path);
    return NextResponse.json({ data: JSON.parse(content), sha });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!isContentKey(file)) {
    return NextResponse.json({ error: "Unknown content file." }, { status: 404 });
  }

  let body: { data?: unknown; sha?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (body.data === undefined || !body.sha) {
    return NextResponse.json({ error: "Request must include data and sha." }, { status: 400 });
  }

  let text: string;
  try {
    text = JSON.stringify(body.data, null, 2) + "\n";
    JSON.parse(text); // re-validate round-trips cleanly
  } catch {
    return NextResponse.json({ error: "Data is not valid JSON." }, { status: 400 });
  }

  try {
    const { path, label } = CONTENT_REGISTRY[file];
    const result = await putFile(path, text, body.sha, `admin: update ${label}`);
    return NextResponse.json({ ok: true, sha: result.sha });
  } catch (err) {
    if (err instanceof GithubConflictError) {
      return NextResponse.json({ error: err.message, conflict: true }, { status: 409 });
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
