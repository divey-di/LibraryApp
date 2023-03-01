import { Component } from '@angular/core';
import {
  AuthorizeService,
  IUser,
} from 'src/api-authorization/authorize.service';

@Component({
  selector: 'nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['../nav-menu.component.scss'],
})
export class NavItemsComponent {
  user: IUser;

  constructor(private authorizeService: AuthorizeService) {
    authorizeService.user.subscribe(x => this.user = x);
  }
}
