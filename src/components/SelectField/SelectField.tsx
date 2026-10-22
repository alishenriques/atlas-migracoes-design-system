import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import styles from "./SelectField.module.css";

export type SelectOption = {
  value: string;
  label: string;
  /** Decorative mark before the label, e.g. a country flag. Any option with one switches to the custom list. */
  icon?: ReactNode;
};

export type SelectFieldProps = {
  /** Visible label above the field, e.g. "País de origem". */
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value" | "children">;

/**
 * A labelled select styled for the map panels, e.g. the origin-country filter.
 * Plain options render a native select; options with an icon render a listbox,
 * since a native select cannot show images.
 */
export function SelectField({ label, options, value, onChange, className, id, ...props }: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const classes = [styles.root, className].filter(Boolean).join(" ");

  if (options.some((option) => option.icon)) {
    return (
      <div className={classes}>
        <IconSelect
          id={selectId}
          label={label}
          options={options}
          value={value}
          onChange={onChange}
          disabled={props.disabled}
        />
      </div>
    );
  }

  return (
    <div className={classes}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>
      <select
        id={selectId}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type IconSelectProps = {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

// Room kept between the list and the field, and between the list and the window edge.
const GAP = 4;
const EDGE = 8;
const MAX_LIST_HEIGHT = 280;

/**
 * Where the open list goes: under the field, or above it when there is little room below.
 * The list is fixed to the window, so a scrolling panel around the field cannot clip it.
 */
function placeList(field: DOMRect): CSSProperties {
  const below = window.innerHeight - field.bottom - GAP - EDGE;
  const above = field.top - GAP - EDGE;
  const up = below < 200 && above > below;
  return {
    left: field.left,
    width: field.width,
    maxHeight: Math.min(MAX_LIST_HEIGHT, up ? above : below),
    ...(up ? { bottom: window.innerHeight - field.top + GAP } : { top: field.bottom + GAP }),
  };
}

/** Select-only combobox (WAI-ARIA pattern): focus stays on the button, the list follows aria-activedescendant. */
function IconSelect({ id, label, options, value, onChange, disabled }: IconSelectProps) {
  const labelId = `${id}-label`;
  const listId = `${id}-list`;
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const current = options[selectedIndex];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selectedIndex);
  const [place, setPlace] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Optional call: jsdom and older engines lack scrollIntoView.
    if (open) listRef.current?.children[active]?.scrollIntoView?.({ block: "nearest" });
  }, [open, active]);

  // A fixed list would drift from its field, so it closes when the page or a panel scrolls.
  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (event.target !== listRef.current) setOpen(false);
    };
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  function show() {
    setPlace(placeList(triggerRef.current!.getBoundingClientRect()));
    setActive(selectedIndex);
    setOpen(true);
  }

  function choose(index: number) {
    setOpen(false);
    onChange(options[index].value);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    const keys: Record<string, () => void> = open
      ? {
          ArrowDown: () => setActive(Math.min(active + 1, last)),
          ArrowUp: () => setActive(Math.max(active - 1, 0)),
          Home: () => setActive(0),
          End: () => setActive(last),
          Enter: () => choose(active),
          " ": () => choose(active),
          Escape: () => setOpen(false),
        }
      : { ArrowDown: show, ArrowUp: show, Enter: show, " ": show };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  return (
    <>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        disabled={disabled}
        className={`${styles.select} ${styles.trigger}`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
      >
        {current.icon ? (
          <span aria-hidden className={styles.icon}>
            {current.icon}
          </span>
        ) : null}
        <span className={styles.value}>{current.label}</span>
        <span aria-hidden className={styles.chevron} />
      </button>
      {open
        ? createPortal(
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              className={styles.list}
              style={place}
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  data-active={index === active || undefined}
                  className={styles.option}
                  // Keep focus on the button, so choosing does not blur and close first.
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(index)}
                >
                  {/* Always present, so labels without an icon line up with the rest. */}
                  <span aria-hidden className={styles.icon}>
                    {option.icon}
                  </span>
                  {option.label}
                </li>
              ))}
            </ul>,
            document.body,
          )
        : null}
    </>
  );
}
