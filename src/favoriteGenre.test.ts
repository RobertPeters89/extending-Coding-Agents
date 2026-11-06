import { describe, expect, test } from "vitest";
import { favoriteGenre } from "./books";
import { initialBooks } from "./data";
import type { Book, Genre } from "./types";

function book(id: string, genre: Genre, isRead: boolean): Book {
  return { id, title: id, author: "A", genre, rating: 0, isRead };
}

describe("favoriteGenre", () => {
  test("returns the genre with the most read books", () => {
    const books = [
      book("1", "mystery", true),
      book("2", "sci-fi", true),
      book("3", "sci-fi", true),
      book("4", "fantasy", true),
    ];
    expect(favoriteGenre(books)).toBe("sci-fi");
  });

  test("counts only read books", () => {
    const books = [
      book("1", "fantasy", true),
      book("2", "sci-fi", false),
      book("3", "sci-fi", false),
    ];
    expect(favoriteGenre(books)).toBe("fantasy");
  });

  test("picks the alphabetically first genre on a tie", () => {
    const books = [
      book("1", "sci-fi", true),
      book("2", "mystery", true),
      book("3", "non-fiction", true),
    ];
    expect(favoriteGenre(books)).toBe("mystery");
  });

  test("picks the alphabetically first genre on a tie, in any order", () => {
    const books = [book("1", "sci-fi", true), book("2", "fantasy", true)];
    expect(favoriteGenre(books)).toBe("fantasy");
    expect(favoriteGenre([...books].reverse())).toBe("fantasy");
  });

  test("returns null when no book is read", () => {
    expect(favoriteGenre([book("1", "fantasy", false)])).toBeNull();
  });

  test("returns null for an empty list", () => {
    expect(favoriteGenre([])).toBeNull();
  });

  test("uses fantasy for the sample books (tie between fantasy and sci-fi)", () => {
    expect(favoriteGenre(initialBooks)).toBe("fantasy");
  });

  test("does not change the original list", () => {
    const books = structuredClone(initialBooks);
    favoriteGenre(books);
    expect(books).toEqual(initialBooks);
  });
});
