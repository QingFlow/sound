import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toMinute } from 'src/app/core/common/common';
import { AppGuessSongService, SongStatus } from '../guess-song.service';

@Component({
  selector: 'app-guess-song-footer',
  templateUrl: './guess-song-footer.component.html',
  styleUrls: ['guess-song-footer.component.scss']
})
export class AppGuessSongFooterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private newWidth: number;
  private moving = false; // 正在拖拽

  public currentWidth = '0px'; // 歌曲已播进度条的宽度
  public bufferWidth = '0px'; // 已缓存的进度条宽度
  public currentTime: string = '00:00'; // 当前歌曲已播的时间
  public duration: string = '00:00'; // 歌曲总时间(用来显示)
  public durationNumber = 0; // 歌曲总时间(用来计算)
  public playing = false; // 歌曲的播放状态

  @ViewChild('totalBar', { static: false }) totalBar: ElementRef;


  public resize(newWidth: number): void {
    if (this.durationNumber === 0) {
      return;
    }
    this.moving = true;
    this.newWidth = newWidth;
    this.currentWidth = `${newWidth}px`;
  }

  public resizeEnd(): void {
    this.moving = false;
    if (this.durationNumber === 0) {
      return;
    }
    const totalWidth: number = this.totalBar.nativeElement.offsetWidth;
    const currentTime = (this.newWidth * this.durationNumber) / totalWidth;
    this.appGuessSongService.updatePlayingCurrentTime$.next(currentTime);
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
      if (this.moving) {
        return;
      }
      this.durationNumber = v.duration;
      this.currentTime = toMinute(v.currentTime);
      this.duration = toMinute(v.duration);
      // 计算当前进度
      const totalWidth = this.totalBar.nativeElement.offsetWidth;
      this.currentWidth = `${(v.currentTime * totalWidth) / v.duration}px`;
    });
    // 计算缓冲进度
    this.appGuessSongService.bufferChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      const totalWidth = this.totalBar.nativeElement.offsetWidth;
      this.bufferWidth = `${(v.bufferTime * totalWidth) / v.duration}px`;
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
