import { useId, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import styles from "./Tabs.module.css";

export type Tab = {
  id: string;
  /** The tab's visible name, e.g. "Sobre". */
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  tabs: Tab[];
  /** Accessible name of the tab list, e.g. "Ficha do artista". */
  label: string;
  /** The tab open at first; the first one by default. */
  defaultTab?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * Tabs with small uppercase labels and a gold underline on the open one.
 * Arrow keys, Home and End move between tabs, as the ARIA tabs pattern asks.
 */
export function Tabs({ tabs, label, defaultTab, className, ...props }: TabsProps) {
  const [current, setCurrent] = useState(defaultTab ?? tabs[0]?.id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const move = (event: KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setCurrent(tabs[next]?.id);
    buttons.current[next]?.focus();
  };

  return (
    <div className={[styles.tabs, className].filter(Boolean).join(" ")} {...props}>
      <div role="tablist" aria-label={label} className={styles.list}>
        {tabs.map((tab, index) => {
          const selected = tab.id === current;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${id}-${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={`${id}-${tab.id}-panel`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => setCurrent(tab.id)}
              onKeyDown={(event) => move(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${id}-${tab.id}-panel`}
          aria-labelledby={`${id}-${tab.id}-tab`}
          hidden={tab.id !== current}
          className={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
