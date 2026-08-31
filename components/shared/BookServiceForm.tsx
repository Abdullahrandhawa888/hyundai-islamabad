"use client";

import { useState } from "react";
import { serviceModelOptions, serviceTypes, serviceYearOptions } from "@/lib/data";
import { Button } from "./Button";
import { FormField } from "./FormField";

export function BookServiceForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-8 border border-line bg-[#f7f9fc] px-6 py-10 text-center">
        <p className="text-lg font-light">Appointment requested.</p>
        <p className="mt-2 text-[14px] text-muted">
          Our service advisor will confirm your slot shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" name="name" required />
        <FormField label="Email" name="email" type="email" required />
        <FormField label="Mobile" name="mobile" type="tel" required />
        <FormField
          label="Model year"
          name="year"
          as="select"
          required
          options={serviceYearOptions}
        />
        <FormField
          label="Model name"
          name="model"
          as="select"
          required
          options={serviceModelOptions}
        />
        <FormField label="Service type" name="type" as="select" required options={serviceTypes} />
        <FormField label="Registration no" name="reg" required />
        <FormField label="Odometer (KM)" name="odo" required />
        <FormField label="Appointment date" name="date" type="date" />
        <FormField label="Appointment time" name="time" type="time" />
      </div>
      <FormField label="Comments" name="comments" as="textarea" />
      <Button type="submit">Submit booking</Button>
    </form>
  );
}
