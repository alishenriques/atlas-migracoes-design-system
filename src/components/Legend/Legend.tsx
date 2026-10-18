import type { HTMLAttributes } from "react";
import styles from "./Legend.module.css";

/** Kinds of entity, each with its own `--atlas-color-entity-*` token. */
export type EntityTone = "artist" | "work" | "exhibition" | "publication" | "institution" | "place";

export type LegendItem = {
  tone: EntityTone;
  /** Visible text, e.g. "Artistas". */
  label: string;
  /** Optional count shown after the label. */
  count?: number;
};

export type LegendProps = {
  /** Accessible name of the list, e.g. "Legenda". */
  label: string;
  items: LegendItem[];
} & Omit<HTMLAttributes<HTMLUListElement>, "children">;

/** Colored dots naming the kinds of entity drawn on a map or graph. */
export function Legend({ label, items, className, ...props }: LegendProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ");

  return (
    <ul className={classes} aria-label={label} {...props}>
      {items.map((item) => (
        <li key={item.tone} className={styles.item} data-tone={item.tone}>
          <span className={`${styles.dot} ${styles[item.tone]}`} aria-hidden="true" />
          <span>{item.label}</span>
          {item.count !== undefined && <span className={styles.count}>{item.count}</span>}
        </li>
      ))}
    </ul>
  );
}
