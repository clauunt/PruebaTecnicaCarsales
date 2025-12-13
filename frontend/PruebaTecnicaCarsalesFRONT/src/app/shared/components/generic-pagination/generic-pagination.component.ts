import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-pagination.component.html',
  styleUrls: ['./generic-pagination.component.scss']
})
export class GenericPaginationComponent {
  @Input() page?: number;
  @Input() currentPage = 1;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  onNext() {
    if (!this.page || this.currentPage < this.page) {
      this.next.emit();
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onPrev() {
    if (this.currentPage > 1) {
      this.prev.emit();
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goTo(page: number) {
    if (page === this.currentPage) return;
    if (page < 1) page = 1;
    if (this.page && page > this.page) page = this.page;
    this.pageChange.emit(page);
  }

  get pagesList(): number[] {
    const total = this.page ?? this.currentPage;
    const maxButtons = 7;
    const pages: number[] = [];

    let start = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;

    if (end > total) {
      end = total;
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}
