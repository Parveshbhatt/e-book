import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, ReadingProgress } from '../../models/book.model';
import { AuthService } from '../auth/auth.service';
import { books } from './data';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly MOCK_BOOKS: Book[] = books;


  constructor(private authService: AuthService) { }

  private verifyAuthentication(): boolean {
    if (!this.authService.isAuthenticated()) {
      // If user is not authenticated, log them out and throw an error
      this.authService.logout();
      throw new Error('Unauthorized access');
    }
    return true;
  }

  /**
   * Here in frontend dividing the book's content according to the total pages
   * in real world app the content come via pagination from backend
   */

  private splitContentIntoPages(content: string, pageIndex: number, totalPages: number): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = Array.from(doc.body.children);

    const totalElements = elements.length;
    const elementsPerPage = Math.ceil(totalElements / totalPages); // Divide content into book's total pages

    const startIndex = pageIndex * elementsPerPage;
    const endIndex = Math.min(startIndex + elementsPerPage, totalElements);

    const pageElements = elements.slice(startIndex, endIndex);
    return pageElements.map(element => element.outerHTML).join('');
  }

  getBooks(): Observable<Book[]> {
    return new Observable(observer => {
      try {
        this.verifyAuthentication();
        setTimeout(() => {
          observer.next(this.MOCK_BOOKS);
          observer.complete();
        }, 1000);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  getBook(id: string): Observable<Book> {
    return new Observable(observer => {
      try {
        this.verifyAuthentication();
        setTimeout(() => {
          const book = this.MOCK_BOOKS.find(b => b.id === id);
          if (book) {
            observer.next(book);
          } else {
            observer.error(new Error('Book not found'));
          }
          observer.complete();
        }, 500);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  getBookPage(id: string, pageIndex: number): Observable<string> {
    return new Observable(observer => {
      try {
        this.verifyAuthentication();
        const book = this.MOCK_BOOKS.find(b => b.id === id);
        if (!book) {
          observer.error(new Error('Book not found'));
          return;
        }

        setTimeout(() => {
          const pageContent = this.splitContentIntoPages(book.content, pageIndex, book.totalPages);
          observer.next(pageContent);
          observer.complete();
        }, 300);
      } catch (error) {
        observer.error(error);
      }
    });
  }

  saveProgress(progress: ReadingProgress): void {
    try {
      this.verifyAuthentication();
      const user = this.authService.getCurrentUser();
      const key = `book-progress-${user?.email}-${progress.bookId}`;
      localStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
      throw error;
    }
  }

  getProgress(bookId: string): ReadingProgress | null {
    try {
      this.verifyAuthentication();
      const user = this.authService.getCurrentUser();
      const key = `book-progress-${user?.email}-${bookId}`;
      const progress = localStorage.getItem(key);
      return progress ? JSON.parse(progress) : null;
    } catch (error) {
      console.error('Failed to get progress:', error);
      throw error;
    }
  }

  getCategoryProgress(category: string): number {
    try {
      this.verifyAuthentication();
      const books = this.MOCK_BOOKS.filter(book => book.category === category);
      let totalProgress = 0;
      let completedBooks = 0;

      books.forEach(book => {
        const progress = this.getProgress(book.id);
        if (progress) {
          totalProgress += (progress.currentPage / book.totalPages) * 100;
          completedBooks++;
        }
      });

      return completedBooks > 0 ? Math.round(totalProgress / completedBooks) : 0;
    } catch (error) {
      console.error('Failed to get category progress:', error);
      throw error;
    }
  }
}