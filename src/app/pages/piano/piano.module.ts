import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule, NzRadioModule, NzSpinModule } from 'ng-zorro-antd';
import { AppPianoComponent } from './piano.component';
import { PianoRoutingModule } from './piano-routing.module';
import { AppPianoScoreBoardComponent } from './piano-score-board/piano-score-board.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PianoRoutingModule,
    NzRadioModule,
    NzSpinModule,
    NzButtonModule
  ],
  declarations: [
    AppPianoComponent,
    AppPianoScoreBoardComponent
  ],
})
export class PianoModule { }
