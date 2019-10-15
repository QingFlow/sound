import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { toMinute } from 'src/app/core/common/common';

@Component({
  selector: 'app-guess-song-progress',
  templateUrl: './guess-song-progress.component.html',
  styleUrls: ['guess-song-progress.component.scss']
})
export class AppGuessSongProgressComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public width = '0px'; // 歌曲已播进度条的宽度
  public currentTime: string = '00:00'; // 当前歌曲已播的时间
  public duration: string = '00:00'; // 歌曲总时间

  @ViewChild('totalBar', { static: false }) totalBar: ElementRef;

  @Input() current: number = 0;
  @Input() max: number = 0;

  @HostListener('window:resize')
  onResize() {
    // this.resizeWorks();
    const totalWidth = this.totalBar.nativeElement.offsetWidth;
    const value = (720 * 50) / totalWidth;
    this.width = `${value}px`;
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
