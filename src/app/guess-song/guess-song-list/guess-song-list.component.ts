import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toDoubleInteger, toSeconds } from 'src/app/core/common/common';
import { isNullOrUndefined } from 'util';
import { songsList, Song } from './song';
import { EventManager } from '@angular/platform-browser';
import { AppGuessSongService, SongStatus } from '../guess-song.service';


@Component({
  selector: 'app-guess-song-list',
  templateUrl: './guess-song-list.component.html',
  styleUrls: ['guess-song-list.component.scss']
})
export class AppGuessSongListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private playingSong: Song; // 正在播放的歌曲
  private audio = new Audio();
  private playDelay = 0;
  private validCheckTimer: NodeJS.Timer;
  private pauseTimer: NodeJS.Timer; // 暂停定时器, 淡出时0.5秒后执行暂停
  private fadeOutTimer: NodeJS.Timer; // 淡出定时器, 每隔0.1秒减弱0.2的音量, 来模拟淡出
  private fadeInTimer: NodeJS.Timer; // 淡入定时器, 同上
  private progressTimer: NodeJS.Timer; // 定时发送歌曲播放进度
  private canPlay = true; // 是否允许播放歌曲
  private rightList: number[];
  private playingSpecial = false; // 是否正在播特殊歌曲

  public showAlert: boolean; // 防止一开始就出现动画, 所以该值初始化为false
  public pause: boolean; // true: 播放, false: 暂停
  public songsList = songsList;
  public tipText = '尚未解锁该歌曲, 仅能听副歌部分, 即将播放下一首~'; // 提示文案

  @ViewChild('guessInput', { static: false }) input: ElementRef;

  // 保留两位整数, 1 => 01
  public getIndex(index: number): string {
    return toDoubleInteger(index);
  }

  // 确认是否选中
  public listClickHandler(index: number): void {
    this.songsList.forEach(v => v.selected = false);
    this.songsList[index].selected = true;
  }

  // 双击歌曲条目
  public tryToPlay(item: Song): void {
    // 如果双击的曲目和当前播放的曲目不同, 则立刻播放
    if (this.playingSong !== item) {
      this.playAudio(item);
      return;
    }
    // 按照网易云的设定, 正在播放的歌曲双击无效果
    if (!this.audio.paused) {
      return;
    }
    // 如果该歌曲已解锁, 则继续播放
    if (item.right) {
      this.appGuessSongService.playingStatus$.next(SongStatus.play);
      return;
    }
    // 若未解锁, 则校验当前暂停是否处于合法区间的
    const startTime = toSeconds(item.startTime);
    const endTime = toSeconds(item.endTime);
    const currentTime = this.audio.currentTime;
    if (currentTime >= startTime && currentTime <= endTime) { // 当前播放进度处在合法范围内
      this.appGuessSongService.playingStatus$.next(SongStatus.play);
    } else { // 不合法则重新播放
      this.playAudio(item);
    }
  }

  // #region 猜题相关
  // 点击开锁, 准备答题
  public guessStart(item: Song): void {
    if (!item.right && this.canPlay) {
      item.guessing = true;
      setTimeout(() => this.input.nativeElement.focus());
      if (item !== this.playingSong) {
        this.playAudio(item);
      }
    }
  }

  // 失焦的时候
  public guessingBluerHandler(): void {
    this.songsList.forEach((item, _index) => item.guessing = false);
  }

  // 使用了钥匙, 直接开锁
  public openLock(item: Song, index: number): void {
    if (this.playingSong === item) {
      clearInterval(this.validCheckTimer);
      this.unLock(item, index);
    } else {
      this.unLock(item, index);
      this.playAudio(item);
    }
    this.appGuessSongService.keyExpend$.next();
  }

  // 校验答案
  public guessSong(answer: string, item: Song, index: number): void {
    if (item.name.includes(answer)) {
      this.unLock(item, index);
    }
  }

  /** 解锁歌曲 */
  private unLock(item: Song, index: number): void {
    item.right = true;
    clearInterval(this.validCheckTimer);
    this.rightList.push(index);
    localStorage.setItem('rightList', JSON.stringify(this.rightList));
  }
  // #endregion

  // 播放歌曲
  public playAudio(item: Song): void {
    const startTime = toSeconds(item.startTime);
    const endTime = toSeconds(item.endTime) - 0.5; // - 0.5是为了适应淡出的时间
    this.songsList.forEach(v => v.playing = false);
    this.songsList.find(v => v.src === item.src).playing = true;
    this.playingSong = item;
    // 如果歌曲正在播放则淡出
    if (!this.audio.paused) {
      this.fadeOut();
      this.playDelay = 500; // 如果淡出则延迟0.5秒淡入
    }
    // 加载新歌曲资源
    setTimeout(() => {
      this.playDelay = 0; // 恢复默认值
      this.audio.src = item.src;
      this.audio.load();
      if (!isNullOrUndefined(this.showAlert)) { // 防止一开始就出现动画, 所以该值初始化为false
        this.showAlert = false;
      }
      clearInterval(this.validCheckTimer); // 先清除之前的'播放区间合法校验器'
      if (!item.right) { // 如果本歌曲尚未解锁, 则需要添加'播放区间合法校验器'
        this.audio.currentTime = startTime;
        // 当播放进度超出合法范围时, 停止播放
        this.validCheckTimer = setInterval(() => {
          if (endTime <= (this.audio.currentTime + 5)) {
            this.showAlert = true;
          }
          if (this.audio.currentTime > endTime) {
            this.fadeOut();
            clearInterval(this.validCheckTimer);
          }
        }, 1000);
      }
      this.appGuessSongService.playingStatus$.next(SongStatus.play);
    }, this.playDelay);
  }

  /** 显示信息弹窗 */
  private showAlertInfo(): void {
    // 拔牙完太疼了, 没心情写, 明儿再说吧.
  }

  /** 淡出 0.5s */
  private fadeOut(): void {
    this.clearTimer();
    let volume = 1;
    this.audio.volume = volume;
    this.fadeOutTimer = setInterval(() => {
      volume -= 0.2;
      this.audio.volume = volume > 0 ? volume : 0;
      if (volume <= 0) {
        clearInterval(this.fadeOutTimer);
      }
    }, 100);
    this.pauseTimer = setTimeout(() => {
      this.audio.pause();
    }, 500);
  }

  /** 淡入 0.5s */
  private fadeIn(): void {
    this.clearTimer();
    this.audio.play();
    let volume = 0;
    this.audio.volume = volume;
    this.fadeInTimer = setInterval(() => {
      volume += 0.2;
      this.audio.volume = volume > 1 ? 1 : volume;
      if (volume >= 1) {
        clearInterval(this.fadeInTimer);
      }
    }, 100);
  }

  /** 播放下一首歌 */
  private nextSong(): void {
    const playingSongIndex = this.songsList.findIndex(v => v.playing);
    this.songsList.forEach(v => v.playing = false);
    this.playAudio(this.songsList[playingSongIndex === this.songsList.length - 1 ? 0 : playingSongIndex + 1]);
  }

  /** 一些临界状态的变化会被定时器干扰, 统一清除所有的定时器 */
  private clearTimer(): void {
    clearTimeout(this.pauseTimer);
    clearTimeout(this.fadeOutTimer);
    clearTimeout(this.fadeInTimer);
  }

  constructor(
    private appGuessSongService: AppGuessSongService,
    private eventManager: EventManager
  ) { }

  ngOnInit(): void {
    // 监听空格键, 切换播放/暂停状态
    this.eventManager.addGlobalEventListener('window', 'keydown', (v: KeyboardEvent) => {
      if (v.code === 'Space' && this.playingSong) {
        this.appGuessSongService.playingStatus$.next(this.audio.paused ? SongStatus.pause : SongStatus.play);
      }
    });
    // 读取本地已答对歌曲数据
    this.rightList = JSON.parse(localStorage.getItem('rightList')) || [];
    this.rightList.forEach(v => this.songsList[v].right = true);
    // 更新歌曲播放进度条
    this.progressTimer = setInterval(() => {
      if (this.audio.duration) { // 播放歌曲时, 一开始传递的duration是NaN, 导致进度条总时间重置为0
        this.appGuessSongService.progressChange$.next({
          currentTime: this.audio.currentTime,
          duration: this.audio.duration
        });
      }
    }, 1000);
    // #region 监听Audio原生对象方法
    // 监听歌曲结束时, 切下一首歌
    this.audio.onpause = () => {
      const playingSong = this.songsList.find(v => v.playing);
      if (!playingSong.right) {
        // 要判断当前的暂停是否是超出合法范围引起的, 若为人工暂停则无需下一首
        if (this.audio.currentTime >= toSeconds(playingSong.endTime) - 1) {
          this.nextSong();
        }
      } else {
        // 已解锁的歌曲, 只有歌曲唱完才下一首
        if (this.audio.currentTime === this.audio.duration) {
          this.nextSong();
        }
      }
    };
    // 监听歌曲缓冲进度
    this.audio.onprogress = () => {
      const timeRanges = this.audio.buffered;
      if (timeRanges.length > 0) {
        const index = timeRanges.length - 1;
        this.appGuessSongService.bufferChange$.next({
          bufferTime: timeRanges.end(index > 0 ? index : 0),
          duration: this.audio.duration
        });
      }
    };
    this.audio.onloadeddata = () => {
      console.log('可以播放拉');
    };
    // #endregion
    /** 监听歌曲状态变更 */
    this.appGuessSongService.playingStatus$.pipe(takeUntil(this.unsubscribe$)).subscribe(status => {
      switch (status) {
        case SongStatus.privious:
          const playingSongIndex = this.songsList.findIndex(v => v.playing);
          this.songsList.forEach(v => v.playing = false);
          this.playAudio(this.songsList[playingSongIndex === 0 ? this.songsList.length - 1 : playingSongIndex - 1]);
          break;
        case SongStatus.pause:
          this.clearTimer();
          this.pause = true;
          this.fadeOut();
          break;
        case SongStatus.play:
          this.clearTimer();
          this.pause = false;
          this.fadeIn();
          break;
        case SongStatus.next:
          this.nextSong();
          break;
      }
    });
    // 监听特殊歌曲
    this.appGuessSongService.specialSong$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      if (v) {
        this.playingSpecial = true;
        this.appGuessSongService.playingStatus$.next(SongStatus.pause);
        // 表明当前正在播放特殊歌曲
        this.playingSpecial = true;
        this.tipText = '用心感受, 别出小差!';
      } else {
        this.playingSpecial = false;
        this.tipText = '尚未解锁该歌曲, 仅能听副歌部分, 即将播放下一首~';
      }
    });
    this.appGuessSongService.updatePlayingCurrentTime$.subscribe(v => this.audio.currentTime = v);
  }

  ngOnDestroy(): void {
    clearInterval(this.progressTimer);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
