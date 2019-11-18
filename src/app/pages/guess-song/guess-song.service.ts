import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

export const enum SongStatus {
  privious,
  pause,
  play,
  next
}

@Injectable()
export class AppGuessSongService {
  private messageShowing = false; // 是否正在显示message

  public progressChange$ = new Subject<{ currentTime: number, duration: number }>(); // 播放进度变更
  public playingStatus$ = new Subject<SongStatus>(); // 歌曲的各个状态变更
  public specialSong$ = new Subject<boolean>(); // 开始/关闭进入特殊歌曲界面
  public keyExpend$ = new Subject<void>(); // 消耗了一把钥匙
  public bufferChange$ = new Subject<{ bufferTime: number, duration: number }>(); // 歌曲的缓存秒数
  public updatePlayingCurrentTime$ = new Subject<number>(); // 拖拽进度条导致的播放时间变更
  /** true: 处于缓冲 false: 能够播放 */
  public playNewSong$ = new Subject<boolean>();

  public message(text: string) {
    if (!this.messageShowing) {
      this.messageService.warning(text, { nzDuration: 5000 });
      this.messageShowing = true;
      setTimeout(() => {
        this.messageShowing = false;
      }, 5000);
    }
  }

  constructor(
    private messageService: NzMessageService
  ) { }
}
