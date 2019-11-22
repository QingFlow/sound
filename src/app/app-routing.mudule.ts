import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'guess-song',
    loadChildren: './pages/guess-song/guess-song.module#GuessSongModule'
  },
  {
    path: 'piano',
    loadChildren: './pages/piano/piano.module#PianoModule'
  },
  {
    path: '**', // 建议用 '' 来处理默认页，用 '**' 处理不存在的路由
    redirectTo: 'guess-song'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
