import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import Tone from 'tone';
import { SoundLibrary } from './instruments';
import { numbers, lettersRow1, lettersRow2, lettersRow3 } from './piano.constants';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['piano.component.scss']
})
export class AppPianoComponent implements OnInit {
  numbers = numbers;
  lettersRow1 = lettersRow1;
  lettersRow2 = lettersRow2;
  lettersRow3 = lettersRow3;

  synth: any;

  constructor(private eventManager: EventManager) {}

  ngOnInit(): void {
    // 初始化合成器
    this.synth = new SoundLibrary().load();

    const ableKeys = [
      ...this.numbers,
      ...this.lettersRow1,
      ...this.lettersRow2,
      ...this.lettersRow3
    ];

    this.eventManager.addGlobalEventListener('window', 'keydown', (event: KeyboardEvent) => {
      // console.log('监听到键盘按下事件了', event);
      // console.log(event.key);
      const activeKey = ableKeys.find(item => item.key.toLowerCase() === event.key);
      if (!activeKey || (activeKey && activeKey.active)) { return; }
      activeKey.active = true;
      this.synth.triggerAttackRelease(activeKey.soundCode, '1n');
    });

    this.eventManager.addGlobalEventListener('window', 'keyup', (event: KeyboardEvent) => {
      // console.log('监听到键盘松开事件了', event);
      // console.log(event.key);
      const activeKey = ableKeys.find(item => item.key.toLowerCase() === event.key);
      if (activeKey) { activeKey.active = false; }
    });
  }
}
