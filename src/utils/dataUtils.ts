import { Book } from '../types/Book';

interface BookData {
  items?: Book[];
  totalItems?: number;
  // Другие возможные поля
}

export const processBookData = (data: BookData): { uniqueBooks: Book[], totalItems: number } => {
  const ids = new Set<string>();
  const uniqueBooks: Book[] = [];

  if (data.items) {
    data.items.forEach((book: Book) => {
      if (!ids.has(book.id)) {
        ids.add(book.id);
        uniqueBooks.push(book);
      }
    });
  }

  return {
    uniqueBooks,
    totalItems: data.totalItems || 0,
  };
};
