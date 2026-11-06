import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Stats from "./components/Stats";
import { initialBooks } from "./data";

describe("Stats", () => {
  test("shows the favorite genre", () => {
    render(<Stats books={initialBooks} />);
    expect(screen.getByText(/Favorite genre/)).toHaveTextContent(
      "Favorite genre: fantasy"
    );
  });

  test("shows a dash when no book is read", () => {
    const unread = initialBooks.map((book) => ({ ...book, isRead: false }));
    render(<Stats books={unread} />);
    expect(screen.getByText(/Favorite genre/)).toHaveTextContent(
      "Favorite genre: –"
    );
  });
});
