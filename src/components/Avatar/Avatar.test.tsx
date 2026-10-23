import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("draws the no-photo placeholder, decorative and 56px by default", () => {
    const { container } = render(<Avatar />);
    const avatar = container.firstElementChild;
    expect(avatar).toHaveAttribute("data-empty", "true");
    expect(avatar).toHaveAttribute("aria-hidden", "true");
    expect(avatar).toHaveStyle({ width: "56px", height: "56px" });
    expect(avatar?.querySelector("svg path")).toBeInTheDocument();
    expect(avatar?.querySelector("svg circle")).toBeInTheDocument();
    expect(avatar?.querySelector("img")).not.toBeInTheDocument();
  });

  it("names the placeholder when given a label", () => {
    render(<Avatar label="Sem foto" />);
    expect(screen.getByRole("img", { name: "Sem foto" })).toHaveAttribute("data-empty", "true");
  });

  it("shows the photo with its label as alt", () => {
    const { container } = render(<Avatar src="/fayga.jpg" label="Fayga Ostrower" size={72} className="extra" />);
    const avatar = container.firstElementChild;
    expect(screen.getByRole("img", { name: "Fayga Ostrower" })).toHaveAttribute("src", "/fayga.jpg");
    expect(avatar).not.toHaveAttribute("data-empty");
    expect(avatar).not.toHaveAttribute("aria-hidden");
    expect(avatar).toHaveStyle({ width: "72px" });
    expect(avatar).toHaveClass("extra");
    expect(avatar?.querySelector("svg")).not.toBeInTheDocument();
  });

  it("treats a photo without label as decorative", () => {
    const { container } = render(<Avatar src="/x.jpg" />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});
