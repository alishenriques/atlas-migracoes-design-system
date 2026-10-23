import type { SVGAttributes } from "react";
import styles from "./EventIcon.module.css";

export type EventIconName = "birth" | "death";

export type EventIconProps = {
  /** Which event in a life the icon stands for. */
  name: EventIconName;
  /** Width and height in pixels. */
  size?: number;
} & Omit<SVGAttributes<SVGSVGElement>, "children">;

/*
 * Same 24px grid and language as CollectionIcon: a thin ivory line and one
 * gold element. A sun on the horizon, rising for birth and setting for death,
 * so the pair reads without religious symbols (the † of genealogies).
 */
const HORIZON = "M3 18h18M7 18a5 5 0 0 1 10 0M8.5 21h7";
const ARROWS: Record<EventIconName, string> = {
  birth: "M12 10V3.8M9.6 6.2 12 3.8l2.4 2.4",
  death: "M12 3.8V10M9.6 7.6 12 10l2.4-2.4",
};

/** Decorative icon for an event in a life (birth, death), next to its label. */
export function EventIcon({ name, size = 24, className, ...props }: EventIconProps) {
  const classes = [styles.icon, className].filter(Boolean).join(" ");

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      data-icon={name}
      className={classes}
      {...props}
    >
      <path d={`${HORIZON}${ARROWS[name]}`} className={styles.line} />
      <circle cx="12" cy="15.6" r="1.6" className={styles.accent} />
    </svg>
  );
}
