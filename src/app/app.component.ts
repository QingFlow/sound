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
  ) {}

  ngOnInit(): void {
    this.eventManager.addGlobalEventListener('window', 'keydown', (event: KeyboardEvent) => {
      this.eventSrv.keyEvent.next({ key: event.key, event: 'keydown' });
    });

    this.eventManager.addGlobalEventListener('window', 'keyup', (event: KeyboardEvent) => {
      this.eventSrv.keyEvent.next({ key: event.key, event: 'keyup' });
    });
  }
}
