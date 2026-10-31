import { fireEvent, render, screen } from "@testing-library/react";
import { placeBubble, Toggletip } from "./Toggletip";

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

  it("draws a decorative info mark that stays out of the button's name", () => {
    const trigger = setup();
    const mark = trigger.querySelector("svg");
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(trigger).toHaveAccessibleName("Documentado");
  });

  describe("in the top layer, where the browser has the Popover API", () => {
    const show = vi.fn();
    const hide = vi.fn();
    beforeEach(() => {
      HTMLElement.prototype.showPopover = show;
      HTMLElement.prototype.hidePopover = hide;
    });
    afterEach(() => {
      // jsdom has no Popover API: take the stubs off again.
      Reflect.deleteProperty(HTMLElement.prototype, "showPopover");
      Reflect.deleteProperty(HTMLElement.prototype, "hidePopover");
      show.mockClear();
      hide.mockClear();
    });

    it("shows the bubble as a popover, follows scrolling and hides it on close", () => {
      const trigger = setup();
      fireEvent.click(trigger);
      const bubble = screen.getByRole("status", { hidden: true });
      expect(bubble).toHaveAttribute("popover", "manual");
      expect(show).toHaveBeenCalledTimes(1);
      expect(bubble.style.top).toBe("8px");
      vi.spyOn(trigger, "getBoundingClientRect").mockReturnValue(new DOMRect(20, 30, 10, 10));
      fireEvent.scroll(window);
      expect(bubble.style.top).toBe("48px");
      fireEvent.click(trigger);
      expect(hide).toHaveBeenCalledTimes(1);
      expect(bubble).not.toHaveAttribute("popover");
    });
  });

  describe("placeBubble", () => {
    function bubbleOf(width: number, height: number) {
      const bubble = document.createElement("span");
      Object.defineProperty(bubble, "offsetWidth", { value: width });
      Object.defineProperty(bubble, "offsetHeight", { value: height });
      return bubble;
    }
    beforeEach(() => {
      Object.defineProperty(document.documentElement, "clientWidth", { value: 1000, configurable: true });
      Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
    });

    it("opens under the trigger, at its start or its end edge", () => {
      const trigger = new DOMRect(400, 100, 20, 20);
      const start = bubbleOf(300, 200);
      placeBubble(trigger, start, "start");
      expect([start.style.left, start.style.top]).toEqual(["400px", "128px"]);
      const end = bubbleOf(300, 200);
      placeBubble(trigger, end, "end");
      expect(end.style.left).toBe("120px");
    });

    it("stays inside the window on both sides", () => {
      const nearRight = bubbleOf(300, 200);
      placeBubble(new DOMRect(900, 100, 20, 20), nearRight, "start");
      expect(nearRight.style.left).toBe("692px");
      const nearLeft = bubbleOf(300, 200);
      placeBubble(new DOMRect(10, 100, 20, 20), nearLeft, "end");
      expect(nearLeft.style.left).toBe("8px");
    });

    it("opens over the trigger when there is no room below, and under it when there is none above either", () => {
      const low = bubbleOf(300, 200);
      placeBubble(new DOMRect(400, 700, 20, 20), low, "start");
      expect(low.style.top).toBe("492px");
      const tall = bubbleOf(300, 750);
      placeBubble(new DOMRect(400, 100, 20, 20), tall, "start");
      expect(tall.style.top).toBe("128px");
    });
  });
});
