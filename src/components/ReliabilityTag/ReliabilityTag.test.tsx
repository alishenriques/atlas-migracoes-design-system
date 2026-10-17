import { render, screen } from "@testing-library/react";
import { ReliabilityTag } from "./ReliabilityTag";

describe("ReliabilityTag", () => {
  it("renders the label and exposes the level", () => {
    render(<ReliabilityTag level="inferred" label="Inferido" />);
    expect(screen.getByText("Inferido")).toHaveAttribute("data-level", "inferred");
  });
});
