import type { HTMLAttributes } from "react";
import styles from "./Portrait.module.css";

export type PortraitProps = {
  /** Photo URL. Without it the frame shows the "no photo yet" drawing. */
  src?: string | null;
  /** The photo's alt, or what the empty frame stands for (e.g. "Ainda sem foto"). */
  label: string;
  /** Small line under the photo, e.g. its credit. */
  caption?: string | null;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

// The same head and shoulders as Avatar's empty state, on its 24px grid.
const PERSON = "M15.2 9.6a3.2 3.2 0 1 1-6.4 0a3.2 3.2 0 1 1 6.4 0ZM5.6 20.6c.7-3.5 3.2-5.6 6.4-5.6s5.7 2.1 6.4 5.6";

/** A person's photo in a 4:5 frame that fills its container's width, e.g. on an artist's record. */
export function Portrait({ src, label, caption, className, ...props }: PortraitProps) {
  const empty = !src;

  return (
    <figure className={[styles.portrait, className].filter(Boolean).join(" ")} data-empty={empty || undefined} {...props}>
      <span className={styles.frame}>
        {empty ? (
          <svg viewBox="0 0 24 24" role="img" aria-label={label} className={styles.drawing}>
            <path d={PERSON} className={styles.line} />
            <circle cx="18.4" cy="5.6" r="1.5" className={styles.accent} />
          </svg>
        ) : (
          <img src={src} alt={label} className={styles.photo} />
        )}
      </span>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
