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
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppGuessSongDialogComponent } from './guess-song/guess-song-dialog/guess-song-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    OverlayModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSvgComponent,
    AppGuessSongComponent,
    AppSidebarComponent,
    AppGuessSongHeaderComponent,
    AppGuessSongListComponent,
    AppGuessSongProgressComponent,
    AppGuessSongDialogComponent
  ],
  entryComponents: [
    AppGuessSongDialogComponent
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
