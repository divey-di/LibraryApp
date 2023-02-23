import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimaryContentAreaComponent } from './primary-area/primary-content-area.component';
import { SecondaryContentAreaComponent } from './secondary-area/secondary-content-area.component';

import { ContentContainerComponent } from './content-container.component';

@NgModule({
  imports: [
    MatCardModule,
    FlexModule,
    BrowserAnimationsModule
  ],
  declarations: [
    PrimaryContentAreaComponent,
    SecondaryContentAreaComponent,
    ContentContainerComponent
  ],
  exports: [
    PrimaryContentAreaComponent,
    SecondaryContentAreaComponent,
    ContentContainerComponent
  ],
})
export class ContentContainerModule { }
