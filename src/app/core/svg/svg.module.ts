import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSvgComponent } from './svg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppSvgComponent
  ],
  exports: [
    AppSvgComponent
  ]
})
export class SvgModule { }
