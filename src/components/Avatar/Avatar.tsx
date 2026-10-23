import type { HTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export type AvatarProps = {
  /** Photo URL. Without it the avatar shows the "no photo yet" drawing. */
  src?: string | null;
  /**
   * Accessible text: the photo's alt, or what the empty avatar stands for
   * (e.g. "No photo yet"). Leave it out when the name is already next to it.
   */
  label?: string;
  /** Width and height in pixels. */
  size?: number;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/*
 * The empty state is drawn on a 24px grid in the logo's language, like
 * CollectionIcon: a thin ivory head and shoulders, with the gold arrival dot.
 */
const PERSON = "M15.2 9.6a3.2 3.2 0 1 1-6.4 0a3.2 3.2 0 1 1 6.4 0ZM5.6 20.6c.7-3.5 3.2-5.6 6.4-5.6s5.7 2.1 6.4 5.6";

/** Round portrait of a person, with a drawn placeholder while there is no photo. */
export function Avatar({ src, label, size = 56, className, style, ...props }: AvatarProps) {
  const empty = !src;
  const classes = [styles.avatar, empty && styles.empty, className].filter(Boolean).join(" ");
  const a11y = empty && label ? { role: "img", "aria-label": label } : { "aria-hidden": empty || undefined };

  return (
    <span
      className={classes}
      style={{ width: size, height: size, ...style }}
      data-empty={empty || undefined}
      {...a11y}
      {...props}
    >
      {empty ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.drawing}>
          <path d={PERSON} className={styles.line} />
          <circle cx="18.4" cy="5.6" r="1.5" className={styles.accent} />
        </svg>
      ) : (
        <img src={src} alt={label ?? ""} className={styles.photo} />
      )}
    </span>
  );
}
