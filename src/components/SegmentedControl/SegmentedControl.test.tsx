import { fireEvent, render, screen } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "1910", label: "1910" },
  { value: "1920", label: "1920" },
  { value: "1930", label: "1930" },
];

describe("SegmentedControl", () => {
  it("groups the options under the label and marks the current one", () => {
    render(<SegmentedControl label="Década" options={options} value="1920" onChange={() => {}} />);
    expect(screen.getByRole("group", { name: "Década" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "1920" })).toBeChecked();
  });

  it("reports the chosen value", () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="Década" options={options} value="1910" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "1930" }));
    expect(onChange).toHaveBeenCalledWith("1930");
  });

  it("keeps two controls on the same page independent", () => {
    render(
      <>
        <SegmentedControl label="A" options={options} value="1910" onChange={() => {}} />
        <SegmentedControl label="B" options={options} value="1930" onChange={() => {}} />
      </>,
    );
    expect(screen.getAllByRole("radio", { checked: true }).map((radio) => radio.getAttribute("value"))).toEqual([
      "1910",
      "1930",
    ]);
  });
});
