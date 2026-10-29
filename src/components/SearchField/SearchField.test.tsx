import { fireEvent, render, screen } from "@testing-library/react";
import { SearchField } from "./SearchField";

function setup(value = "", props: { onKeyDown?: () => void; id?: string; className?: string } = {}) {
  const onChange = vi.fn();
  const view = render(
    <SearchField label="Buscar artista" clearLabel="Limpar busca" placeholder="Nome" value={value} onChange={onChange} {...props} />,
  );
  return { ...view, onChange, input: screen.getByRole("searchbox", { name: "Buscar artista" }) };
}

describe("SearchField", () => {
  it("labels the search box and shows its value", () => {
    const { input } = setup("Segall");
    expect(input).toHaveValue("Segall");
    expect(input).toHaveAttribute("placeholder", "Nome");
  });

  it("reports what is typed", () => {
    const { input, onChange } = setup();
    fireEvent.change(input, { target: { value: "Las" } });
    expect(onChange).toHaveBeenCalledWith("Las");
  });

  it("offers the clear button only when there is text", () => {
    setup();
    expect(screen.queryByRole("button", { name: "Limpar busca" })).not.toBeInTheDocument();
  });

  it("empties the field from the clear button", () => {
    const { onChange } = setup("Segall");
    fireEvent.click(screen.getByRole("button", { name: "Limpar busca" }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("empties the field on Escape and still calls the caller's key handler", () => {
    const onKeyDown = vi.fn();
    const { input, onChange } = setup("Segall", { onKeyDown });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onChange).toHaveBeenCalledWith("");
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("leaves other keys and an empty field alone", () => {
    const { input, onChange } = setup();
    fireEvent.keyDown(input, { key: "Escape" });
    fireEvent.keyDown(input, { key: "a" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("keeps a given id and class", () => {
    const { input, container } = setup("", { id: "busca", className: "extra" });
    expect(input).toHaveAttribute("id", "busca");
    expect(container.firstElementChild).toHaveClass("extra");
  });
});
