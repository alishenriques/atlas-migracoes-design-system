import { useId, type ChangeEvent, type HTMLAttributes } from "react";
import styles from "./YearRange.module.css";

export type YearRangeValue = [from: number, to: number];

export type YearRangeProps = {
  /** First and last year the control allows, e.g. 1918 and 1989. */
  min: number;
  max: number;
  /** Selected period, inclusive. */
  value: YearRangeValue;
  onChange: (value: YearRangeValue) => void;
  /** Visible label above the track, e.g. "Período". */
  label: string;
  /** Accessible names of the two handles, e.g. "Ano inicial" and "Ano final". */
  fromLabel: string;
  toLabel: string;
  step?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** A period picker with two handles on one track, like the 1918–1989 timeline under the map. */
export function YearRange({
  min,
  max,
  value,
  onChange,
  label,
  fromLabel,
  toLabel,
  step = 1,
  className,
  ...props
}: YearRangeProps) {
  const labelId = useId();
  const from = clamp(value[0], min, max);
  const to = clamp(value[1], from, max);
  const span = max - min || 1;
  const classes = [styles.root, className].filter(Boolean).join(" ");

  // The handles can meet but never cross: each one stops at the other.
  const changeFrom = (event: ChangeEvent<HTMLInputElement>) => onChange([Math.min(Number(event.target.value), to), to]);
  const changeTo = (event: ChangeEvent<HTMLInputElement>) => onChange([from, Math.max(Number(event.target.value), from)]);

  return (
    <div role="group" aria-labelledby={labelId} className={classes} {...props}>
      <div className={styles.header}>
        <span id={labelId} className={styles.label}>
          {label}
        </span>
        <output className={styles.output}>
          {from}–{to}
        </output>
      </div>
      <div className={styles.track}>
        <span
          className={styles.fill}
          aria-hidden="true"
          style={{ left: `${((from - min) / span) * 100}%`, right: `${((max - to) / span) * 100}%` }}
        />
        <input
          type="range"
          className={styles.input}
          aria-label={fromLabel}
          min={min}
          max={max}
          step={step}
          value={from}
          onChange={changeFrom}
        />
        <input
          type="range"
          className={styles.input}
          aria-label={toLabel}
          min={min}
          max={max}
          step={step}
          value={to}
          onChange={changeTo}
        />
      </div>
      <div className={styles.bounds} aria-hidden="true">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
