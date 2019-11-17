import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export const enum SongStatus {
  privious,
  pause,
  play,
  next
}

@Injectable()
export class AppGuessSongService {
  public progressChange$ = new Subject<{ currentTime: number, duration: number }>(); // 播放进度变更
  public playingStatus$ = new Subject<SongStatus>();
  public specialSong$ = new Subject<boolean>(); // 开始/关闭进入特殊歌曲界面
  public keyExpend$ = new Subject<void>(); // 消耗了一把钥匙
  public bufferChange$ = new Subject<{ bufferTime: number, duration: number }>(); // 歌曲的缓存秒数
  public updatePlayingCurrentTime$ = new Subject<number>(); // 拖拽进度条导致的播放时间变更
}
