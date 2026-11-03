"use client";

import { useState } from "react";
import { serviceModelOptions, serviceTypes } from "@/lib/data";
import type { FormOption } from "@/lib/types";

const inputClass =
  "w-full border border-line bg-white px-4 py-2.5 text-[14px] outline-none placeholder:text-[#8a8a8a] focus:border-accent";

type Field = {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  options?: FormOption[];
  defaultValue?: string;
};

/** One row of the form: label on the left, box on the right (stacked on phones). */
function Row({ field }: { field: Field }) {
  const { label, name, required = true, type = "text", placeholder, options, defaultValue } = field;
  return (
    <label className="grid gap-1.5 md:grid-cols-[150px_1fr] md:items-start md:gap-6">
      <span className="pt-2.5 text-[13px] leading-5">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      {options ? (
        <select name={name} required={required} defaultValue={defaultValue ?? ""} className={inputClass}>
          <option value="" disabled>
            {placeholder ?? "Select"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} required={required} placeholder={placeholder} maxLength={2000} rows={7} className={inputClass} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={inputClass} />
      )}
    </label>
  );
}

/** The Book a Service form, field for field as on hyundai-nishat.com, with
 * the city and dealer set to Islamabad. */
export function BookServiceForm({
  yearOptions,
  defaultType,
}: {
  /** Built by the page on the server (see getServiceYearOptions) so the list
   * is always current and matches between server and browser render. */
  yearOptions: FormOption[];
  defaultType?: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-line bg-[#f6f3f2] px-6 py-10 text-center">
        <p className="text-lg font-semibold">Appointment requested.</p>
        <p className="mt-2 text-[14px] text-muted">Our service advisor will confirm your slot shortly.</p>
      </div>
    );
  }

  const fields: Field[] = [
    { label: "Name", name: "name", placeholder: "Name" },
    { label: "Email", name: "email", type: "email", placeholder: "Email" },
    { label: "Mobile", name: "mobile", type: "tel", placeholder: "XXXX - XXXXXXX" },
    { label: "Model", name: "year", options: yearOptions },
    { label: "Model Name", name: "model", options: serviceModelOptions },
    { label: "Service type", name: "type", options: serviceTypes, defaultValue: defaultType },
    { label: "City", name: "city", options: [{ label: "Islamabad", value: "islamabad" }], defaultValue: "islamabad", placeholder: "Select City" },
    { label: "Dealer name", name: "dealer", options: [{ label: "Hyundai-Islamabad", value: "hyundai-islamabad" }], defaultValue: "hyundai-islamabad" },
    { label: "Service appointment date", name: "date", type: "date" },
    { label: "Service appointment time", name: "time", type: "time" },
    { label: "VIN number", name: "vin", required: false, placeholder: "MALAA02HR4M123456" },
    { label: "Registration no.", name: "reg", placeholder: "Registration No." },
    { label: "Odometer (KM’s)", name: "odo", placeholder: "Odometer (KM’s)" },
    { label: "Comments (max 2,000 characters)", name: "comments", type: "textarea", placeholder: "Type Your Comment..." },
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="mb-8 flex items-baseline gap-6">
        <h2 className="text-2xl font-semibold">Salutation</h2>
        <p className="text-[13px]">
          Required fields <span className="text-accent">*</span>
        </p>
      </div>
      <div className="space-y-3">
        {fields.map((field) => (
          <Row key={field.name} field={field} />
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-1">
        <button type="submit" className="w-[120px] bg-navy py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#003a7a]">
          Submit
        </button>
        <button type="reset" className="w-[120px] bg-[#cfcfcf] py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#bdbdbd]">
          Reset
        </button>
      </div>
    </form>
  );
}
