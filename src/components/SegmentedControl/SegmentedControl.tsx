import { useId } from "react";
import styles from "./SegmentedControl.module.css";

export type SegmentedOption = {
  value: string;
  label: string;
};

export type SegmentedControlProps = {
  /** Visible label of the group, e.g. "Década". */
  label: string;
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * One choice among a few short options, shown side by side, e.g. the decade of
 * the historical map. Native radios, so arrow keys and screen readers work as usual.
 */
export function SegmentedControl({ label, options, value, onChange, className }: SegmentedControlProps) {
  const name = useId();
  const classes = [styles.root, className].filter(Boolean).join(" ");

  return (
    <fieldset className={classes}>
      <legend className={styles.label}>{label}</legend>
      <div className={styles.track}>
        {options.map((option) => (
          <label key={option.value} className={styles.segment}>
            <input
              type="radio"
              className={styles.input}
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            <span className={styles.text}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
