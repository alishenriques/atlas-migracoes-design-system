import { render, screen } from "@testing-library/react";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders its content", () => {
    render(<Eyebrow>Camadas do mapa</Eyebrow>);
    expect(screen.getByText("Camadas do mapa")).toBeInTheDocument();
  });

  it("uses the accent tone by default and accepts muted", () => {
    const { rerender } = render(<Eyebrow>Filtros</Eyebrow>);
    expect(screen.getByText("Filtros")).toHaveAttribute("data-tone", "accent");
    rerender(<Eyebrow tone="muted">Filtros</Eyebrow>);
    expect(screen.getByText("Filtros")).toHaveAttribute("data-tone", "muted");
  });

  it("merges a custom className", () => {
    render(<Eyebrow className="extra">Label</Eyebrow>);
    expect(screen.getByText("Label")).toHaveClass("extra");
  });
});
