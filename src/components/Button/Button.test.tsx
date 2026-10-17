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
});
