import { useId, type HTMLAttributes, type ReactNode } from "react";
import { Eyebrow } from "../Eyebrow";
import styles from "./Panel.module.css";

export type PanelProps = {
  children: ReactNode;
  /** Uppercase title in the panel header, e.g. "Filtros". */
  title?: string;
  /** Optional element on the right of the header, e.g. a "Limpar" link. */
  action?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "title">;

/** A translucent, bordered surface floating over the map: filters, layers, highlights. */
export function Panel({ children, title, action, className, ...props }: PanelProps) {
  const headingId = useId();
  const classes = [styles.panel, className].filter(Boolean).join(" ");

  return (
    <section className={classes} aria-labelledby={title ? headingId : undefined} {...props}>
      {(title || action) && (
        <header className={styles.header}>
          {title && (
            <Eyebrow id={headingId} tone="muted" role="heading" aria-level={2}>
              {title}
            </Eyebrow>
          )}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
