import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Toggletip.module.css";

export type ToggletipProps = {
  /** What the visitor clicks, e.g. a ReliabilityTag. */
  trigger: ReactNode;
  /** The explanation that opens under it. */
  children: ReactNode;
  /** Which edge of the trigger the bubble lines up with. */
  align?: "start" | "end";
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/**
 * A short explanation that opens when its trigger is clicked (not on hover, so
 * it works by touch and keyboard) and closes on a second click, Escape or a
 * click elsewhere.
 */
export function Toggletip({ trigger, children, align = "start", className, ...props }: ToggletipProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !root.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);

  return (
    <span ref={root} className={[styles.root, className].filter(Boolean).join(" ")} {...props}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
        <span className={styles.mark} aria-hidden="true">
          i
        </span>
      </button>
      {/* Always in the DOM as a live region, so its text is announced when it fills. */}
      <span id={id} role="status" className={styles.bubble} data-align={align} hidden={!open}>
        {open ? children : null}
      </span>
    </span>
  );
}
