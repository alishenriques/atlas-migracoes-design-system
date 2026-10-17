import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Eyebrow.module.css";

export type EyebrowProps = {
  children: ReactNode;
  /** "accent" for gold labels (section titles on the map), "muted" for quiet ones. */
  tone?: "accent" | "muted";
} & HTMLAttributes<HTMLParagraphElement>;

/** Small uppercase label used above a headline or as a panel title. */
export function Eyebrow({ children, tone = "accent", className, ...props }: EyebrowProps) {
  const classes = [styles.eyebrow, styles[tone], className].filter(Boolean).join(" ");

  return (
    <p className={classes} data-tone={tone} {...props}>
      {children}
    </p>
  );
}
