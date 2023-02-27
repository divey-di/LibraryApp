import { Component, TemplateRef, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { BookDto, BooksClient, CreateBookCommand, UpdateBookCommand } from '../web-api-client';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  debug = false;
  books: BookDto[];
  selectedItem: BookDto;
  itemDetailsModalRef: BsModalRef;
  newItemModalRef: BsModalRef;
  deleteItemModalRef: BsModalRef;
  itemDetailsEditor: any = {};
  newItemEditor: any = {};
  isAuthenticated?: Observable<boolean>;
  page: PageEvent;

  constructor(
    private booksClient: BooksClient,
    private modalService: BsModalService,
    private authorizeService: AuthorizeService
  ) {}

  ngOnInit(): void {
    this.handlePageEvent({pageIndex: 0, pageSize: 10} as PageEvent)
    this.isAuthenticated = this.authorizeService.isAuthenticated();
  }

  handlePageEvent(e: PageEvent): void {
    this.page = e;

    this.booksClient.getBooksWithPagination(0, e.pageIndex+1, e.pageSize).subscribe(
      {
        next: (v) => {
          this.books = v.items;
          this.page.length = v.totalCount;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

  // Items
  showItemDetailsModal(template: TemplateRef<any>, item: BookDto): void {
    this.selectedItem = item;
    this.itemDetailsEditor = {
      ...this.selectedItem
    };

    this.itemDetailsModalRef = this.modalService.show(template);
  }

  showNewItemModal(template: TemplateRef<any>): void {
    this.newItemModalRef = this.modalService.show(template);
    setTimeout(() => document.getElementById('title').focus(), 250);
  }

  newItemCancelled(): void {
    this.newItemModalRef.hide();
    this.newItemEditor = {};
  }

  addItem(): void {
    const book = {
      title: this.newItemEditor.title,
      author: this.newItemEditor.author,
      isbn: this.newItemEditor.isbn,
      genre: this.newItemEditor.genre,
      publisher: this.newItemEditor.publisher,
      publishDate: this.newItemEditor.publishDate,
      coverArtUri: this.newItemEditor.coverArtUri,
      synopsis: this.newItemEditor.synopsis,
    } as BookDto;

    this.booksClient.create(book as CreateBookCommand).subscribe(
      result => {
        book.id = result;
        this.books.push(book);
        this.newItemModalRef.hide();
        this.newItemEditor = {};
      },
      error => {
        const errors = JSON.parse(error.response);

        if (errors && errors.Title) {
          this.newItemEditor.error = errors.Title[0];
        }

        setTimeout(() => document.getElementById('title').focus(), 250);
      }
    );
  }

  updateItem() {
    const book = this.itemDetailsEditor as UpdateBookCommand;
    this.booksClient.update(this.selectedItem.id, book).subscribe({
      next: () => {
        (this.selectedItem.title = this.itemDetailsEditor.title),
          this.itemDetailsModalRef.hide();
        this.itemDetailsEditor = {};
        location.reload();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  confirmDeleteItem(template: TemplateRef<any>) {
    this.itemDetailsModalRef.hide();
    this.deleteItemModalRef = this.modalService.show(template);
  }

  deleteListConfirmed(): void {
    this.booksClient.delete(this.selectedItem.id).subscribe(
      () => {
        this.deleteItemModalRef.hide();
        this.books = this.books.filter(t => t.id !== this.selectedItem.id);
        this.selectedItem = this.books.length ? this.books[0] : null;
      },
      error => console.error(error)
    );
  }
}
