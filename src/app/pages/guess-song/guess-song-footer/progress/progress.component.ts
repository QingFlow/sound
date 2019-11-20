import { Component, OnDestroy, ElementRef, HostListener, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppGuessSongService } from '../../guess-song.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class AppProgressComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  private durationNumber = 0; // 歌曲总时间(用来计算)
  private newWidth: number;

  public currentWidth = '0px'; // 歌曲已播进度条的宽度
  public bufferWidth = '0px'; // 已缓存的进度条宽度

  @ViewChild('totalBar', { static: false }) totalBar: ElementRef;

  get totalBarWidth(): number {
    return this.totalBar.nativeElement.offsetWidth;
  }

  public resize(newWidth: number): void {
    console.log(newWidth, `newWidth`);
    if (this.durationNumber === 0) {
      return;
    }
    this.appGuessSongService.setProgressMoving(true);
    this.newWidth = newWidth;
    this.currentWidth = `${newWidth}px`;
    console.log(this.currentWidth, `this.currentWidth`);
  }

  public resizeEnd(): void {
    this.appGuessSongService.setProgressMoving(false);
    if (this.durationNumber === 0 || !this.newWidth) {
      return;
    }
    const currentTime = (this.newWidth * this.durationNumber) / this.totalBarWidth;
    this.appGuessSongService.updatePlayingCurrentTime$.next(currentTime);
  }

  constructor(
    private appGuessSongService: AppGuessSongService
  ) { }

  ngOnInit(): void {
    // 计算当前进度
    this.appGuessSongService.progressChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.durationNumber = v.duration;
      this.currentWidth = `${(v.currentTime * this.totalBarWidth) / v.duration}px`;
    });
    // 计算缓冲进度
    this.appGuessSongService.bufferChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.bufferWidth = `${(v.bufferTime * this.totalBarWidth) / v.duration}px`;
    });
    // 重置进度条
    this.appGuessSongService.resetProgress$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.currentWidth = '0px';
      this.bufferWidth = '0px';
    });
  }
}
