import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-guess-song-header',
  templateUrl: './guess-song-header.component.html',
  styleUrls: ['guess-song-header.component.scss']
})
export class AppGuessSongHeaderComponent {
  private audio = new Audio();

  public showSpecialSong = false;

  public getKey(): void {
    this.showSpecialSong = true;
    this.appService.specialSong$.next(true);
    this.audio.src = `../../../assets/musics/穿越时空的思念.mp3`;
    this.audio.loop = true;
    this.audio.play();
  }

  public close(): void {
    this.audio.pause();
    this.showSpecialSong = false;
    this.appService.specialSong$.next(false);
  }

  constructor(
    private appService: AppService
  ) { }
}
