import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

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
}
