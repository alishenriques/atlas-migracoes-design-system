import { render, screen } from "@testing-library/react";
import { Legend } from "./Legend";

describe("Legend", () => {
  it("lists each kind with its label and optional count", () => {
    render(
      <Legend
        label="Legenda"
        items={[
          { tone: "artist", label: "Artistas", count: 31 },
          { tone: "place", label: "Lugares" },
        ]}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(screen.getByRole("list", { name: "Legenda" })).toBeInTheDocument();
    expect(items.map((item) => item.textContent)).toEqual(["Artistas31", "Lugares"]);
    expect(items[0]).toHaveAttribute("data-tone", "artist");
  });
});
