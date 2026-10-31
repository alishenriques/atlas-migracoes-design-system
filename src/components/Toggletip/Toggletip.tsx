import { useEffect, useId, useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Toggletip.module.css";

export type ToggletipProps = {
  /** What the visitor clicks, e.g. a ReliabilityTag. */
  trigger: ReactNode;
  /** The explanation that opens under it. */
  children: ReactNode;
  /** Which edge of the trigger the bubble lines up with. */
  align?: "start" | "end";
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/** Space between the trigger and the bubble, and the least between the bubble and the window's edge. */
const GAP = 8;

/**
 * Puts the bubble under its trigger (over it when there is no room below),
 * lined up with the trigger's start or end edge and kept inside the window.
 */
export function placeBubble(trigger: DOMRect, bubble: HTMLElement, align: "start" | "end") {
  const width = bubble.offsetWidth;
  const height = bubble.offsetHeight;
  const right = document.documentElement.clientWidth - GAP - width;
  const left = Math.max(GAP, Math.min(align === "end" ? trigger.right - width : trigger.left, right));
  const below = trigger.bottom + GAP;
  const above = trigger.top - GAP - height;
  const top = below + height > window.innerHeight - GAP && above >= GAP ? above : below;
  bubble.style.left = `${left}px`;
  bubble.style.top = `${top}px`;
}

/**
 * A short explanation that opens when its trigger is clicked (not on hover, so
 * it works by touch and keyboard) and closes on a second click, Escape or a
 * click elsewhere.
 *
 * Where the browser has the Popover API, the bubble opens in the top layer, so
 * a scrolling or blurred block around the trigger (a floating panel over a map)
 * never clips it; it stays in place in the DOM, so it is still read right
 * after its trigger. Elsewhere it falls back to opening under the trigger.
 */
export function Toggletip({ trigger, children, align = "start", className, ...props }: ToggletipProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLSpanElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    const element = bubble.current;
    const trigger = element?.previousElementSibling;
    if (!open || !element || !trigger || typeof element.showPopover !== "function") return;
    // Set here, not in the markup: only where the API is there to open it.
    element.setAttribute("popover", "manual");
    element.showPopover();
    const place = () => placeBubble(trigger.getBoundingClientRect(), element, align);
    place();
    // Follows the trigger while the page or the block around it scrolls.
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      element.hidePopover();
      element.removeAttribute("popover");
    };
  }, [open, align]);

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
        <InfoMark />
      </button>
      {/* Always in the DOM as a live region, so its text is announced when it fills. */}
      <span
        ref={bubble}
        id={id}
        role="status"
        className={styles.bubble}
        data-align={align}
        hidden={!open}
      >
        {open ? children : null}
      </span>
    </span>
  );
}

/**
 * The "Traço" info mark: an open arc that ends in a gold dot (an arrival, as on
 * the map's trajectories) around the stem of an "i".
 */
function InfoMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path className={styles.line} d="M 12.2 3.4 A 6.4 6.4 0 1 0 14.4 7.4" />
      <line className={styles.line} x1="8" y1="7" x2="8" y2="11.4" />
      <circle className={styles.tittle} cx="8" cy="4.9" r="0.85" />
      <circle className={styles.arrival} cx="13.6" cy="5" r="1.15" />
    </svg>
  );
}
