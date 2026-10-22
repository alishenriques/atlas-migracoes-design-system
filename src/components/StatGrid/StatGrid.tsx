import type { HTMLAttributes, ReactNode } from "react";
import styles from "./StatGrid.module.css";

export type Stat = {
  /** e.g. "31" */
  value: string;
  /** e.g. "artistas" */
  label: string;
  /**
   * Optional decorative icon, shown to the left of the number and its label,
   * centred on both (e.g. a `CollectionIcon`; it is sized to 40px).
   */
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
        // dt before dd and nothing else in the wrapper div, as a description
        // list requires; CSS shows the number on top of its label.
        <div key={stat.label} className={stat.icon ? `${styles.cell} ${styles.withIcon}` : styles.cell}>
          <dt className={styles.label}>{stat.label}</dt>
          <dd className={styles.value}>
            {stat.icon && (
              <span className={styles.icon} aria-hidden="true">
                {stat.icon}
              </span>
            )}
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
