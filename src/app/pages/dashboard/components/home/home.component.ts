import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book/book.service';
import { Book, ReadingProgress } from '../../../../models/book.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SkeletonLoaderComponent } from "../../../shared/skeleton-loader/skeleton-loader.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe, SkeletonLoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  progressMap: Map<string, ReadingProgress> = new Map();
  isLoadingBooks = true;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loadProgress();

        // Dismiss the loading placeholder
        this.isLoadingBooks = false;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.isLoadingBooks = false;
      }
    });
  }

  private loadProgress(): void {
    this.progressMap.clear();
    this.books.forEach(book => {
      const progress = this.bookService.getProgress(book.id);
      if (progress) {
        this.progressMap.set(book.id, progress);
      }
    });
  }

  getProgressPercentage(bookId: string, totalPages: number): number {
    const progress = this.progressMap.get(bookId);
    if (!progress || totalPages === 0) return 0;
    return Math.round((progress.currentPage / totalPages) * 100);
  }

  getLastReadDate(bookId: string): Date | null {
    const progress = this.progressMap.get(bookId);
    return progress?.lastReadAt || null;
  }

}
