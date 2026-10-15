import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { emiPage } from "@/lib/data";
import { EmiPlansDocument } from "@/lib/pdf/EmiPlansDocument";

// Generated at build time from content/emi-plans.json, content/emi-page.json
// and the live ex-factory prices, so it always matches the EMI Plans page.
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(createElement(EmiPlansDocument));
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${emiPage.pdfDownloadName.replace(/["\\]/g, "")}"`,
    },
  });
}
