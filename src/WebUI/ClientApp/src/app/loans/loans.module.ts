import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {FlexModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoansComponent } from './loans.component';

@NgModule({
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    FlexModule,
    FormsModule,
    ModalModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  declarations: [
    LoansComponent,
  ],
  exports: [
    LoansComponent,
  ],
})
export class LoansModule { }
