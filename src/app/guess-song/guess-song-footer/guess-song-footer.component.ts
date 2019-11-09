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

  public width = '0px'; // 歌曲已播进度条的宽度
  public currentTime: string = '00:00'; // 当前歌曲已播的时间
  public duration: string = '00:00'; // 歌曲总时间
  public playing = false; // 歌曲的播放状态

  @ViewChild('totalBar', { static: false }) totalBar: ElementRef;

  @Input() current: number = 0;
  @Input() max: number = 0;

  @HostListener('window:resize')
  onResize() {
    // this.resizeWorks();
    // const totalWidth = this.totalBar.nativeElement.offsetWidth;
    // const value = (720 * 50) / totalWidth;
    // this.width = `${value}px`;
    // console.log(this.totalBar.nativeElement.offsetWidth, 'this.totalBar.nativeElement.offsetWidth');
    // console.log(this.width, 'this.width');
  }

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.progressChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.currentTime = toMinute(v.currentTime);
      this.duration = toMinute(v.duration);
      // 计算当前进度
      const totalWidth = this.totalBar.nativeElement.offsetWidth;
      const value = (~~v.currentTime * totalWidth) / ~~v.duration;
      this.width = `${value}px`;
    });
    this.appService.pauseOrPlay$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => this.playing = v);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
