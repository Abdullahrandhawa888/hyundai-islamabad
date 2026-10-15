import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { priceList } from "@/lib/data";
import { PriceListDocument } from "@/lib/pdf/PriceListDocument";

// Generated at build time from content/vehicles.json and content/price-list.json.
// Every save in /admin rebuilds the site, so this download always shows the
// same prices as the Price List page.
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(createElement(PriceListDocument));
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${priceList.pdfDownloadName.replace(/["\\]/g, "")}"`,
    },
  });
}
