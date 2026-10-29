import { render } from "@testing-library/react";
import { FactIcon, type FactIconName } from "./FactIcon";

const NAMES: FactIconName[] = ["nationality", "occupation", "period", "institution", "movement", "education", "group"];

describe("FactIcon", () => {
  it("draws each fact with its own ivory line and a gold point", () => {
    const drawings = NAMES.map((name) => {
      const svg = render(<FactIcon name={name} />).container.querySelector("svg");
      expect(svg).toHaveAttribute("data-icon", name);
      expect(svg?.querySelector("circle")).toBeInTheDocument();
      return svg?.querySelector("path")?.getAttribute("d");
    });
    expect(new Set(drawings).size).toBe(NAMES.length);
  });

  it("is decorative, 24px by default, and takes a size and className", () => {
    const { container, rerender } = render(<FactIcon name="period" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("width", "24");
    rerender(<FactIcon name="period" size={18} className="extra" />);
    expect(container.querySelector("svg")).toHaveAttribute("height", "18");
    expect(container.querySelector("svg")).toHaveClass("extra");
  });
});
