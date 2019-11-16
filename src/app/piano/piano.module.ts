import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppPianoComponent } from './piano.component';
import { PianoRoutingModule } from './piano-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PianoRoutingModule
  ],
  declarations: [
    AppPianoComponent
  ],
})
export class PianoModule { }
