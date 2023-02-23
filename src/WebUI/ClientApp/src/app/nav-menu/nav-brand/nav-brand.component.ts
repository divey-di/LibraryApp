import { Component } from '@angular/core';

@Component({
  selector: 'nav-brand',
  templateUrl: './nav-brand.component.html',
  styleUrls: ['../nav-menu.component.scss']
})
export class NavBrandComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
