import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public keyEvent$ = new Subject<{ key: string, event: 'keydown' | 'keyup' }>();
  public blankKeydown$ = new Subject<void>(); // 监听空格键keydown事件
}
