import { useId, type InputHTMLAttributes, type KeyboardEvent } from "react";
import styles from "./SearchField.module.css";

export type SearchFieldProps = {
  /** Visible label above the field, e.g. "Buscar artista". */
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Accessible name of the button that empties the field, e.g. "Limpar busca". */
  clearLabel: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type">;

/**
 * A labelled search box, e.g. to filter the artists of a list as the visitor types.
 * A button empties it once there is text, and so does Escape.
 */
export function SearchField({ label, value, onChange, clearLabel, className, id, onKeyDown, ...props }: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && value) {
      event.preventDefault();
      onChange("");
    }
    onKeyDown?.(event);
  }

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={styles.box}>
        {/* "Traço" magnifier: a thin ivory line with the gold point of arrival. */}
        <svg className={styles.icon} viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12.6 12.6 16.5 16.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle className={styles.point} cx="16.6" cy="16.6" r="1.6" />
        </svg>
        <input
          id={inputId}
          type="search"
          className={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          {...props}
        />
        {value ? (
          <button type="button" className={styles.clear} aria-label={clearLabel} title={clearLabel} onClick={() => onChange("")}>
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
