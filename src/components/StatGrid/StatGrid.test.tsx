import { render, screen } from "@testing-library/react";
import { StatGrid } from "./StatGrid";

describe("StatGrid", () => {
  it("renders each stat's value and label", () => {
    render(
      <StatGrid
        stats={[
          { value: "31", label: "artistas" },
          { value: "417", label: "obras" },
        ]}
      />,
    );

    expect(screen.getByText("31")).toBeInTheDocument();
    expect(screen.getByText("artistas")).toBeInTheDocument();
    expect(screen.getByText("417")).toBeInTheDocument();
  });

  it("hides the icon from assistive technology", () => {
    render(<StatGrid stats={[{ value: "34", label: "países", icon: <svg data-testid="icon" /> }]} />);
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });
});
