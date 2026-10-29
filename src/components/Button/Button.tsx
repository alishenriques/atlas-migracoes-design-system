import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  /**
   * Styles the single child element (e.g. the app's router link) as the button
   * instead of rendering a <button>, so a link can look like one.
   */
  asChild?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  asChild = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (asChild && isValidElement<{ className?: string }>(children)) {
    return cloneElement(children, {
      className: [classes, children.props.className].filter(Boolean).join(" "),
      "data-variant": variant,
    } as { className: string });
  }

  return (
    <button type={type} className={classes} data-variant={variant} {...props}>
      {children}
    </button>
  );
}
