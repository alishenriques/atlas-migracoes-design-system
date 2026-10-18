import { fireEvent, render, screen } from "@testing-library/react";
import { YearRange, type YearRangeProps } from "./YearRange";

const setup = (props: Partial<YearRangeProps> = {}) => {
  const onChange = vi.fn();
  render(
    <YearRange
      min={1918}
      max={1989}
      value={[1930, 1960]}
      onChange={onChange}
      label="Período"
      fromLabel="Ano inicial"
      toLabel="Ano final"
      {...props}
    />,
  );
  return onChange;
};

describe("YearRange", () => {
  it("labels the group and both handles, and shows the selected period", () => {
    setup();
    expect(screen.getByRole("group", { name: "Período" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Ano inicial" })).toHaveValue("1930");
    expect(screen.getByRole("slider", { name: "Ano final" })).toHaveValue("1960");
    expect(screen.getByText("1930–1960")).toBeInTheDocument();
  });

  it("reports a new period when a handle moves", () => {
    const onChange = setup();
    fireEvent.change(screen.getByRole("slider", { name: "Ano inicial" }), { target: { value: "1940" } });
    expect(onChange).toHaveBeenLastCalledWith([1940, 1960]);
    fireEvent.change(screen.getByRole("slider", { name: "Ano final" }), { target: { value: "1975" } });
    expect(onChange).toHaveBeenLastCalledWith([1930, 1975]);
  });

  it("never lets the handles cross", () => {
    const onChange = setup();
    fireEvent.change(screen.getByRole("slider", { name: "Ano inicial" }), { target: { value: "1970" } });
    expect(onChange).toHaveBeenLastCalledWith([1960, 1960]);
    fireEvent.change(screen.getByRole("slider", { name: "Ano final" }), { target: { value: "1920" } });
    expect(onChange).toHaveBeenLastCalledWith([1930, 1930]);
  });

  it("keeps a value outside the bounds inside them", () => {
    setup({ value: [1900, 2000] });
    expect(screen.getByText("1918–1989")).toBeInTheDocument();
  });

  it("draws a valid fill when the range has a single year", () => {
    setup({ min: 1950, max: 1950, value: [1950, 1950] });
    expect(screen.getByText("1950–1950")).toBeInTheDocument();
    const fill = document.querySelector<HTMLElement>("[aria-hidden='true'][style]");
    expect(fill?.style.left).toBe("0%");
    expect(fill?.style.right).toBe("0%");
  });
});
