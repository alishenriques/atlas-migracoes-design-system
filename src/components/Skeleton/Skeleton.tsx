import type { HTMLAttributes } from "react";
import styles from "./Skeleton.module.css";

export type SkeletonShape = "block" | "text" | "circle";

export type SkeletonProps = {
  /** "block" for panels, maps and cards; "text" for lines of copy; "circle" for avatars and dots. */
  shape?: SkeletonShape;
  /** CSS width (a number is pixels). Blocks and text fill their container by default. */
  width?: number | string;
  /** CSS height of a block or of each text line (a number is pixels). A circle is as tall as it is wide. */
  height?: number | string;
  /** For "text": how many lines to draw; the last one is shorter, like the end of a paragraph. */
  lines?: number;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/**
 * Placeholder in the shape of content that is still loading. It is decorative
 * (hidden from assistive technology): the consumer announces the loading state
 * once, e.g. a `role="status"` region around a group of skeletons.
 */
export function Skeleton({ shape = "block", width, height, lines = 1, className, style, ...props }: SkeletonProps) {
  const classes = [styles.group, shape === "circle" && styles.round, className].filter(Boolean).join(" ");
  const count = shape === "text" ? Math.max(1, Math.floor(lines)) : 1;

  return (
    <span className={classes} data-shape={shape} aria-hidden="true" style={{ width, ...style }} {...props}>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={[styles.bone, styles[shape]].join(" ")}
          style={{
            height: shape === "circle" ? undefined : height,
            width: count > 1 && index === count - 1 ? "60%" : undefined,
          }}
        />
      ))}
    </span>
  );
}
