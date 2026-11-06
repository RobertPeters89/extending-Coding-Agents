import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Clear search", () => {
  test("clears the search field and shows all books again", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("Search"), "dune");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(screen.getByLabelText("Search")).toHaveValue("");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  test("is disabled while the search field is empty", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Clear search" })).toBeDisabled();
  });
});
