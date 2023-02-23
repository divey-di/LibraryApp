import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContentContainerModule } from './content-container/content-container.module';
import { InfoContainerModule } from './info-container/info-container.module';

import { HeroImageComponent } from './hero-image/hero-image.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    MatCardModule,
    MatIconModule,
    FlexModule,
    BrowserAnimationsModule,
    ContentContainerModule,
    InfoContainerModule,
  ],
  declarations: [
    HeroImageComponent,
    HomeComponent,
  ],
  exports: [
    HeroImageComponent,
    HomeComponent,
    ContentContainerModule,
    InfoContainerModule
  ],
})
export class HomeModule { }
