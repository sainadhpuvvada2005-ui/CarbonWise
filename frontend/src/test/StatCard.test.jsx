import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import StatCard from "../components/StatCard.jsx";

describe("StatCard", () => {
  it("renders stat content", () => {
    render(<StatCard title="Green points" value="420" label="Eco Builder" />);
    expect(screen.getByText("Green points")).toBeInTheDocument();
    expect(screen.getByText("420")).toBeInTheDocument();
    expect(screen.getByText("Eco Builder")).toBeInTheDocument();
  });
});
