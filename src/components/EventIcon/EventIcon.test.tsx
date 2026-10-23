import { render } from "@testing-library/react";
import { EventIcon } from "./EventIcon";

describe("EventIcon", () => {
  it("draws birth and death as different ivory lines with the same gold sun", () => {
    const birth = render(<EventIcon name="birth" />).container.querySelector("svg");
    const death = render(<EventIcon name="death" />).container.querySelector("svg");
    expect(birth).toHaveAttribute("data-icon", "birth");
    expect(death).toHaveAttribute("data-icon", "death");
    expect(birth?.querySelector("path")?.getAttribute("d")).not.toBe(death?.querySelector("path")?.getAttribute("d"));
    expect(birth?.querySelector("circle")).toBeInTheDocument();
  });

  it("is decorative, 24px by default, and takes a size and className", () => {
    const { container, rerender } = render(<EventIcon name="birth" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("width", "24");
    rerender(<EventIcon name="death" size={18} className="extra" />);
    expect(container.querySelector("svg")).toHaveAttribute("height", "18");
    expect(container.querySelector("svg")).toHaveClass("extra");
  });
});
