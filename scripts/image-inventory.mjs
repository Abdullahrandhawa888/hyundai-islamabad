// Writes reference-docs/image-inventory.md: every image in public/, its size,
// dimensions, and where the site uses it. Run again after adding or removing
// pictures:  npm run images
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outFile = path.join(root, "reference-docs", "image-inventory.md");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif", ".ico"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const toPosix = (p) => p.split(path.sep).join("/");

// Admin section names, so the record says where staff can change each picture.
const registrySource = fs.readFileSync(path.join(root, "lib/admin/content-registry.ts"), "utf8");
const adminLabels = {};
for (const m of registrySource.matchAll(/path:\s*"([^"]+)",\s*label:\s*"([^"]+)"/g)) {
  adminLabels[m[1]] = m[2];
}

// Every file that could mention an image path.
const sourceFiles = ["app", "components", "lib", "content"]
  .flatMap((dir) => walk(path.join(root, dir)))
  .filter((file) => /\.(tsx?|json|css)$/.test(file))
  .map((file) => ({ rel: toPosix(path.relative(root, file)), text: fs.readFileSync(file, "utf8") }));

function usage(publicPath) {
  const variants = [publicPath, encodeURI(publicPath)];
  return sourceFiles
    .filter((file) => variants.some((v) => file.text.includes(v)))
    .map((file) =>
      adminLabels[file.rel] ? `Admin › ${adminLabels[file.rel]}` : `\`${file.rel}\``,
    );
}

function formatSize(bytes) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

const files = walk(publicDir).sort();
const images = files.filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));
const others = files.filter((f) => !IMAGE_EXT.has(path.extname(f).toLowerCase()));

const rows = [];
for (const file of images) {
  const publicPath = "/" + toPosix(path.relative(publicDir, file));
  let dims = "";
  try {
    const meta = await sharp(file).metadata();
    dims = `${meta.width} × ${meta.height}`;
  } catch {
    dims = "?";
  }
  rows.push({ publicPath, folder: path.posix.dirname(publicPath), dims, bytes: fs.statSync(file).size, used: usage(publicPath) });
}

const totalBytes = rows.reduce((sum, r) => sum + r.bytes, 0);
const unused = rows.filter((r) => r.used.length === 0);
const editable = rows.filter((r) => r.used.some((u) => u.startsWith("Admin")));
const today = new Date().toISOString().slice(0, 10);

const lines = [
  "# Image inventory",
  "",
  `Every image in \`public/\`, generated on ${today} by \`npm run images\`. Re-run that command after adding or removing pictures; don't edit this file by hand.`,
  "",
  `- **${rows.length} images**, ${formatSize(totalBytes)} in total`,
  `- **${editable.length}** can be changed by staff in /admin (marked "Admin › …")`,
  `- **${rows.length - editable.length - unused.length}** are set in the code, so a developer has to change them`,
  `- **${unused.length}** are not used anywhere on the site`,
  "",
  "**Used on** names the admin section or code file that shows the image. \"Not used\" means no page refers to it; it's safe to delete, but check with the team first.",
  "",
];

for (const folder of [...new Set(rows.map((r) => r.folder))]) {
  const group = rows.filter((r) => r.folder === folder);
  lines.push(`## ${folder} (${group.length})`, "", "| Image | Size | Dimensions | Used on |", "|---|---|---|---|");
  for (const r of group) {
    lines.push(`| \`${path.posix.basename(r.publicPath)}\` | ${formatSize(r.bytes)} | ${r.dims} | ${r.used.length ? r.used.join("<br>") : "**Not used**"} |`);
  }
  lines.push("");
}

if (others.length) {
  lines.push("## Other files in public/ (not images)", "");
  for (const file of others) {
    const publicPath = "/" + toPosix(path.relative(publicDir, file));
    const used = usage(publicPath);
    lines.push(`- \`${publicPath}\` (${formatSize(fs.statSync(file).size)}) – ${used.length ? used.join(", ") : "**Not used**"}`);
  }
  lines.push("");
}

fs.writeFileSync(outFile, lines.join("\n"));
console.log(`Wrote ${path.relative(root, outFile)}: ${rows.length} images, ${unused.length} not used.`);
