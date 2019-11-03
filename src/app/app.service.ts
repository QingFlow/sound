import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  /** guess-song */
  public progressChange$ = new Subject<{ currentTime: number, duration: number }>(); // 播放进度变更
  public previousSong$ = new Subject<void>();
  public nextSong$ = new Subject<void>();
  public pauseOrPlay$ = new Subject<boolean>(); // true: 播放, false: 暂停
  public specialSong$ = new Subject<boolean>(); // 开始/关闭进入特殊歌曲界面
  public keyExpend$ = new Subject<void>(); // 消耗了一把钥匙
}
