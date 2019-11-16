import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppPianoComponent } from './piano.component';
import { PianoRoutingModule } from './piano-routing.module';
import { AppPianoScoreBoardComponent } from './piano-score-board/piano-score-board.component';

@NgModule({
  imports: [
    CommonModule,
    PianoRoutingModule
  ],
  declarations: [
    AppPianoComponent,
    AppPianoScoreBoardComponent
  ],
})
export class PianoModule { }
