type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  options?: { label: string; value: string }[];
  defaultValue?: string;
};

export function FormField({
  label,
  name,
  required,
  type = "text",
  placeholder,
  as = "input",
  options,
  defaultValue,
}: FieldProps) {
  const fieldClass =
    "w-full border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-accent";

  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold tracking-wide text-foreground">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          defaultValue={defaultValue}
          className={fieldClass}
        />
      ) : as === "select" ? (
        <select
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          className={fieldClass}
        >
          <option value="" disabled>
            Select
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={fieldClass}
        />
      )}
    </label>
  );
}
