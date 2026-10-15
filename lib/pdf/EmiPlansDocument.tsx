import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  emiAdvancePercent,
  emiPage,
  emiPlans,
  emiRows,
  emiTotalAdvance,
  formatAmount,
  getEmiExFactoryPrice,
  getPricingImage,
  priceList,
  site,
} from "@/lib/data";
import type { EmiPlan } from "@/lib/types";
import { MUTED, NAVY, PdfHeader, PdfPicture, TINT, publicImage, styles } from "./shared";

// The downloadable EMI plans (/emi-plans.pdf), in the price list's style.

type Cell = { top?: string; value: string };
type Row = { key: string; label: string; cells: Cell[]; tone: "normal" | "total" | "bold" };

function rowsFor(plan: EmiPlan, exFactoryPrice: number): Row[] {
  const { tenures } = plan;
  return [
    ...emiRows.map((row) => ({
      key: row.key,
      label: row.label,
      tone: "normal" as const,
      cells: tenures.map((tenure) =>
        row.key === "advanceAmount"
          ? { top: `${emiAdvancePercent(tenure, exFactoryPrice)}% advance`, value: formatAmount(tenure.advanceAmount) }
          : { value: formatAmount(tenure[row.key]) },
      ),
    })),
    {
      key: "total",
      label: "Total Advance Payment (Filer)",
      tone: "total",
      cells: tenures.map((tenure) => ({ value: formatAmount(emiTotalAdvance(tenure)) })),
    },
    {
      key: "cheques",
      label: "Post Dated Cheques",
      tone: "bold",
      cells: tenures.map((tenure) => ({ value: `${formatAmount(tenure.monthlyInstallment)} × ${tenure.months}` })),
    },
    {
      key: "admin",
      label: "Admin Charges",
      tone: "normal",
      cells: tenures.map((tenure) => ({ value: formatAmount(tenure.adminCharges) })),
    },
  ];
}

function PlanBlock({ plan }: { plan: EmiPlan }) {
  const exFactoryPrice = getEmiExFactoryPrice(plan);
  const labelFlex = 2.3;

  return (
    <View wrap={false} style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 13 }}>
      <View style={{ width: 132, marginRight: 12 }}>
        <PdfPicture image={publicImage(getPricingImage(plan.vehicleSlug))} maxWidth={132} maxHeight={74} />
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10.5, color: NAVY, marginTop: 4 }}>
          {plan.modelLabel.toUpperCase()}
        </Text>
        <Text style={{ fontSize: 6, color: MUTED, marginTop: 1.5, letterSpacing: 0.6 }}>
          INTEREST-FREE · {plan.tenures.map((tenure) => tenure.months).join(" / ")} MONTHS
        </Text>
        <View style={{ backgroundColor: NAVY, paddingHorizontal: 7, paddingVertical: 4, marginTop: 6, alignSelf: "flex-start" }}>
          <Text style={{ fontSize: 5.8, color: "#ffffff" }}>Ex-Factory Price (PKR)</Text>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10, color: "#ffffff", marginTop: 1 }}>
            PKR {formatAmount(exFactoryPrice)}
          </Text>
        </View>
      </View>

      <View style={[styles.table, { flex: 1 }]}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.cell, { flex: labelFlex, alignItems: "flex-start", paddingLeft: 5 }]}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 7.5, color: NAVY }}>Tenure</Text>
          </View>
          {plan.tenures.map((tenure) => (
            <View key={tenure.months} style={[styles.cell, { flex: 1 }]}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 7.5, color: NAVY }}>{tenure.months} Months</Text>
            </View>
          ))}
        </View>
        {rowsFor(plan, exFactoryPrice).map((row) => {
          const background = row.tone === "total" ? { backgroundColor: TINT } : {};
          const strong = row.tone !== "normal";
          return (
            <View key={row.key} style={{ flexDirection: "row" }}>
              <View style={[styles.cell, background, { flex: labelFlex, alignItems: "flex-start", paddingLeft: 5 }]}>
                <Text
                  style={{
                    fontFamily: "Helvetica-Bold",
                    fontSize: 6.6,
                    color: row.tone === "total" ? NAVY : "#111111",
                  }}
                >
                  {row.label}
                </Text>
              </View>
              {row.cells.map((cell, index) => (
                <View key={index} style={[styles.cell, background, { flex: 1 }]}>
                  {cell.top ? <Text style={{ fontSize: 5.2, color: NAVY }}>{cell.top}</Text> : null}
                  <Text
                    style={{
                      fontFamily: strong || cell.top ? "Helvetica-Bold" : "Helvetica",
                      fontSize: strong ? 7.6 : 7,
                      color: row.tone === "total" ? NAVY : "#111111",
                    }}
                  >
                    {cell.value}
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function EmiPlansDocument() {
  return (
    <Document
      title={`${site.name} ${emiPage.title} - ${emiPage.edition}`}
      author={site.name}
      subject={`${emiPage.subtitle} - ${emiPage.edition}`}
      creator={site.name}
    >
      <Page size="A4" style={[styles.page, { paddingBottom: 34 }]}>
        <PdfHeader
          title={emiPage.title}
          edition={`${emiPage.subtitle} · ${emiPage.edition}`}
          issuer={priceList.issuer}
          issuerTagline={priceList.issuerTagline}
        />
        {emiPlans.map((plan) => (
          <PlanBlock key={plan.id} plan={plan} />
        ))}
        <View wrap={false} style={{ marginTop: 4 }}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10, color: NAVY, marginBottom: 5 }}>Good to know</Text>
          {emiPage.notes.map((note) => (
            <Text key={note} style={{ fontSize: 6.8, lineHeight: 1.35, color: "#333333", marginBottom: 3 }}>
              • {note}
            </Text>
          ))}
        </View>
        <Text
          fixed
          style={{ position: "absolute", bottom: 14, left: 26, right: 26, fontSize: 6, color: MUTED, textAlign: "center" }}
          render={({ pageNumber, totalPages }) =>
            `${site.name} · ${emiPage.title} · ${emiPage.edition} · ${site.phoneDisplay} · Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
