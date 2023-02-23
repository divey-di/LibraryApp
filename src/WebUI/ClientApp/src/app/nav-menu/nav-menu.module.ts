import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CatalogSearchComponent } from './catalog-search/catalog-search.component';
import { NavBrandComponent } from './nav-brand/nav-brand.component';
import { NavItemsComponent } from './nav-items/nav-items.component';
import { NavMenuComponent } from './nav-menu.component';

@NgModule({
  imports: [
    AppRoutingModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule
  ],
  declarations: [
    CatalogSearchComponent,
    NavBrandComponent,
    NavItemsComponent,
    NavMenuComponent,
  ],
  exports: [
    CatalogSearchComponent,
    NavBrandComponent,
    NavItemsComponent,
    NavMenuComponent,
  ],
})
export class NavMenuModule { }
