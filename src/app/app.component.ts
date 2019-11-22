import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { EventService } from './core/service/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private eventManager: EventManager,
    private eventSrv: EventService
  ) { }

  ngOnInit(): void {
    // 禁用浏览器默认下滑的行为
    document.body.onkeydown = event => event.preventDefault();
    // 考虑把 EventManager 改由 EventService 去调用。这里只调 eventSrv.setup()，现在的 EventService 封装的内容过少
    this.eventManager.addGlobalEventListener('window', 'keydown', (event: KeyboardEvent) => {
      this.eventSrv.keyEvent.next({ key: event.key, event: 'keydown' });
    });

    this.eventManager.addGlobalEventListener('window', 'keyup', (event: KeyboardEvent) => {
      this.eventSrv.keyEvent.next({ key: event.key, event: 'keyup' });
    });
  }
}
