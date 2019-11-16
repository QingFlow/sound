import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import Tone from 'tone';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['piano.component.scss']
})
export class AppPianoComponent implements OnInit {
  numbers = [
    { key: '1', soundCode: 'C2', active: false },
    { key: '2', soundCode: 'D2', active: false },
    { key: '3', soundCode: 'E2', active: false },
    { key: '4', soundCode: 'F2', active: false },
    { key: '5', soundCode: 'G2', active: false },
    { key: '6', soundCode: 'A2', active: false },
    { key: '7', soundCode: 'B2', active: false },
    { key: '8', soundCode: 'C3', active: false },
    { key: '9', soundCode: 'D3', active: false },
    { key: '0', soundCode: 'E3', active: false }
  ];
  lettersRow1 = [
    { key: 'Q', soundCode: 'F3', active: false },
    { key: 'W', soundCode: 'G3', active: false },
    { key: 'E', soundCode: 'A3', active: false },
    { key: 'R', soundCode: 'B3', active: false },
    { key: 'T', soundCode: 'C4', active: false },
    { key: 'Y', soundCode: 'D4', active: false },
    { key: 'U', soundCode: 'E4', active: false },
    { key: 'I', soundCode: 'F4', active: false },
    { key: 'O', soundCode: 'G4', active: false },
    { key: 'P', soundCode: 'A4', active: false }
  ];
  lettersRow2 = [
    { key: 'A', soundCode: 'B4', active: false },
    { key: 'S', soundCode: 'C5', active: false },
    { key: 'D', soundCode: 'D5', active: false },
    { key: 'F', soundCode: 'E5', active: false },
    { key: 'G', soundCode: 'F5', active: false },
    { key: 'H', soundCode: 'G5', active: false },
    { key: 'J', soundCode: 'A5', active: false },
    { key: 'K', soundCode: 'B5', active: false },
    { key: 'L', soundCode: 'C6', active: false }
  ];
  lettersRow3 = [
    { key: 'Z', soundCode: 'D6', active: false },
    { key: 'X', soundCode: 'E6', active: false },
    { key: 'C', soundCode: 'F6', active: false },
    { key: 'V', soundCode: 'G6', active: false },
    { key: 'B', soundCode: 'A6', active: false },
    { key: 'N', soundCode: 'B6', active: false },
    { key: 'M', soundCode: 'C7', active: false }
  ];

  synth: any;

  constructor(
    private eventManager: EventManager
  ) {
    // 初始化合成器
    this.synth = new Tone.PolySynth(34).toMaster();

    // this.synth = SmapleLibrary.load({
    //   instruments: 'piano'
    // }).toMaster();
  }

  ngOnInit(): void {

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
      this.synth.triggerAttackRelease(activeKey.soundCode, '4n');
    });
    this.eventManager.addGlobalEventListener('window', 'keyup', (event: KeyboardEvent) => {
      // console.log('监听到键盘松开事件了', event);
      // console.log(event.key);
      const activeKey = ableKeys.find(item => item.key.toLowerCase() === event.key);
      if (activeKey) { activeKey.active = false; }
    });
  }
}
