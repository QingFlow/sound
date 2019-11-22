import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  keyEvent = new Subject<{ key: string, event: 'keydown' | 'keyup' }>(); // 建议命名为 keyEvent$，考虑拆分成两个事件流
}
