import { fireEvent, render, screen } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("starts folded, showing the title, the count and the status", () => {
    render(
      <Accordion title="Obras" count={12} status={<span>Documentado</span>}>
        <p>Paisagem</p>
      </Accordion>,
    );
    const toggle = screen.getByRole("button", { name: /^Obras\s?\(12\)$/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("heading", { level: 2 })).toContainElement(toggle);
    expect(screen.getByText("Documentado")).toBeInTheDocument();
    expect(screen.getByRole("region", { hidden: true })).toHaveAttribute("inert");
  });

  it("opens and closes from its header", () => {
    render(
      <Accordion title="Obras">
        <p>Paisagem</p>
      </Accordion>,
    );
    const toggle = screen.getByRole("button", { name: "Obras" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const region = screen.getByRole("region", { name: "Obras" });
    expect(region).not.toHaveAttribute("inert");
    expect(region).toHaveTextContent("Paisagem");
    expect(toggle.closest("section")).toHaveAttribute("data-open", "true");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("can start open and takes a class", () => {
    const { container } = render(
      <Accordion title="Trajetória" defaultOpen className="extra">
        <p>Varsóvia</p>
      </Accordion>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(container.firstElementChild).toHaveClass("extra");
  });
});
