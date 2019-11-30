import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toMinute } from 'src/app/core/common/utils';
import { AppGuessSongService, SongStatus } from '../guess-song.service';

@Component({
  selector: 'app-guess-song-footer',
  templateUrl: './guess-song-footer.component.html',
  styleUrls: ['guess-song-footer.component.scss']
})
export class AppGuessSongFooterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public currentTime: string = '00:00'; // 当前歌曲已播的时间
  public duration: string = '00:00'; // 歌曲总时间(用来显示)
  public playing = false; // 歌曲的播放状态

  public currentTimeChangeHandler(currentTime: string): void {
    this.currentTime = currentTime;
  }

  public action(action: 'previous' | 'pauseOrPlay' | 'next'): void {
    switch (action) {
      case 'previous':
        this.appGuessSongService.playingStatus$.next(SongStatus.privious);
        break;
      case 'pauseOrPlay':
        this.appGuessSongService.playingStatus$.next(this.playing ? SongStatus.pause : SongStatus.play);
        break;
      case 'next':
        this.appGuessSongService.playingStatus$.next(SongStatus.next);
        break;
    }
  }

  constructor(
    public appGuessSongService: AppGuessSongService
  ) { }

  ngOnInit(): void {
    this.appGuessSongService.progressChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      if (this.appGuessSongService.progressMoving) {
        return;
      }
      this.currentTime = toMinute(v.currentTime);
      this.duration = toMinute(v.duration);
    });
    this.appGuessSongService.playingStatus$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      switch (v) {
        case SongStatus.pause:
          this.playing = false;
          break;
        case SongStatus.play:
          this.playing = true;
          break;
      }
    });
    this.appGuessSongService.resetProgress$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => this.currentTime = '00:00');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
