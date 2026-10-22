import { fireEvent, render, screen } from "@testing-library/react";
import { SelectField } from "./SelectField";

const options = [
  { value: "", label: "Todos" },
  { value: "Polônia", label: "Polônia" },
  { value: "Hungria", label: "Hungria" },
];

describe("SelectField", () => {
  it("labels the select and shows the current option", () => {
    render(<SelectField label="País de origem" options={options} value="Hungria" onChange={() => {}} />);
    expect(screen.getByRole("combobox", { name: "País de origem" })).toHaveValue("Hungria");
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("reports the chosen value", () => {
    const onChange = vi.fn();
    render(<SelectField label="País de origem" options={options} value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Polônia" } });
    expect(onChange).toHaveBeenCalledWith("Polônia");
  });
});

describe("SelectField with icons", () => {
  const flagged = [
    { value: "", label: "Todos" },
    { value: "Polônia", label: "Polônia", icon: <svg data-testid="pl" /> },
    { value: "Hungria", label: "Hungria", icon: <svg data-testid="hu" /> },
  ];
  const scrollIntoView = vi.fn();

  beforeAll(() => {
    Element.prototype.scrollIntoView = scrollIntoView;
  });

  function setup(value = "", onChange = vi.fn()) {
    render(<SelectField label="País de origem" options={flagged} value={value} onChange={onChange} />);
    return { combobox: screen.getByRole("combobox", { name: "País de origem" }), onChange };
  }

  it("shows the current option with its icon and keeps the list closed", () => {
    const { combobox } = setup("Hungria");
    expect(combobox).toHaveTextContent("Hungria");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("hu")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("falls back to the first option and shows no icon for it", () => {
    const { combobox } = setup("Unknown");
    expect(combobox).toHaveTextContent("Todos");
    expect(combobox.querySelector("svg")).toBeNull();
  });

  it("opens on click, marks the selected option and chooses with a click", () => {
    const { combobox, onChange } = setup("Polônia");
    fireEvent.click(combobox);
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox", { name: "País de origem" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Polônia" })).toHaveAttribute("aria-selected", "true");
    expect(combobox).toHaveAttribute("aria-activedescendant", screen.getByRole("option", { name: "Polônia" }).id);
    expect(scrollIntoView).toHaveBeenCalled();

    const hungria = screen.getByRole("option", { name: "Hungria" });
    fireEvent.mouseEnter(hungria);
    expect(hungria).toHaveAttribute("data-active", "true");
    expect(fireEvent.mouseDown(hungria)).toBe(false);
    fireEvent.click(hungria);
    expect(onChange).toHaveBeenCalledWith("Hungria");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes on a second click and on blur", () => {
    const { combobox } = setup();
    fireEvent.click(combobox);
    fireEvent.click(combobox);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    fireEvent.click(combobox);
    fireEvent.blur(combobox);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("moves through the options with the keyboard", () => {
    const { combobox, onChange } = setup();
    const activeLabel = () =>
      document.getElementById(combobox.getAttribute("aria-activedescendant") ?? "")?.textContent;

    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(activeLabel()).toBe("Todos");
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(activeLabel()).toBe("Hungria");
    fireEvent.keyDown(combobox, { key: "ArrowUp" });
    expect(activeLabel()).toBe("Polônia");
    fireEvent.keyDown(combobox, { key: "Home" });
    fireEvent.keyDown(combobox, { key: "ArrowUp" });
    expect(activeLabel()).toBe("Todos");
    fireEvent.keyDown(combobox, { key: "End" });
    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(onChange).toHaveBeenLastCalledWith("Hungria");

    fireEvent.keyDown(combobox, { key: "Enter" });
    fireEvent.keyDown(combobox, { key: " " });
    expect(onChange).toHaveBeenLastCalledWith("");

    fireEvent.keyDown(combobox, { key: "ArrowUp" });
    fireEvent.keyDown(combobox, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.keyDown(combobox, { key: " " });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(fireEvent.keyDown(combobox, { key: "Tab" })).toBe(true);
    fireEvent.keyDown(combobox, { key: "a" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("opens where scrollIntoView is missing, as in jsdom", () => {
    const original = Element.prototype.scrollIntoView;
    // @ts-expect-error simulate an engine without it
    delete Element.prototype.scrollIntoView;
    const { combobox } = setup();
    fireEvent.click(combobox);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    Element.prototype.scrollIntoView = original;
  });

  it("opens below the field, fixed to the window so a scrolling panel cannot clip it", () => {
    const { combobox } = setup();
    vi.spyOn(combobox, "getBoundingClientRect").mockReturnValue(new DOMRect(16, 100, 300, 40));
    fireEvent.click(combobox);
    const list = screen.getByRole("listbox");
    expect(list.parentElement).toBe(document.body);
    expect(list).toHaveStyle({ top: "144px", left: "16px", width: "300px", maxHeight: "280px" });
  });

  it("opens above the field when there is little room below", () => {
    const { combobox } = setup();
    vi.spyOn(combobox, "getBoundingClientRect").mockReturnValue(new DOMRect(16, window.innerHeight - 120, 300, 40));
    fireEvent.click(combobox);
    expect(screen.getByRole("listbox")).toHaveStyle({ bottom: "124px", maxHeight: "280px" });
  });

  it("closes when the page scrolls or resizes, but not when the list itself scrolls", () => {
    const { combobox } = setup();
    fireEvent.click(combobox);
    fireEvent.scroll(screen.getByRole("listbox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.scroll(document);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    fireEvent.click(combobox);
    fireEvent(window, new Event("resize"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<SelectField label="País" options={flagged} value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("combobox", { name: "País" })).toBeDisabled();
  });
});
