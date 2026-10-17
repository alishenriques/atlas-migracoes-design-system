import { useId, type SelectHTMLAttributes } from "react";
import styles from "./SelectField.module.css";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = {
  /** Visible label above the field, e.g. "País de origem". */
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value" | "children">;

/** A labelled native select styled for the map panels, e.g. the origin-country filter. */
export function SelectField({ label, options, value, onChange, className, id, ...props }: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const classes = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>
      <select
        id={selectId}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
