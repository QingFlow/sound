import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPianoComponent } from './piano.component';

const routes: Routes = [
  {
    path: '',
    component: AppPianoComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PianoRoutingModule { }
