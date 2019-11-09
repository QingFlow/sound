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
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppGuessSongDialogComponent } from './guess-song/guess-song-dialog/guess-song-dialog.component';
import { AppSpecialSongComponent } from './guess-song/guess-song-header/special-song/special-song.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppGuessSongFooterComponent } from './guess-song/guess-song-footer/guess-song-footer.component';

@NgModule({
  imports: [
    BrowserModule,
    OverlayModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    NgDragDropModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSvgComponent,
    AppGuessSongComponent,
    AppSidebarComponent,
    AppGuessSongHeaderComponent,
    AppGuessSongListComponent,
    AppSpecialSongComponent,
    AppGuessSongFooterComponent,
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
