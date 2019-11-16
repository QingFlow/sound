import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { from, of, concat, Observable, Subject } from 'rxjs';
import { delay, concatMap, tap, takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-special-song',
  templateUrl: './special-song.component.html',
  styleUrls: ['special-song.component.scss']
})
export class AppSpecialSongComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private audio = new Audio();

  public wrong = false; // 是否答题错误
  public showKeys = false;
  public showTitle = false;
  public showInput = false;
  public finish = false; // 结束时收起输入框的动画
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
  public lines: { width: string, height: string, top: string, left: string, animationDelay: string}[] = [];

  @Output() close: EventEmitter<null> = new EventEmitter<null>();  // 关闭弹窗
  @Output() guessRight: EventEmitter<null> = new EventEmitter<null>();  // 答题成功, 获得钥匙

  @ViewChild('guessInput', { static: false }) input: ElementRef;

  public validAnswer(answer: string): void {
    if (answer === '1') {
      this.finish = true;
      this.playEndingMusic();
      setTimeout(() => { // 等待窗体上拉动画完成后, 开始出现钥匙动画
        this.showKeys = true;
        setTimeout(() => {  // 动画完成后显示已有钥匙
          this.guessRight.emit();
        }, 2000);
        setTimeout(() => { // 隐藏钥匙
          this.showKeys = false;
        }, 2500);
      }, 1000);
    } else {
      this.wrong = true;
    }
  }

  // 点击关闭事件
  public closeClick(): void {
    this.finish = true;
    this.playEndingMusic();
  }

  private playEndingMusic(): void {
    // 先淡出原先的BGM
    let volume = 1;
    this.audio.volume = volume;
    let fadeOutTimer: NodeJS.Timer;
    fadeOutTimer = setInterval(() => {
      volume -= 0.2;
      this.audio.volume = volume > 0 ? volume : 0;
      if (volume <= 0) {
        clearInterval(fadeOutTimer);
        this.audio.pause();
        // 播放结束BGM
        this.audio.src = 'https://file.qingflow.com/uploads/file/7f34e6c8-e213-4424-abf7-21bcb23cbfbc.mp3';
        this.audio.loop = false;
        this.audio.volume = 1;
        this.audio.play();
        // endingMusic持续7秒, 所以7秒后才能关闭弹窗
        setTimeout(() => {
          this.close.emit();
        }, 8200);
      }
    }, 100);
  }

  /**
   * 初始化特殊歌曲中，跳动线条动画
   */
  initLines(): void {
    let i = 0;
    while (i < 99) {
      this.lines.push({ width: `${this.randomNum(1, 3)}px`,
        height: `${this.randomNum(20, 80)}%`,
        top: `${this.randomNum(-170, -140)}%`,
        left: `${this.randomNum(5, 95)}%`,
        animationDelay: `${this.randomNum(0, 30) / 10}s`
      });
      i++;
    }
  }

  /**
   * 获取从 m 到 n 之间的随机数
   */
  randomNum(m: number, n: number): number {
    return Math.floor( Math.random() * (n - m + 1) ) + m;
  }

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    // 播放世界上最好听的BGM
    this.appService.specialSong$.next(true);
    this.audio.src = `https://file.qingflow.com/uploads/file/ed1da145-a7c9-4bb9-9c8f-36f73b0b15ac.mp3`;
    this.audio.loop = true;
    this.audio.play(); // 先注释, 快听吐了

    setTimeout(() => this.showTitle = true, 1000);
    const introduction$: Observable<string>[] = [];
    // 可以加速动画, 调试用
    // this._introduction.forEach((value, index) => introduction$.push(from(value).pipe(concatMap(char => of(char).pipe(delay(1))), tap(char => this.introduction[index] += char)).pipe(delay(10))));
    this._introduction.forEach((value, index) => introduction$.push(from(value).pipe(concatMap(char => of(char).pipe(delay(100))), tap(char => this.introduction[index] += char)).pipe(delay(1000))));
    setTimeout(() => {
      // takeUntil没起作用
      concat(...introduction$).pipe(takeUntil(this.unsubscribe$)).subscribe({
        complete: () => {
          this.showInput = true;
          setTimeout(() => this.input.nativeElement.focus());
        }
      });
    }, 2000);

    // 初始化 BGM输入时的线条动画
    this.initLines();
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.appService.specialSong$.next(false);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
