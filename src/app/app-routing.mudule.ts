import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'piano',
    loadChildren: './piano/piano.module#PianoModule'
  },
  {
    path: '**',
    loadChildren: './guess-song/guess-song.module#GuessSongModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
