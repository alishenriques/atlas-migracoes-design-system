import { fireEvent, render, screen } from "@testing-library/react";
import { Tabs } from "./Tabs";

const tabs = [
  { id: "sobre", label: "Sobre", content: <p>Pintor</p> },
  { id: "obras", label: "Obras", content: <p>Paisagem</p> },
  { id: "fontes", label: "Fontes", content: <p>MAC USP</p> },
];

describe("Tabs", () => {
  it("opens the first tab and switches on click", () => {
    render(<Tabs tabs={tabs} label="Ficha do artista" className="extra" />);
    expect(screen.getByRole("tablist", { name: "Ficha do artista" }).parentElement).toHaveClass("extra");
    expect(screen.getByRole("tab", { name: "Sobre" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Sobre" })).toHaveTextContent("Pintor");
    expect(screen.getByText("Paisagem")).not.toBeVisible();

    fireEvent.click(screen.getByRole("tab", { name: "Obras" }));
    expect(screen.getByRole("tabpanel", { name: "Obras" })).toHaveTextContent("Paisagem");
    expect(screen.getByRole("tab", { name: "Sobre" })).toHaveAttribute("tabindex", "-1");
  });

  it("moves with the arrow keys, Home and End, wrapping around", () => {
    render(<Tabs tabs={tabs} label="Ficha" defaultTab="obras" />);
    const tab = (name: string) => screen.getByRole("tab", { name });
    fireEvent.keyDown(tab("Obras"), { key: "ArrowRight" });
    expect(tab("Fontes")).toHaveFocus();
    fireEvent.keyDown(tab("Fontes"), { key: "ArrowRight" });
    expect(tab("Sobre")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tab("Sobre"), { key: "ArrowLeft" });
    expect(tab("Fontes")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tab("Fontes"), { key: "ArrowLeft" });
    expect(tab("Obras")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tab("Obras"), { key: "Home" });
    expect(tab("Sobre")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tab("Sobre"), { key: "End" });
    expect(tab("Fontes")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tab("Fontes"), { key: "a" });
    expect(tab("Fontes")).toHaveAttribute("aria-selected", "true");
  });
});
