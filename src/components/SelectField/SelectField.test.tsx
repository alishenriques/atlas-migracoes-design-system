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
