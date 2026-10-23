import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

const bones = (root: Element | null) => Array.from(root?.children ?? []) as HTMLElement[];

describe("Skeleton", () => {
  it("draws one decorative block by default", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveAttribute("data-shape", "block");
    expect(bones(skeleton)).toHaveLength(1);
  });

  it("sizes a block from width and height", () => {
    const { container } = render(<Skeleton width={320} height="12rem" />);
    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveStyle({ width: "320px" });
    expect(bones(skeleton)[0]).toHaveStyle({ height: "12rem" });
  });

  it("draws text lines with a shorter last one", () => {
    const { container } = render(<Skeleton shape="text" lines={3} height={14} />);
    const lines = bones(container.firstElementChild);
    expect(lines).toHaveLength(3);
    expect(lines[0]).toHaveStyle({ height: "14px" });
    expect(lines[0].style.width).toBe("");
    expect(lines[2]).toHaveStyle({ width: "60%" });
  });

  it("keeps at least one text line and ignores lines on other shapes", () => {
    const { container, rerender } = render(<Skeleton shape="text" lines={0} />);
    expect(bones(container.firstElementChild)).toHaveLength(1);
    expect(bones(container.firstElementChild)[0].style.width).toBe("");
    rerender(<Skeleton lines={4} />);
    expect(bones(container.firstElementChild)).toHaveLength(1);
  });

  it("draws a circle as tall as it is wide", () => {
    const { container } = render(<Skeleton shape="circle" width={56} height={10} />);
    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveAttribute("data-shape", "circle");
    expect(skeleton).toHaveStyle({ width: "56px" });
    expect(bones(skeleton)[0].style.height).toBe("");
  });

  it("merges a custom className and style and passes other props through", () => {
    const { container } = render(<Skeleton className="extra" style={{ marginTop: 8 }} data-testid="bone" />);
    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveClass("extra");
    expect(skeleton).toHaveStyle({ marginTop: "8px" });
    expect(skeleton).toHaveAttribute("data-testid", "bone");
  });
});
