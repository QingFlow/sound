import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppGuessSongService } from '../guess-song.service';
import { songsList } from '../guess-song-list/song';
import { ElectronService } from 'ngx-electron';
import { AppSettingService } from 'src/app/core/service/setting.service';
import { NzMessageService } from 'ng-zorro-antd';
import { setLocalStorage, getLocalStorage } from 'src/app/core/common/utils';

@Component({
  selector: 'app-guess-song-header',
  templateUrl: './guess-song-header.component.html',
  styleUrls: ['guess-song-header.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppGuessSongHeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public showSpecialSong = false;
  public showKeys = false;
  public keys: number[];
  public songNumber: number; // 歌曲数
  public playingTimes: number; // 歌曲播放的总次数

  // 获得3把钥匙
  public guessRightHandler(): void {
    this.showKeys = true;
    this.keys = [1, 2, 3];
    setLocalStorage('keys', this.keys);
  }

  public unlockAll(): void {
    if (this.appSettingService.user.level === 6) {
      this.appGuessSongService.unlockAll$.next();
    } else {
      this.nzMessageService.error('只有等级达到6级才可以使用此功能!');
    }
  }

  public projectGithub(): void {
    const url = 'https://github.com/QingFlow/sound';
    if (this.electronService.isElectronApp) {
      this.electronService.shell.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  public myGithub(): void {
    const url = 'https://github.com/Mr-Eve';
    if (this.electronService.isElectronApp) {
      this.electronService.shell.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  public clearLocalStorage(): void {
    localStorage.clear();
    if (this.electronService.isElectronApp) {
      this.nzMessageService.success('清除成功, 请重启应用!');
    } else {
      window.location.reload();
    }
  }

  constructor(
    private electronService: ElectronService,
    private appGuessSongService: AppGuessSongService,
    private appSettingService: AppSettingService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.songNumber = songsList.length;
    this.playingTimes = getLocalStorage('playingTimes') || 0;
    const keys = getLocalStorage('keys');
    if (keys) {
      this.keys = keys;
      this.showKeys = true;
    }
    this.appGuessSongService.keyExpend$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.keys.length = this.keys.length - 1;
      setLocalStorage('keys', this.keys);
    });
    this.appGuessSongService.playNewSong$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      if (!v) {
        this.playingTimes++;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
