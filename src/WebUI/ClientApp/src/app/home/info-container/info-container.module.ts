import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnnouncementAreaComponent } from './announcement-area/announcement-area.component';
import { EventAreaComponent } from './event-area/event-area.component';
import { RecommendedAreaComponent } from './recommended-area/recommended-area.component';

import { InfoContainerComponent } from './info-container.component';

@NgModule({
  imports: [
    MatCardModule,
    FlexModule,
    BrowserAnimationsModule
  ],
  declarations: [
    InfoContainerComponent,
    AnnouncementAreaComponent,
    EventAreaComponent,
    RecommendedAreaComponent,
  ],
  exports: [
    InfoContainerComponent,
    AnnouncementAreaComponent,
    EventAreaComponent,
    RecommendedAreaComponent,
  ],
})
export class InfoContainerModule { }
