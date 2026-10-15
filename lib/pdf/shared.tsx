import { readFileSync } from "node:fs";
import path from "node:path";
// Aliased: react-pdf's Image is a PDF primitive (no alt text), not an HTML <img>.
import { Font, Image as PdfImageElement, StyleSheet, Text, View } from "@react-pdf/renderer";
import { site } from "@/lib/data";
import type { VehicleColor } from "@/lib/types";

// Building blocks shared by the generated price list and EMI PDFs. These run
// at build time only (see app/*.pdf/route.ts), so reading /public is fine.
// No hooks in here: react-pdf renders these outside Next's React.

export const NAVY = "#0a2a8a";
export const BORDER = "#a9aaad";
export const MUTED = "#555555";
export const TINT = "#eef3fb";

// Keep words (and figures like 15,083,760) whole instead of hyphenating them.
Font.registerHyphenationCallback((word) => [word]);

export const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 26,
    paddingHorizontal: 26,
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#111111",
  },
  bold: { fontFamily: "Helvetica-Bold" },
  cell: {
    borderRightWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: BORDER,
    paddingVertical: 4,
    paddingHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  table: { borderTopWidth: 0.6, borderLeftWidth: 0.6, borderColor: BORDER },
});

export type PdfImage = { data: Buffer; format: "png" | "jpg"; width: number; height: number };

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** A PNG or JPEG from /public (react-pdf can't read WebP), with its pixel size
 * so it can be drawn without distortion. null if it's missing or unsupported. */
export function publicImage(src: string | undefined): PdfImage | null {
  if (!src || !src.startsWith("/")) return null;
  const file = path.join(PUBLIC_DIR, decodeURIComponent(src));
  if (!file.startsWith(PUBLIC_DIR)) return null;
  const ext = path.extname(file).toLowerCase();
  const format = ext === ".png" ? "png" : ext === ".jpg" || ext === ".jpeg" ? "jpg" : null;
  if (!format) return null;
  try {
    const data = readFileSync(file);
    const size = pixelSize(data, format);
    return size ? { data, format, ...size } : null;
  } catch {
    return null;
  }
}

function pixelSize(data: Buffer, format: "png" | "jpg") {
  if (format === "png") return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  let i = 2;
  while (i + 9 < data.length) {
    if (data[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = data[i + 1];
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: data.readUInt16BE(i + 5), width: data.readUInt16BE(i + 7) };
    }
    i += 2 + data.readUInt16BE(i + 2);
  }
  return null;
}

/** Largest width/height that fits the box while keeping the image's proportions. */
export function fit(image: PdfImage, maxWidth: number, maxHeight: number) {
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
  return { width: image.width * scale, height: image.height * scale };
}

export function PdfPicture({
  image,
  maxWidth,
  maxHeight,
}: {
  image: PdfImage | null;
  maxWidth: number;
  maxHeight: number;
}) {
  if (!image) return null;
  return <PdfImageElement src={{ data: image.data, format: image.format }} style={fit(image, maxWidth, maxHeight)} />;
}

/** Dealer logo, page title and edition on the left; issuing company on the right. */
export function PdfHeader({
  title,
  edition,
  issuer,
  issuerTagline,
}: {
  title: string;
  edition: string;
  issuer: string;
  issuerTagline: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 10,
        marginBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: NAVY,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PdfPicture image={publicImage(site.logo)} maxWidth={130} maxHeight={36} />
        <View style={{ width: 0.8, height: 32, backgroundColor: "#cfd3da", marginHorizontal: 11 }} />
        <View>
          <Text style={{ fontSize: 20, color: NAVY, letterSpacing: 1.6 }}>{title.toUpperCase()}</Text>
          <Text style={{ fontSize: 6.5, color: MUTED, letterSpacing: 1.2, marginTop: 3 }}>
            {edition.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontFamily: "Helvetica-BoldOblique", fontSize: 14, color: NAVY }}>
          {issuer.toUpperCase()}
        </Text>
        <Text style={{ fontSize: 5.8, color: NAVY, letterSpacing: 1.3, marginTop: 3 }}>
          {issuerTagline.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

/** Colour chips with their names, as under each table on the printed list. */
export function PdfSwatches({ colors, large = false }: { colors: VehicleColor[]; large?: boolean }) {
  if (colors.length === 0) return null;
  const chip = large ? { width: 44, height: 15 } : { width: 26, height: 8 };
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: large ? 8 : 4 }}>
      {colors.map((color) => (
        <View key={color.name} style={{ width: large ? 62 : 37, alignItems: "center", marginBottom: 2 }}>
          <View
            style={{
              ...chip,
              borderRadius: 1.5,
              backgroundColor: color.hex,
              borderWidth: 0.5,
              borderColor: "#c9ccd1",
            }}
          />
          <Text style={{ fontSize: large ? 6 : 4.6, color: MUTED, marginTop: 2, textAlign: "center" }}>
            {color.name}
          </Text>
        </View>
      ))}
    </View>
  );
}

/** The two-column "Payment terms & conditions" block. */
export function PdfTerms({
  title,
  left,
  right,
}: {
  title: string;
  left: string[];
  right: string[];
}) {
  return (
    <View wrap={false} style={{ marginTop: 8 }}>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10, color: NAVY, marginBottom: 5 }}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        {[left, right].map((terms, index) => (
          <View
            key={index}
            style={
              index === 0
                ? { flex: 1, paddingRight: 14 }
                : { flex: 1, paddingLeft: 14, borderLeftWidth: 0.6, borderLeftColor: "#cfd3da" }
            }
          >
            {terms.map((term) => (
              <Text key={term} style={{ fontSize: 6.6, lineHeight: 1.35, color: "#333333", marginBottom: 3 }}>
                {term}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

/** A full-page image (e.g. a designed flyer page), centred on white. */
export function PdfImagePage({ image }: { image: PdfImage }) {
  const size = fit(image, 595.28, 841.89);
  return (
    <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <PdfImageElement src={{ data: image.data, format: image.format }} style={size} />
    </View>
  );
}
