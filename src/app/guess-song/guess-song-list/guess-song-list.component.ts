import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { toDoubleInteger, toSeconds } from 'src/app/core/common/common';
import { isNullOrUndefined } from 'util';
import { songsList, Song } from './song';


@Component({
  selector: 'app-guess-song-list',
  templateUrl: './guess-song-list.component.html',
  styleUrls: ['guess-song-list.component.scss']
})
export class AppGuessSongListComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  private src: string;
  private audio = new Audio();
  private playDelay = 0;
  private validCheckTimer: NodeJS.Timer;
  private pauseTimer: NodeJS.Timer;
  private fadeOutTimer: NodeJS.Timer;
  private fadeInTimer: NodeJS.Timer;
  private canPlay = true; // 是否允许播放歌曲

  public showAlert: boolean; // 防止一开始就出现动画, 所以该值初始化为false
  public pause: boolean; // true: 播放, false: 暂停
  public songsList = songsList;

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

  // 播放歌曲
  public playAudio(item: Song): void {
    // #region 疯狂切换歌曲有播放异常, 因为使用了大量计时器, 暂时用这种笨办法解决
    if (!this.canPlay) {
      return;
    }
    this.canPlay = false;
    setTimeout(() => this.canPlay = true, 1000);
    // #endregion
    const startTime = toSeconds(item.startTime);
    const endTime = toSeconds(item.endTime) - 0.5; // - 0.5是为了适应淡出的时间
    if (this.src === item.title) { // 点击是同一首歌时不操作
      if (this.audio.paused) { // 处于播放状态不操作
        if (!item.right) {
          const currentTime = this.audio.currentTime;
          if (currentTime >= startTime && currentTime <= endTime) { // 当前播放进度处在合法范围内
            this.appService.pauseOrPlay$.next(true);
          } else { // 不合法则重新播放
            this.src = ''; // 防止递归死循环
            this.playAudio(item);
          }
        } else {
          this.fadeIn();
        }
      }
      return;
    }
    this.songsList.forEach(v => v.playing = false);
    this.songsList.find(v => v.title === item.title).playing = true;
    this.src = item.title;
    // 如果歌曲正在播放则淡出
    if (!this.audio.paused) {
      this.fadeOut();
      this.playDelay = 500; // 如果淡出则延迟1秒淡入
    }
    // 加载新歌曲资源
    clearInterval(this.validCheckTimer);
    setTimeout(() => {
      this.audio.currentTime = 0;
      this.audio.src = `../../assets/musics/${item.title}`;
      if (!isNullOrUndefined(this.showAlert)) { // 防止一开始就出现动画, 所以该值初始化为false
        this.showAlert = false;
      }
      if (!item.right) {
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
      this.appService.pauseOrPlay$.next(true);
      // 通知底部进度条歌曲进度信息
      setInterval(() => {
        if (this.audio.duration) { // 播放歌曲时, 一开始传递的duration是NaN, 导致进度条总时间重置为0
          this.appService.progressChange$.next({
            currentTime: this.audio.currentTime,
            duration: this.audio.duration
          });
        }
      });
      this.playDelay = 0;
    }, this.playDelay);
  }

  /** 淡出 0.5s */
  private fadeOut(): void {
    clearTimeout(this.fadeInTimer); // 防止淡入音效影响
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
    clearTimeout(this.pauseTimer); // 防止暂停
    clearTimeout(this.fadeOutTimer); // 防止淡出音效影响
    clearTimeout(this.fadeInTimer); // 尚不清楚为何会内存泄露
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
    if (playingSongIndex === this.songsList.length - 1) {
      this.playAudio(this.songsList[0]);
    } else {
      this.playAudio(this.songsList[playingSongIndex + 1]);
    }
  }

  // #region 猜题相关
  // 点击操作栏
  public guessStart(item: Song): void {
    if (!item.right && this.canPlay) {
      item.guessing = true;
      setTimeout(() => this.input.nativeElement.focus());
      this.playAudio(item);
    }
  }

  // 失焦的时候
  public guessingBluerHandler(): void {
    this.songsList.forEach((item, _index) => item.guessing = false);
  }

  // 校验答案
  public guessSong(answer: string, item: Song, index: number): void {
    if (item.name.includes(answer)) {
      item.right = true;
      this.rightList.push(index);
      localStorage.setItem('rightList', JSON.stringify(this.rightList));
    }
  }
  // #endregion

  constructor(
    private appService: AppService
  ) { }
  // tslint:disable-next-line: member-ordering
  public rightList: number[];
  ngOnInit(): void {
    // 读取本地已答对歌曲数据
    this.rightList = JSON.parse(localStorage.getItem('rightList')) || [];
    this.rightList.forEach(v => this.songsList[v].right = true);
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
    /** 监听上一首、下一首、暂停的动作 */
    this.appService.previousSong$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      const playingSongIndex = this.songsList.findIndex(v => v.playing);
      this.songsList.forEach(v => v.playing = false);
      if (playingSongIndex === 0) {
        this.playAudio(this.songsList[this.songsList.length - 1]);
      } else {
        this.playAudio(this.songsList[playingSongIndex - 1]);
      }
    });
    this.appService.nextSong$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.nextSong());
    this.appService.pauseOrPlay$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.pause = v;
      v ? this.fadeIn() : this.fadeOut();
    });
    // 监听特殊歌曲
    this.appService.specialSong$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      if (v) {
        this.appService.pauseOrPlay$.next(false);
      }
    });
  }
}
