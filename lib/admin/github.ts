const GITHUB_OWNER = "Abdullahrandhawa888";
const GITHUB_REPO = "hyundai-islamabad";
const GITHUB_BRANCH = "main";
const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

function token() {
  const value = process.env.ADMIN_GITHUB_TOKEN;
  if (!value) {
    throw new Error(
      "ADMIN_GITHUB_TOKEN is not set. Add it as an environment variable (a GitHub fine-grained token with Contents: Read and write on this repo) before saving content.",
    );
  }
  return value;
}

function headers() {
  return {
    Authorization: `Bearer ${token()}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export class GithubConflictError extends Error {
  constructor() {
    super("This file changed on GitHub since you loaded it. Reload and re-apply your edit.");
    this.name = "GithubConflictError";
  }
}

/** Fetch a repo file's raw text content and its current sha (needed to save). */
export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${API_BASE}/contents/${path}?ref=${GITHUB_BRANCH}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Could not read ${path} from GitHub (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { content: string; encoding: string; sha: string };
  const content = Buffer.from(data.content, data.encoding as BufferEncoding).toString("utf-8");
  return { content, sha: data.sha };
}

/** Commit new text content to a repo file. `sha` must be the current file's
 * sha (from getFile) so GitHub can detect if someone else changed it first. */
export async function putFile(
  path: string,
  content: string,
  sha: string,
  message: string,
): Promise<{ sha: string }> {
  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf-8").toString("base64"),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  if (res.status === 409 || res.status === 422) {
    throw new GithubConflictError();
  }
  if (!res.ok) {
    throw new Error(`Could not save ${path} to GitHub (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { content: { sha: string } };
  return { sha: data.content.sha };
}

/** Commit a new binary file (image upload). No sha needed for a brand-new
 * path; pass one to overwrite an existing file. */
export async function putBinaryFile(
  path: string,
  base64Content: string,
  message: string,
  sha?: string,
): Promise<{ sha: string }> {
  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Could not upload ${path} to GitHub (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { content: { sha: string } };
  return { sha: data.content.sha };
}

/** sha of an existing file if present, so an upload can overwrite it instead
 * of failing with "file already exists". Returns undefined if not found. */
export async function tryGetSha(path: string): Promise<string | undefined> {
  try {
    const res = await fetch(`${API_BASE}/contents/${path}?ref=${GITHUB_BRANCH}`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { sha: string };
    return data.sha;
  } catch {
    return undefined;
  }
}
