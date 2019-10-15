import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-guess-song-header',
  templateUrl: './guess-song-header.component.html',
  styleUrls: ['guess-song-header.component.scss']
})
export class AppGuessSongHeaderComponent implements OnInit {
  public mode = true; // true: 副歌模式, false: 完整模式

  public modeChange(): void {
    this.mode = !this.mode;
    this.appService.modeChange$.next(this.mode);
  }

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {

  }
}
