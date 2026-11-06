import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { initialBooks } from "./data";

describe("Clear search behavior", () => {
  test("moves the focus back to the search field", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("Search"), "dune");

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(screen.getByLabelText("Search")).toHaveFocus();
  });

  test("keeps the selected genre", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText("Genre"), "sci-fi");
    await user.type(screen.getByLabelText("Search"), "dune");

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(screen.getByLabelText("Genre")).toHaveValue("sci-fi");
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual(["Dune", "Neuromancer"]);
  });

  test("shows all books again after clearing", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("Search"), "zzz");
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      initialBooks.length
    );
  });
});
