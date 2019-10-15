import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { AppGuessSongComponent } from './guess-song/guess-song.component';
import { AppSvgComponent } from './core/svg/svg.component';
import { AppHeaderComponent } from './header/header.component';
import { AppGuessSongHeaderComponent } from './guess-song/guess-song-header/guess-song-header.component';
import { AppGuessSongListComponent } from './guess-song/guess-song-list/guess-song-list.component';
import { AppGuessSongProgressComponent } from './guess-song/guess-song-progress/guess-song-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSvgComponent,
    AppGuessSongComponent,
    AppSidebarComponent,
    AppGuessSongHeaderComponent,
    AppGuessSongListComponent,
    AppGuessSongProgressComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
