export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  content: string; // Html content
  totalPages: number;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  currentLine: number;
  category: string;
  lastReadAt: Date;
}

export interface ContentElement {
  element: HTMLElement;
  index: number;
}