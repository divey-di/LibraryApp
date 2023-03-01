import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from '../api-authorization/authorize.guard';
import { HomeComponent } from './home/home.component';
import { TokenComponent } from './token/token.component';
import { CatalogComponent } from './catalog/catalog.component';
import { LoansComponent } from './loans/loans.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthorizeGuard]},
  { path: 'loans', component: LoansComponent, canActivate: [AuthorizeGuard], data: { roles: ["Librarian"] }},
  { path: 'token', component: TokenComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
