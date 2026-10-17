import type { HTMLAttributes } from "react";
import styles from "./ReliabilityTag.module.css";

/** How well a piece of information is backed by sources. */
export type ReliabilityLevel = "documented" | "inferred" | "undetermined";

export type ReliabilityTagProps = {
  level: ReliabilityLevel;
  /** Visible text, e.g. "Documentado". Passed in so the consumer controls the language. */
  label: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/** A dot + label that marks whether a claim is documented, inferred or undetermined. */
export function ReliabilityTag({ level, label, className, ...props }: ReliabilityTagProps) {
  const classes = [styles.tag, styles[level], className].filter(Boolean).join(" ");

  return (
    <span className={classes} data-level={level} {...props}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
