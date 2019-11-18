import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuessSongComponent } from './guess-song.component';

const routes: Routes = [
  {
    path: '',
    component: AppGuessSongComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuessSongRoutingModule { }
