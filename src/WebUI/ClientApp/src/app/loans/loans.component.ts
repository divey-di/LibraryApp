import { Component, TemplateRef, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { LoanDto, LoansClient, CreateLoanCommand } from '../web-api-client';

@Component({
  selector: 'app-loans-component',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
})
export class LoansComponent implements OnInit {
  debug = false;
  loans: LoanDto[];
  selectedItem: LoanDto;
  isAuthenticated?: Observable<boolean>;
  page: PageEvent;

  constructor(
    private loansClient: LoansClient,
    private modalService: BsModalService,
    private authorizeService: AuthorizeService
  ) {}

  ngOnInit(): void {
    this.handlePageEvent({ pageIndex: 0, pageSize: 10 } as PageEvent);
    this.isAuthenticated = this.authorizeService.isAuthenticated();
  }

  handlePageEvent(e: PageEvent): void {
    this.page = e;

    this.loansClient
      .getLoansWithPagination(0, '', e.pageIndex + 1, e.pageSize)
      .subscribe({
        next: (v) => {
          this.loans = v.items;
          this.page.length = v.totalCount;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  deleteItem(id: number): void {
    this.loansClient.delete(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => console.error(error),
    });
  }
}
