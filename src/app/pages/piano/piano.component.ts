import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EventService } from '../../core/service/event.service';
import { SoundLibrary } from './instruments';
import { numbers, lettersRow1, lettersRow2, lettersRow3, PianoKey } from './piano.constants';
@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['piano.component.scss']
})
export class AppPianoComponent implements OnInit, OnDestroy {
  numbers = numbers;
  lettersRow1 = lettersRow1;
  lettersRow2 = lettersRow2;
  lettersRow3 = lettersRow3;

  private unsubscribe$ = new Subject<void>();
  private pianoKeys: PianoKey[];
  synth: any;
  keyBoerdLoading = false;

  /** 用户点击页面上的按键 */
  userClickPiano(pianoKey: PianoKey) {
    if (pianoKey.active) { return; }
    pianoKey.active = true;
    this.synth.triggerAttackRelease(pianoKey.soundCode, '1n');
  }

  triggerPianoKey(key: string): void {
    const keyItem = this.pianoKeys.find(item => item.key === key);
    if (!keyItem) { return; }
    keyItem.active = true;
    this.synth.triggerAttackRelease(keyItem.soundCode, '1n');
    setTimeout(() => keyItem.active = false, 300);
  }

  /**
   * 钢琴琴键按压事件
   */
  private handlePianoKeyEvent(event: { key: string, event: 'keydown' | 'keyup' }): void {
    const activeKey = this.pianoKeys.find(item => item.key.toLowerCase() === event.key);
    if (!activeKey) { return; }
    if (event.event === 'keydown') {
      if (activeKey.active) { return; }
      activeKey.active = true;
      this.synth.triggerAttackRelease(activeKey.soundCode, '1n');
    } else if (event.event === 'keyup') {
      activeKey.active = false;
    }
  }

  private addKeyBoardEventListener(): void {
    this.eventSrv.keyEvent$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => this.handlePianoKeyEvent(event));
  }

  constructor(
    private eventSrv: EventService
  ) {}

  ngOnInit(): void {
    this.keyBoerdLoading = true;
    // 初始化合成器
    this.synth = new SoundLibrary().load();

    this.pianoKeys = [
      ...this.numbers,
      ...this.lettersRow1,
      ...this.lettersRow2,
      ...this.lettersRow3
    ];

    // 监听采样加载完成
    const timer = setInterval(() => {
      console.log(this.synth.loaded);
      if (this.synth.loaded) {
        this.keyBoerdLoading = false;
        this.addKeyBoardEventListener();
        clearInterval(timer);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
