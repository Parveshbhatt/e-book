export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  content: string[];
  totalPages: number;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  currentLine: number;
  category: string;
  lastReadAt: Date;
}