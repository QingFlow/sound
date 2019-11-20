import { Component, OnDestroy, ElementRef, HostListener, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppGuessSongService } from '../../guess-song.service';
import { toMinute } from 'src/app/core/common/common';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class AppProgressComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private duration = 0; // 歌曲总时间(用来计算)
  private newWidth: number;

  public currentWidth = 0; // 歌曲已播进度条的宽度
  public bufferWidth = 0; // 已缓存的进度条宽度

  @Output() currentTimeChange: EventEmitter<string> = new EventEmitter<string>();  // 拖动进度条时通知父组件更改当前时间

  @ViewChild('totalBar', { static: false }) totalBar: ElementRef;
  @ViewChild('currentBar', { static: false }) currentBar: ElementRef;

  get totalBarWidth(): number {
    return this.totalBar.nativeElement.offsetWidth;
  }

  get currentBarWidth(): number {
    return this.currentBar.nativeElement.offsetWidth;
  }

  public resize(newWidth: number): void {
    if (this.duration === 0) {
      return;
    }
    this.appGuessSongService.setProgressMoving(true);
    this.newWidth = newWidth;
    this.currentWidth = newWidth;
    const currentTime = toMinute((this.duration * this.newWidth) / this.totalBarWidth);
    this.currentTimeChange.next(currentTime);
  }

  public resizeEnd(): void {
    this.appGuessSongService.setProgressMoving(false);
    if (this.duration === 0 || !this.newWidth) {
      return;
    }
    this.updatePlayingCurrentTime(this.newWidth);
  }

  @HostListener('click', ['$event'])
  onMousedown(event: MouseEvent): void {
    if (this.duration === 0) {
      return;
    }
    event.preventDefault();
    // 新的播放宽度 = 原先的宽度 + 鼠标点下的X坐标 - (已播区块的宽度 + 已播区块距离左边距的距离)
    const clientX = event.clientX;
    const leftDistance = this.currentBar.nativeElement.getBoundingClientRect().left;
    const addCurrentWidth = clientX - (this.currentBarWidth + leftDistance);
    this.currentWidth += addCurrentWidth;
    this.updatePlayingCurrentTime(this.currentWidth);
  }

  /** 将需要跳转的目标进度条转化为播放时间进度并执行 */
  private updatePlayingCurrentTime(targetWidth: number): void {
    const currentTime = (targetWidth * this.duration) / this.totalBarWidth;
    this.appGuessSongService.updatePlayingCurrentTime$.next(currentTime);
  }

  constructor(
    private appGuessSongService: AppGuessSongService
  ) { }

  ngOnInit(): void {
    // 计算当前进度
    this.appGuessSongService.progressChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      if (this.appGuessSongService.progressMoving) {
        return;
      }
      this.duration = v.duration;
      this.currentWidth = (v.currentTime * this.totalBarWidth) / v.duration;
    });
    // 计算缓冲进度
    this.appGuessSongService.bufferChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.bufferWidth = (v.bufferTime * this.totalBarWidth) / v.duration;
    });
    // 重置进度条
    this.appGuessSongService.resetProgress$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.currentWidth = 0;
      this.bufferWidth = 0;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
