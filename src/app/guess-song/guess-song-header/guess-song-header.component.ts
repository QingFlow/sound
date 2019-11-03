import { Component } from '@angular/core';

@Component({
  selector: 'app-guess-song-header',
  templateUrl: './guess-song-header.component.html',
  styleUrls: ['guess-song-header.component.scss']
})
export class AppGuessSongHeaderComponent {
  public showSpecialSong = false;
  public showKeys = false;

  public guessRight(): void {
    this.showKeys = true;
  }

  public closeHandler(): void {
    this.showSpecialSong = false;
    // const audio = new Audio();
    // audio.src = '../../../assets/musics/missing-end.mp3';
    // audio.play();
  }
}
