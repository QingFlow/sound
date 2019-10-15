import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  public playing = false; // 歌曲的播放状态

  public previous(): void {
    this.appService.previousSong$.next();
  }

  public pauseOrPlay(): void {
    this.appService.pauseOrPlay$.next(!this.playing);
  }

  public next(): void {
    this.appService.nextSong$.next();
  }

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    // const html = document.querySelector('html');
    // html.style.overflow = 'hidden';

    this.appService.pauseOrPlay$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.playing = v;
    });
  }
}
