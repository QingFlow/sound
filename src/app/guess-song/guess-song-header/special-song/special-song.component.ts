import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { from, of, concat, Observable, Subject } from 'rxjs';
import { delay, concatMap, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-special-song',
  templateUrl: './special-song.component.html',
  styleUrls: ['special-song.component.scss']
})
export class AppSpecialSongComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public showTitle = false;
  public showInput = false;
  public introduction: string[] = ['', '', '', '', '', '', '', '', ''];
  public _introduction = [
    '在成长的过程中, 我们会遇到成千上万的人.',
    '他们当中有的是路人, 与你擦肩而过; ',
    '有的是过客, 给你上了一堂课后转身离去; ',
    '有的是友人, 与你志同道合却各自天涯. ',
    '终究会有那么一类人, 让你十分想珍惜却又无法一起呼吸同一片天空的气息. ',
    '人生最美好的状态莫过于最爱的人在身边, 最好的朋友在对面. ',
    '此时, 是否有一张脸出现在你的记忆里? 心中是否浮现出了一个名字? ',
    '你一定很想念Ta吧!',
    '如果思念有声音, 那一定是这首歌.'
  ];

  @Output() close: EventEmitter<null> = new EventEmitter<null>();  // 关闭弹窗

  @ViewChild('gussInput', { static: false }) input: ElementRef;

  ngOnInit(): void {
    setTimeout(() => this.showTitle = true, 1000);
    const introduction$: Observable<string>[] = [];
    this._introduction.forEach((value, index) => introduction$.push(from(value).pipe(concatMap(char => of(char).pipe(delay(100))), tap(char => this.introduction[index] += char)).pipe(delay(1000))));
    setTimeout(() => {
      // takeUntil没起作用
      concat(...introduction$).pipe(takeUntil(this.unsubscribe$)).subscribe({
        complete: () => {
          this.showInput = true;
          setTimeout(() => this.input.nativeElement.focus());
        }
      });
    }, 2500);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
