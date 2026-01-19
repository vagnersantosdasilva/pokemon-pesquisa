import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PAGINATION_CONFIG } from '../../constants/pagination.constants';

@Component({
  selector: 'app-paginate-control',
  standalone: true,
  imports: [],
  templateUrl: './paginate-control.component.html',
  styleUrl: './paginate-control.component.css'
})
export class PaginateControlComponent {

  @Input() count :number = 0;
  @Input() limit :number = PAGINATION_CONFIG.DEFAULT_LIMIT;

  @Input() isSearching : boolean = false;
  @Input() previous : boolean = false;
  @Input() next : boolean = false;
  @Input() currentPage : number = 1;
  @Output() newOffset =  new EventEmitter<number>();

  @Output() nextPageEmitter = new EventEmitter<void>();
  @Output() previousPageEmitter = new EventEmitter<void>();

  getTotalPage(): number{
    return Math.ceil(this.count / this.limit);
  }

  nextPage(): void {
    this.nextPageEmitter.emit();
  }

  previousPage(): void {
    this.previousPageEmitter.emit();
  }
}
