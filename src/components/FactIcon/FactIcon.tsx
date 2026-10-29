import type { SVGAttributes } from "react";
import styles from "./FactIcon.module.css";

export type FactIconName = "nationality" | "occupation" | "period" | "institution" | "movement" | "education" | "group";

export type FactIconProps = {
  /** Which fact about a person the icon stands for. */
  name: FactIconName;
  /** Width and height in pixels. */
  size?: number;
} & Omit<SVGAttributes<SVGSVGElement>, "children">;

/*
 * The "Traço" family on its 24px grid, like EventIcon: a thin ivory line and
 * one gold point, the point of arrival of the logo.
 */
const DRAWINGS: Record<FactIconName, { line: string; dot: [number, number] }> = {
  // A globe: outline, equator and one meridian.
  nationality: { line: "M20 12a8 8 0 1 1-16 0a8 8 0 1 1 16 0ZM4 12h16M12 4c2.4 2.2 3.6 4.9 3.6 8s-1.2 5.8-3.6 8c-2.4-2.2-3.6-4.9-3.6-8S9.6 6.2 12 4Z", dot: [18.4, 5.6] },
  // A brush laid diagonally.
  occupation: { line: "M19.5 4.5 11 13M11 13c-1.6-.6-3.4.2-3.9 1.9L6 19l4.1-1.1c1.7-.5 2.5-2.3 1.9-3.9", dot: [6.4, 18.6] },
  // A calendar page.
  period: { line: "M5 6.5h14v13H5ZM5 10.5h14M9 4v4M15 4v4", dot: [15.5, 15.5] },
  // A building with columns.
  institution: { line: "M4 9.5 12 5l8 4.5M5.5 9.5v8M9.8 9.5v8M14.2 9.5v8M18.5 9.5v8M4 20h16", dot: [12, 7.6] },
  // Two waves: a current shared by artists.
  movement: { line: "M3.5 10c2.1-2.4 4.2-2.4 6.3 0s4.2 2.4 6.3 0M7.9 15c2.1-2.4 4.2-2.4 6.3 0s4.2 2.4 6.3 0", dot: [20.5, 15] },
  // A graduation cap.
  education: { line: "M3 9.5 12 5l9 4.5-9 4.5ZM7 11.5v4c1.5 1.4 3.1 2 5 2s3.5-.6 5-2v-4", dot: [20.5, 14.5] },
  // Three heads: a group.
  group: { line: "M14.4 8.6a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0ZM7.5 19c.5-2.8 2.3-4.4 4.5-4.4s4 1.6 4.5 4.4M5.6 11.8a1.7 1.7 0 1 1 0 .01M3 17.6c.3-1.6 1.2-2.7 2.6-3M18.4 11.8a1.7 1.7 0 1 1 0 .01M21 17.6c-.3-1.6-1.2-2.7-2.6-3", dot: [12, 3.2] },
};

/** Decorative icon for a fact in an artist's record (nationality, occupation…), next to its label. */
export function FactIcon({ name, size = 24, className, ...props }: FactIconProps) {
  const { line, dot } = DRAWINGS[name];

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      data-icon={name}
      className={[styles.icon, className].filter(Boolean).join(" ")}
      {...props}
    >
      <path d={line} className={styles.line} />
      <circle cx={dot[0]} cy={dot[1]} r="1.5" className={styles.accent} />
    </svg>
  );
}
