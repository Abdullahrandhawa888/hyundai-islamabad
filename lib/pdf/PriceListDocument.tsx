import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  effectivePrice,
  formatAmount,
  fromPrice,
  getPriceListSections,
  priceList,
  site,
  variantTotal,
  type PriceListRow,
} from "@/lib/data";
import type { PriceListBadge, PriceListModel, Vehicle, VehicleVariant } from "@/lib/types";
import {
  MUTED,
  NAVY,
  PdfContactFooter,
  PdfHeader,
  PdfImagePage,
  PdfPicture,
  PdfSwatches,
  PdfTerms,
  publicImage,
  styles,
  type PdfImage,
} from "./shared";

// The downloadable price list (/price-list.pdf), laid out like the printed
// flyer: standard models on the first page, each "featured" model (one with a
// spec line, warranty badges or an ex-factory box) on its own page, plus any
// extra full-page images set in content/price-list.json.

type Line = { label: string; value: string; was?: string };
type Column = { key: string; label: string; flex: number; bold?: boolean; lines: (row: PriceListRow) => Line[] };

/** One value per option ("With AC" / "Without AC"), collapsed to one line
 * when every option has the same figure. Mirrors the web table. */
function linesFor(row: PriceListRow, pick: (variant: VehicleVariant) => number): Line[] {
  const lines = row.options.map((variant) => ({ label: variant.option, value: formatAmount(pick(variant)) }));
  return lines.every((line) => line.value === lines[0].value) ? [{ label: "", value: lines[0].value }] : lines;
}

function priceLines(row: PriceListRow): Line[] {
  return row.options.map((variant) => ({
    label: row.options.length > 1 ? variant.option : "",
    value: formatAmount(effectivePrice(variant)),
    was: variant.discountedPrice !== undefined ? formatAmount(variant.price) : undefined,
  }));
}

function columnsFor(vehicle: Vehicle): Column[] {
  const labels = priceList.columns;
  const variants = vehicle.variants;
  const columns: Column[] = [
    { key: "grade", label: "Grade", flex: 1.2, bold: true, lines: (row) => [{ label: "", value: row.grade }] },
    { key: "variant", label: "Variant", flex: 1.15, bold: true, lines: (row) => [{ label: "", value: row.variantLabel }] },
    { key: "price", label: labels.price, flex: 1.3, bold: true, lines: priceLines },
    { key: "transport", label: labels.transportation, flex: 1.1, lines: (row) => linesFor(row, (v) => v.transportation) },
  ];
  if (variants.some((v) => v.nevLevy > 0)) {
    columns.push({ key: "nev", label: labels.nevLevy, flex: 1, lines: (row) => linesFor(row, (v) => v.nevLevy) });
  }
  if (variants.some((v) => v.whtTax > 0)) {
    columns.push({ key: "wht", label: labels.whtTax, flex: 1.05, bold: true, lines: (row) => linesFor(row, (v) => v.whtTax) });
  }
  if (variants.some((v) => v.cvt > 0)) {
    columns.push({ key: "cvt", label: labels.cvt, flex: 1, lines: (row) => linesFor(row, (v) => v.cvt) });
  }
  columns.push({ key: "total", label: labels.total, flex: 1.3, bold: true, lines: (row) => linesFor(row, variantTotal) });
  return columns;
}

function PriceTable({
  model,
  vehicle,
  rows,
  large = false,
}: {
  model: PriceListModel;
  vehicle: Vehicle;
  rows: PriceListRow[];
  large?: boolean;
}) {
  const size = large
    ? { head: 8, headLong: 7, body: 8.6, small: 6.2, model: 10, pad: 6 }
    : { head: 6.8, headLong: 5.8, body: 7.1, small: 5.2, model: 7.6, pad: 4 };
  const columns = columnsFor(vehicle);
  const modelFlex = 1.25;
  const restFlex = columns.reduce((sum, column) => sum + column.flex, 0);

  const head = (label: string, flex: number, key: string) => (
    <View key={key} style={[styles.cell, { flex, paddingVertical: size.pad }]}>
      {label === priceList.columns.price ? (
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: size.head, color: NAVY, textAlign: "center" }}>
          {label} <Text style={{ fontSize: size.small }}>(PKR)</Text>
        </Text>
      ) : (
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: label.length > 12 ? size.headLong : size.head,
            color: NAVY,
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.table}>
      <View style={{ flexDirection: "row" }}>
        {head("Model", modelFlex, "model")}
        {columns.map((column) => head(column.label, column.flex, column.key))}
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.cell, { flex: modelFlex }]}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: size.model, textAlign: "center" }}>{model.label}</Text>
        </View>
        <View style={{ flex: restFlex }}>
          {rows.map((row) => (
            <View key={row.options.map((variant) => variant.name).join("|")} style={{ flexDirection: "row" }}>
              {columns.map((column) => (
                <View key={column.key} style={[styles.cell, { flex: column.flex, paddingVertical: size.pad }]}>
                  {column.lines(row).map((line) => (
                    <View key={line.label + line.value} style={{ alignItems: "center", marginVertical: 0.5 }}>
                      {line.label ? <Text style={{ fontSize: size.small, color: NAVY }}>{line.label}</Text> : null}
                      {line.was ? (
                        <Text style={{ fontSize: size.small, color: MUTED, textDecoration: "line-through" }}>
                          {line.was}
                        </Text>
                      ) : null}
                      <Text
                        style={{
                          fontFamily: column.bold ? "Helvetica-Bold" : "Helvetica",
                          fontSize: size.body,
                          textAlign: "center",
                        }}
                      >
                        {line.value}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function Badge({ years, title, text }: PriceListBadge) {
  return (
    <View style={{ flexDirection: "row", borderWidth: 1.2, borderColor: NAVY, marginLeft: 8 }}>
      {years ? (
        <View style={{ backgroundColor: NAVY, flexDirection: "row", alignItems: "center", paddingHorizontal: 5 }}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 22, color: "#ffffff" }}>{years}</Text>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 5, color: "#ffffff", marginLeft: 2, letterSpacing: 0.8 }}>
            YEAR
          </Text>
        </View>
      ) : null}
      <View style={{ paddingHorizontal: 7, paddingVertical: 4, justifyContent: "center" }}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11.5, color: NAVY }}>{title}</Text>
        <Text style={{ fontSize: 6.8, color: NAVY, marginTop: 1 }}>{text}</Text>
      </View>
    </View>
  );
}

function isFeatured(model: PriceListModel) {
  return (
    Boolean(model.spec.title) ||
    model.badges.some((badge) => badge && typeof badge === "object" && badge.title) ||
    model.showExFactoryPrice
  );
}

function isImage(image: PdfImage | null): image is PdfImage {
  return image !== null;
}

function Terms() {
  const { title, left, right } = priceList.paymentTerms;
  return <PdfTerms title={title} left={left} right={right} />;
}

export function PriceListDocument() {
  const sections = getPriceListSections();
  const standard = sections.filter(({ model }) => !isFeatured(model));
  const featured = sections.filter(({ model }) => isFeatured(model));
  const logo = publicImage(site.logo);
  const pagesAfter = priceList.pdfPagesAfterPriceList.map(publicImage).filter(isImage);
  const pagesAtEnd = priceList.pdfPagesAtEnd.map(publicImage).filter(isImage);

  return (
    <Document
      title={`${site.name} Price List - ${priceList.edition}`}
      author={site.name}
      subject={`Hyundai prices, transportation charges and taxes - ${priceList.edition}`}
      creator={site.name}
    >
      <Page size="A4" style={[styles.page, { paddingBottom: 50 }]}>
        <PdfHeader
          title="Price List"
          edition={priceList.edition}
          issuer={priceList.issuer}
          issuerTagline={priceList.issuerTagline}
        />
        {standard.map(({ model, vehicle, rows }) => (
          <View key={vehicle.slug} wrap={false} style={{ flexDirection: "row", alignItems: "center", marginBottom: 9 }}>
            <View style={{ width: 128, marginRight: 10, alignItems: "center" }}>
              <PdfPicture image={publicImage(model.image)} maxWidth={128} maxHeight={76} />
            </View>
            <View style={{ flex: 1 }}>
              <PriceTable model={model} vehicle={vehicle} rows={rows} />
              <PdfSwatches colors={vehicle.colors} />
            </View>
          </View>
        ))}
        <Terms />
        <PdfContactFooter />
      </Page>

      {pagesAfter.map((image, index) => (
        <Page key={`after-${index}`} size="A4">
          <PdfImagePage image={image} />
        </Page>
      ))}

      {featured.map(({ model, vehicle, rows }) => {
        const badges = model.badges.filter((badge) => badge && typeof badge === "object" && badge.title);
        return (
          <Page key={vehicle.slug} size="A4" style={[styles.page, { paddingTop: 28, paddingBottom: 50 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Text style={{ flex: 1, fontFamily: "Helvetica-Bold", fontSize: 40, color: NAVY, letterSpacing: 1.2 }}>
                {model.label.toUpperCase()}
              </Text>
              <PdfPicture image={logo} maxWidth={124} maxHeight={36} />
            </View>

            <View style={{ alignItems: "center", marginTop: 18, marginBottom: 16 }}>
              <PdfPicture image={publicImage(model.image)} maxWidth={543} maxHeight={320} />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}
            >
              <View>
                {model.spec.title ? (
                  <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 13 }}>{model.spec.title}</Text>
                ) : null}
                {model.spec.text ? (
                  <Text style={{ fontSize: 8.5, color: MUTED, marginTop: 2 }}>{model.spec.text}</Text>
                ) : null}
                {model.showExFactoryPrice && fromPrice(vehicle) > 0 ? (
                  <View style={{ backgroundColor: NAVY, paddingHorizontal: 11, paddingVertical: 6, marginTop: 8 }}>
                    <Text style={{ fontSize: 7.5, color: "#ffffff" }}>Ex-Factory Price (PKR)</Text>
                    <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 16, color: "#ffffff", marginTop: 1 }}>
                      PKR {formatAmount(fromPrice(vehicle))}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={{ flexDirection: "row" }}>
                {badges.map((badge) => (
                  <Badge key={badge.title + badge.text} {...badge} />
                ))}
              </View>
            </View>

            <PriceTable model={model} vehicle={vehicle} rows={rows} large />
            <PdfSwatches colors={vehicle.colors} large />

            <View style={{ flexGrow: 1 }} />
            <Terms />
            <PdfContactFooter />
          </Page>
        );
      })}

      {pagesAtEnd.map((image, index) => (
        <Page key={`end-${index}`} size="A4">
          <PdfImagePage image={image} />
        </Page>
      ))}
    </Document>
  );
}
