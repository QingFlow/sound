import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  keyEvent = new Subject<{ key: string, event: 'keydown' | 'keyup' }>();
}
