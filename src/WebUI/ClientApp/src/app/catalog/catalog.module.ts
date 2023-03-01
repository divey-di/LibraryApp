import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {FlexModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CatalogComponent } from './catalog.component';

@NgModule({
  imports: [
    HttpClientModule,
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
    CatalogComponent,
  ],
  exports: [
    CatalogComponent,
  ],
})
export class CatalogModule { }
