import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-guess-song-footer',
  templateUrl: './guess-song-footer.component.html',
  styleUrls: ['guess-song-footer.component.scss']
})
export class AppGuessSongFooterComponent implements OnInit, OnDestroy {
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
    this.appService.pauseOrPlay$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => this.playing = v);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
