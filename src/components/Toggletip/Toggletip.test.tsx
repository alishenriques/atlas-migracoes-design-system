import { fireEvent, render, screen } from "@testing-library/react";
import { Toggletip } from "./Toggletip";

function setup(align?: "start" | "end") {
  render(
    <div>
      <Toggletip trigger="Documentado" align={align} className="extra">
        Registrado no acervo do MAC USP.
      </Toggletip>
      <p>Fora</p>
    </div>,
  );
  return screen.getByRole("button", { name: /Documentado/ });
}

describe("Toggletip", () => {
  it("opens its explanation on click and closes on a second click", () => {
    const trigger = setup();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Registrado no acervo do MAC USP.")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Registrado no acervo do MAC USP.");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape but not on other keys", () => {
    const trigger = setup();
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Tab" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on a click outside, not inside", () => {
    const trigger = setup("end");
    fireEvent.click(trigger);
    fireEvent.pointerDown(screen.getByRole("status"));
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("status")).toHaveAttribute("data-align", "end");
    fireEvent.pointerDown(screen.getByText("Fora"));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger.parentElement).toHaveClass("extra");
  });
});
