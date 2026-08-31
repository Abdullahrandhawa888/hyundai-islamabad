"use client";

import { useState } from "react";
import { feedbackTypes, modelOptions } from "@/lib/data";
import { Button } from "./Button";
import { FormField } from "./FormField";

type EnquiryFormProps = {
  intent?: "enquiry" | "testdrive" | "brochure" | "contact";
  defaultModel?: string;
};

const titles: Record<NonNullable<EnquiryFormProps["intent"]>, string> = {
  enquiry: "Make an enquiry",
  testdrive: "Request a test drive",
  brochure: "Request a brochure",
  contact: "How can we help you?",
};

export function EnquiryForm({
  intent = "enquiry",
  defaultModel,
}: EnquiryFormProps) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-[#f7f9fc] px-6 py-10 text-center">
        <p className="text-lg font-light">Thank you.</p>
        <p className="mt-2 text-[14px] text-muted">
          Your request has been received. A Hyundai Islamabad advisor will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-light">{titles[intent]}</h3>
      <input type="hidden" name="intent" value={intent} />
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" name="name" required />
        <FormField label="Phone" name="phone" type="tel" required />
        <FormField label="Email" name="email" type="email" required />
        {intent === "contact" ? (
          <FormField
            label="Feedback type"
            name="feedback"
            as="select"
            required
            options={feedbackTypes}
          />
        ) : (
          <FormField
            label="Model"
            name="model"
            as="select"
            required
            options={modelOptions}
            defaultValue={defaultModel}
          />
        )}
      </div>
      {intent === "testdrive" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Preferred date" name="date" type="date" />
          <FormField label="Preferred city" name="city" placeholder="Islamabad" />
        </div>
      ) : null}
      <FormField
        label={intent === "contact" ? "Write your queries" : "Comments"}
        name="message"
        as="textarea"
        placeholder="Tell us how we can help"
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
