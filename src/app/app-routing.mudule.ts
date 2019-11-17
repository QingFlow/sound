import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'guess-song',
    loadChildren: './guess-song/guess-song.module#GuessSongModule'
  },
  {
    path: 'piano',
    loadChildren: './piano/piano.module#PianoModule'
  },
  {
    path: '**',
    redirectTo: 'guess-song'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
