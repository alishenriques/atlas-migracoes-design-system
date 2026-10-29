import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Accordion.module.css";

export type AccordionProps = {
  children: ReactNode;
  /** Section title in the header, e.g. "Obras". */
  title: string;
  /** How many items the section holds, shown beside the title. */
  count?: number;
  /** Highlighted element on the right of the header, e.g. a ReliabilityTag or a Toggletip around one. */
  status?: ReactNode;
  /** Starts open. */
  defaultOpen?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, "title">;

/**
 * A section that folds to its header (title, count and status) and slides open
 * to show its content. The status sits beside the toggle, not inside it, so it
 * can be interactive itself.
 */
export function Accordion({ children, title, count, status, defaultOpen = false, className, ...props }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const classes = [styles.accordion, className].filter(Boolean).join(" ");

  return (
    <section className={classes} data-open={open || undefined} {...props}>
      <header className={styles.header}>
        <h2 className={styles.heading}>
          <button
            type="button"
            id={`${id}-toggle`}
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={`${id}-content`}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={styles.chevron} aria-hidden="true" />
            <span className={styles.title}>{title}</span>
            {count !== undefined && (
              <>
                <span className={styles.count} aria-hidden="true">
                  {count}
                </span>
                {/* Read as "Obras (12)" instead of "Obras12". */}
                <span className={styles.srOnly}> ({count})</span>
              </>
            )}
          </button>
        </h2>
        {status && <div className={styles.status}>{status}</div>}
      </header>
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-toggle`}
        className={styles.panel}
        inert={!open}
      >
        <div className={styles.clip}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </section>
  );
}
