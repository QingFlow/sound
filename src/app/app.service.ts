import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  /** guess-song */
  public progressChange$ = new Subject<{ currentTime: number, duration: number }>();
  public previousSong$ = new Subject<void>();
  public nextSong$ = new Subject<void>();
  public pauseOrPlay$ = new Subject<boolean>(); // true: 播放, false: 暂停
}
