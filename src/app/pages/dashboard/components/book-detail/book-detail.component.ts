import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BookService } from '../../../../services/book/book.service';
import { Book, ContentElement, ReadingProgress } from '../../../../models/book.model';
import { DatePipe, NgClass } from '@angular/common';
import { SkeletonLoaderComponent } from "../../../shared/skeleton-loader/skeleton-loader.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-book-detail',
  imports: [DatePipe, SkeletonLoaderComponent, NgClass],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  // Get the reference to the content container fot the book
  @ViewChild('contentContainer') contentContainer!: ElementRef;

  private destroy$ = new Subject<void>();

  book: Book = {
    id: '',
    title: '',
    author: '',
    category: '',
    price: 0,
    content: '',
    totalPages: 0
  };
  currentPage = 0;
  currentLine = 0;
  totalLines = 0;
  isLoadingBook = true;
  isLoadingPage = false;
  sanitizedContent!: SafeHtml;

  contentElements: ContentElement[] = [];
  overallProgress = 0;
  categoryProgress = 0;
  lastReadTime: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.bookService.getBook(bookId).pipe(
        tap(book => {
          if (!book) {
            this.router.navigate(['/dashboard/home']);
            return;
          }
          this.book = book;
          const progress = this.bookService.getProgress(book.id);

          if (progress) {
            this.currentPage = progress.currentPage;
            this.currentLine = progress.currentLine;
          }

          this.updateComputedValues();
          this.loadPage();
        }),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPage(): void {
    this.isLoadingPage = true;
    this.bookService.getBookPage(this.book.id, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pageContent) => {
          this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(pageContent);
          requestAnimationFrame(() => {
            this.initializeContentElements();
            this.isLoadingBook = false;
            this.isLoadingPage = false;
          });
        },
        error: (error) => {
          console.error('Error loading page:', error);
          this.isLoadingPage = false;
        }
      });
  }

  initializeContentElements(): void {
    if (!this.contentContainer) return;

    const container = this.contentContainer.nativeElement;
    const elements = container.querySelectorAll('h1, h2, h3, p, pre');

    this.contentElements = Array.from(elements as NodeListOf<HTMLElement>).map((element: HTMLElement, index) => ({
      element,
      index
    }));

    this.totalLines = this.contentElements.length;

    this.contentElements.forEach(({ element }) => {
      const clone = element.cloneNode(true) as HTMLElement;
      element.parentNode?.replaceChild(clone, element);
    });

    this.contentElements = this.contentElements.map(({ element }, index) => {
      const clone = container.querySelectorAll('h1, h2, h3, p, pre')[index] as HTMLElement;
      clone.style.cursor = 'pointer';
      clone.style.padding = '0.5rem 1rem';
      clone.style.borderRadius = '0.375rem';
      clone.style.transition = 'background-color 200ms';

      clone.addEventListener('click', () => this.setCurrentLine(index));

      return {
        element: clone,
        index
      };
    });

    this.currentLine = Math.min(this.currentLine, this.totalLines - 1);
    this.highlightCurrentLine();
  }

  highlightCurrentLine(): void {
    if (!this.contentElements.length) return;

    this.contentElements.forEach(({ element }, index) => {
      if (index === this.currentLine) {
        element.style.backgroundColor = '#fef9c3';
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        element.style.backgroundColor = 'transparent';
      }
    });
  }

  setCurrentLine(lineIndex: number): void {
    if (lineIndex === this.currentLine || lineIndex >= this.totalLines) return;

    this.currentLine = lineIndex;
    this.highlightCurrentLine();
    this.saveProgress();
  }

  saveProgress(): void {
    if (!this.book?.id) return;

    const progress: ReadingProgress = {
      bookId: this.book.id,
      currentPage: this.currentPage,
      currentLine: this.currentLine,
      category: this.book.category,
      lastReadAt: new Date()
    };
    this.bookService.saveProgress(progress);
    this.updateComputedValues();
  }

  nextPage(): void {
    if (this.currentPage >= this.book.totalPages - 1) return;

    this.currentPage++;
    this.currentLine = 0;
    this.loadPage();
    this.saveProgress();
    this.highlightCurrentLine();
  }

  previousPage(): void {
    if (this.currentPage <= 0) return;

    this.currentPage--;
    this.currentLine = 0;
    this.loadPage();
    this.saveProgress();
    this.highlightCurrentLine();
  }

  updateComputedValues(): void {
    this.overallProgress = this.getProgressPercentage(this.currentPage, this.book.totalPages);
    this.categoryProgress = this.bookService.getCategoryProgress(this.book.category);
    this.lastReadTime = this.bookService.getProgress(this.book.id)?.lastReadAt || null;
  }

  getProgressPercentage(current: number, total: number): number {
    if (!total) return 0;
    return Math.min(Math.round((current / (total - 1)) * 100), 100);
  }
}
