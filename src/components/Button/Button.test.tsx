import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the provided label", () => {
    render(<Button>Explorar evento</Button>);
    expect(screen.getByRole("button", { name: "Explorar evento" })).toBeInTheDocument();
  });

  it("defaults to type=button so it never submits a form by accident", () => {
    render(<Button>Limpar</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("applies the ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "ghost");
  });

  it("styles a child link as the button when asChild is set", () => {
    render(
      <Button asChild variant="ghost" className="extra">
        <a href="/rede" className="own">
          Ver na rede
        </a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Ver na rede" });
    expect(link).toHaveAttribute("href", "/rede");
    expect(link).toHaveAttribute("data-variant", "ghost");
    expect(link).toHaveClass("extra", "own");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("falls back to a button when asChild has no single element to style", () => {
    render(<Button asChild>Texto</Button>);
    expect(screen.getByRole("button", { name: "Texto" })).toBeInTheDocument();
  });
});
