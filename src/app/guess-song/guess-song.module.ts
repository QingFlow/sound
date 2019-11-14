import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GuessSongRoutingModule } from './guess-song-routing.module';
import { AppGuessSongComponent } from './guess-song.component';
import { AppGuessSongHeaderComponent } from './guess-song-header/guess-song-header.component';
import { AppGuessSongListComponent } from './guess-song-list/guess-song-list.component';
import { AppSpecialSongComponent } from './guess-song-header/special-song/special-song.component';
import { AppGuessSongFooterComponent } from './guess-song-footer/guess-song-footer.component';
import { AppGuessSongDialogComponent } from './guess-song-dialog/guess-song-dialog.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SvgModule } from '../core/svg/svg.module';
import { NgDragDropModule } from 'ng-drag-drop';

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    SvgModule,
    GuessSongRoutingModule,
    NgDragDropModule
  ],
  declarations: [
    AppGuessSongComponent,
    AppGuessSongComponent,
    AppGuessSongHeaderComponent,
    AppGuessSongListComponent,
    AppSpecialSongComponent,
    AppGuessSongFooterComponent,
    AppGuessSongDialogComponent
  ],
  entryComponents: [
    AppGuessSongDialogComponent
  ],
})
export class GuessSongModule { }
