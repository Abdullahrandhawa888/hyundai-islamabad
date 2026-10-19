"use client";

import { useState } from "react";
import { contactTopics, modelOptions } from "@/lib/data";
import { Button } from "./Button";
import { FormField } from "./FormField";

type EnquiryFormProps = {
  intent?: "enquiry" | "brochure" | "contact";
  defaultModel?: string;
  /** contact only: pre-selects "What can we help with?" (a contactTopics value). */
  defaultTopic?: string;
  /** contact only: show the optional model picker. */
  showModel?: boolean;
  /** Override the form heading. */
  title?: string;
};

const titles: Record<NonNullable<EnquiryFormProps["intent"]>, string> = {
  enquiry: "Make an enquiry",
  brochure: "Request a brochure",
  contact: "How can we help you?",
};

export function EnquiryForm({
  intent = "enquiry",
  defaultModel,
  defaultTopic,
  showModel = true,
  title,
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
      <h3 className="text-xl font-light">{title ?? titles[intent]}</h3>
      <input type="hidden" name="intent" value={intent} />
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" name="name" required />
        <FormField label="Phone" name="phone" type="tel" required />
        <FormField label="Email" name="email" type="email" required />
        {intent === "contact" ? (
          <FormField
            label="What can we help with?"
            name="topic"
            as="select"
            required
            options={contactTopics}
            defaultValue={defaultTopic}
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
        {intent === "contact" && showModel ? (
          <FormField
            label="Model (optional)"
            name="model"
            as="select"
            options={modelOptions}
            defaultValue={defaultModel}
          />
        ) : null}
      </div>
      <FormField
        label={intent === "contact" ? "Your message" : "Comments"}
        name="message"
        as="textarea"
        placeholder="Tell us how we can help"
      />
      <Button type="submit" variant="primary">
        {intent === "contact" ? "Send message" : "Submit"}
      </Button>
    </form>
  );
}
