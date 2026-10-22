import { render } from "@testing-library/react";
import { CollectionIcon, type CollectionIconName } from "./CollectionIcon";

const NAMES: CollectionIconName[] = ["artists", "works", "exhibitions", "publications", "countries"];

describe("CollectionIcon", () => {
  it.each(NAMES)("draws %s as an ivory line with one gold accent", (name) => {
    const { container } = render(<CollectionIcon name={name} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("data-icon", name);
    expect(svg?.querySelectorAll("path")[0]?.getAttribute("d")).toBeTruthy();
    expect(svg?.querySelector("g")?.childElementCount).toBe(1);
  });

  it("is decorative and 24px by default", () => {
    const { container } = render(<CollectionIcon name="works" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("width", "24");
  });

  it("takes a size and merges a custom className", () => {
    const { container } = render(<CollectionIcon name="countries" size={40} className="extra" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("height", "40");
    expect(svg).toHaveClass("extra");
  });
});
