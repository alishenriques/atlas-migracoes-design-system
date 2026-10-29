import { render, screen } from "@testing-library/react";
import { Portrait } from "./Portrait";

describe("Portrait", () => {
  it("shows the photo with its alt and caption", () => {
    render(<Portrait src="/foto.webp" label="Anatol Wladyslaw" caption="Foto: acervo da família" className="extra" />);
    expect(screen.getByRole("img", { name: "Anatol Wladyslaw" })).toHaveAttribute("src", "/foto.webp");
    expect(screen.getByText("Foto: acervo da família")).toBeInTheDocument();
    expect(screen.getByRole("figure")).toHaveClass("extra");
  });

  it("draws the empty frame while there is no photo", () => {
    render(<Portrait src={null} label="Ainda sem foto" />);
    expect(screen.getByRole("img", { name: "Ainda sem foto" }).tagName).toBe("svg");
    expect(screen.getByRole("figure")).toHaveAttribute("data-empty", "true");
  });
});
