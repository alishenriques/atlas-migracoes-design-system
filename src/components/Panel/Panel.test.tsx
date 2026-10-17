import { render, screen } from "@testing-library/react";
import { Panel } from "./Panel";

describe("Panel", () => {
  it("renders its children", () => {
    render(<Panel>Conteúdo</Panel>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("names the region after its title", () => {
    render(<Panel title="Filtros">Período</Panel>);
    expect(screen.getByRole("region", { name: "Filtros" })).toBeInTheDocument();
  });

  it("renders the header action", () => {
    render(
      <Panel title="Filtros" action={<button type="button">Limpar</button>}>
        Período
      </Panel>,
    );
    expect(screen.getByRole("button", { name: "Limpar" })).toBeInTheDocument();
  });
});
