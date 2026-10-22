import type { ReactElement, SVGAttributes } from "react";
import styles from "./CollectionIcon.module.css";

export type CollectionIconName = "artists" | "works" | "exhibitions" | "publications" | "countries";

export type CollectionIconProps = {
  /** Which part of the collection the icon stands for. */
  name: CollectionIconName;
  /** Width and height in pixels. */
  size?: number;
} & Omit<SVGAttributes<SVGSVGElement>, "children">;

/*
 * Drawn on a 24px grid in the logo's language: a thin ivory line (currentColor)
 * and one gold element, the Rosa Leste-Sul's solid arrival dot.
 */
const DRAWINGS: Record<CollectionIconName, { line: string; accent: ReactElement }> = {
  // A person, head and shoulders.
  artists: {
    line: "M15.4 8.2a3.4 3.4 0 1 1-6.8 0a3.4 3.4 0 1 1 6.8 0ZM5 20c.6-3.8 3.4-6.2 7-6.2s6.4 2.4 7 6.2",
    accent: <circle cx="19.2" cy="4.8" r="1.6" />,
  },
  // A framed landscape, with the gold dot as its sun.
  works: {
    line: "M5 3.8h14a1.2 1.2 0 0 1 1.2 1.2v14a1.2 1.2 0 0 1-1.2 1.2H5A1.2 1.2 0 0 1 3.8 19V5A1.2 1.2 0 0 1 5 3.8ZM6.8 17.2l3.9-4.9 2.9 3 2-2 2.6 3.9",
    accent: <circle cx="15.6" cy="8.4" r="1.7" />,
  },
  // A museum portico.
  exhibitions: {
    line: "M3 9.2 12 4l9 5.2H3ZM6 12v5.6M10 12v5.6M14 12v5.6M18 12v5.6M3.5 20.2h17",
    accent: <circle cx="12" cy="7.3" r="1.2" />,
  },
  // An open book with a gold bookmark.
  publications: {
    line: "M12 6.4C10 5 7 4.5 3.8 5v13.2c3.2-.5 6.2 0 8.2 1.4 2-1.4 5-1.9 8.2-1.4V5C17 4.5 14 5 12 6.4ZM12 6.4v13.2",
    accent: <path d="M15.4 5.3v5.2l1.4-1.1 1.4 1.1V5Z" />,
  },
  // A globe with one place marked.
  countries: {
    line: "M20.4 12a8.4 8.4 0 1 1-16.8 0a8.4 8.4 0 1 1 16.8 0ZM15.6 12c0 4.6-1.6 8.4-3.6 8.4S8.4 16.6 8.4 12 10 3.6 12 3.6s3.6 3.8 3.6 8.4ZM3.6 12h16.8",
    accent: <circle cx="15.6" cy="15.6" r="1.7" />,
  },
};

/** Decorative icon for a part of the collection (artists, works, exhibitions, publications, countries). */
export function CollectionIcon({ name, size = 24, className, ...props }: CollectionIconProps) {
  const { line, accent } = DRAWINGS[name];
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
      <path d={line} className={styles.line} />
      <g className={styles.accent}>{accent}</g>
    </svg>
  );
}
