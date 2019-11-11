import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { toMinute } from 'src/app/core/common/common';

@Component({
  selector: 'app-guess-song-footer',
  templateUrl: './guess-song-footer.component.html',
  styleUrls: ['guess-song-footer.component.scss']
})
export class AppGuessSongFooterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public currentWidth = '0px'; // 歌曲已播进度条的宽度
  public bufferWidth = '0px'; // 已缓存的进度条宽度
  public currentTime: string = '00:00'; // 当前歌曲已播的时间
  public duration: string = '00:00'; // 歌曲总时间
  public playing = false; // 歌曲的播放状态

  @ViewChild('totalBar', { static: false }) totalBar: ElementRef;

  constructor(
    public appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.progressChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.currentTime = toMinute(v.currentTime);
      this.duration = toMinute(v.duration);
      // 计算当前进度
      const totalWidth = this.totalBar.nativeElement.offsetWidth;
      this.currentWidth = `${(v.currentTime * totalWidth) / v.duration}px`;
    });
    this.appService.bufferCahnge$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      const totalWidth = this.totalBar.nativeElement.offsetWidth;
      this.bufferWidth = `${(v.bufferTime * totalWidth) / v.duration}px`;
    });
    this.appService.pauseOrPlay$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => this.playing = v);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
