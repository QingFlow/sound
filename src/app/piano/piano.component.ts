import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['piano.component.scss']
})
export class AppPianoComponent implements OnInit {

  constructor(
    private eventManager: EventManager
  ) {}

  ngOnInit(): void {
    this.eventManager.addGlobalEventListener('window', 'keydown', (event: KeyboardEvent) => {
      console.log('监听到键盘按下事件了', event);
      console.log(event.key);
    });
    this.eventManager.addGlobalEventListener('window', 'keyup', (event: KeyboardEvent) => {
      console.log('监听到键盘松开事件了', event);
      console.log(event.key);
    });
  }
}
