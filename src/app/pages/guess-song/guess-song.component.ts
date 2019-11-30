import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGuessSongListComponent } from './guess-song-list/guess-song-list.component';

@Component({
  selector: 'app-guess-song',
  templateUrl: './guess-song.component.html'
})
export class AppGuessSongComponent implements OnInit {
  @ViewChild('songList', { static: false }) songList: AppGuessSongListComponent;

  ngOnInit(): void {
    // 阻止空格键引起页面下拉
    document.body.onkeydown = e => {
      if (e.key === ' ') {
        if (this.songList.guessing) {
          return true;
        }
        return false;
      }
    };
  }
}
