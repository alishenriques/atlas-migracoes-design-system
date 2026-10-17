import type { HTMLAttributes, ReactNode } from "react";
import styles from "./StatGrid.module.css";

export type Stat = {
  /** e.g. "31" */
  value: string;
  /** e.g. "artistas" */
  label: string;
  /** Optional decorative icon shown before the number. */
  icon?: ReactNode;
};

export type StatGridProps = {
  stats: Stat[];
} & Omit<HTMLAttributes<HTMLDListElement>, "children">;

/** A row of collection counters, like the strip under the map (artists, works, exhibitions). */
export function StatGrid({ stats, className, ...props }: StatGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ");

  return (
    <dl className={classes} {...props}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.cell}>
          {stat.icon && (
            <span className={styles.icon} aria-hidden="true">
              {stat.icon}
            </span>
          )}
          <div className={styles.text}>
            <dd className={styles.value}>{stat.value}</dd>
            <dt className={styles.label}>{stat.label}</dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
