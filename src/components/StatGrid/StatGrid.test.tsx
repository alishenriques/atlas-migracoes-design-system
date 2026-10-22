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

  it("pairs each label (dt) with its value (dd) directly under the list", () => {
    const { container } = render(<StatGrid stats={[{ value: "31", label: "artistas" }]} />);
    const pair = container.querySelector("dl > div");
    expect([...(pair?.children ?? [])].map((child) => [child.tagName, child.textContent])).toEqual([
      ["DT", "artistas"],
      ["DD", "31"],
    ]);
  });

  it("hides the icon from assistive technology", () => {
    render(<StatGrid stats={[{ value: "34", label: "países", icon: <svg data-testid="icon" /> }]} />);
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("34").tagName).toBe("DD");
  });

  it("makes room for the icon only on the stats that have one", () => {
    const { container } = render(
      <StatGrid
        stats={[
          { value: "34", label: "países", icon: <svg /> },
          { value: "31", label: "artistas" },
        ]}
      />,
    );
    const [withIcon, plain] = [...container.querySelectorAll("dl > div")];
    expect(withIcon?.className).toMatch(/withIcon/);
    expect(plain?.className).not.toMatch(/withIcon/);
  });
});
