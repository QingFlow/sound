import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { toDoubleInteger, toSeconds } from 'src/app/core/common/common';

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
  private mode = true; // true: 副歌模式, false: 完整模式
  private pauseTimer: NodeJS.Timer;
  private fadeOutTimer: NodeJS.Timer;
  private fadeInTimer: NodeJS.Timer;

  public pause: boolean; // true: 播放, false: 暂停
  public songsList = [
    {
      title: '巧乐兹 - 爱河 (抖音版) (Cover：蒋雪儿).mp3',
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '02:13',
      startTime: '00:00',
      endTime: '00:31',
      selected: false,
      playing: false
    },
    {
      title: '糯米Nomi,Babystop_山竹 - 痴心绝对（糯米欢快版）（Cover：李圣杰）.mp3',
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '02:13',
      startTime: '00:02',
      endTime: '00:37',
      selected: false,
      playing: false
    },
    {
      title: '泥鳅Niko - 樱花草（男版）（Cover：Sweety）.mp3',
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '02:13',
      startTime: '1:11',
      endTime: '1:39',
      selected: false,
      playing: false
    },
    {
      title: '毛阿敏 - 相思.mp3',
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '02:13',
      startTime: '00:49',
      endTime: '01:20',
      selected: false,
      playing: false
    },
    {
      title: '陈雪凝 - 绿色.mp3',
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '02:13',
      startTime: '00:56',
      endTime: '01:27',
      selected: false,
      playing: false
    }
  ];

  // 保留两位整数, 1 => 01
  public getIndex(index: number): string {
    return toDoubleInteger(index);
  }

  // 确认是否选中
  public listClickHandler(index: number): void {
    this.songsList.forEach(v => v.selected = false);
    this.songsList[index].selected = true;
  }

  constructor(
    private appService: AppService
  ) { }
  check(): void {
  }

  // 播放歌曲
  public playAudio(item: any): void {
    const startTime = toSeconds(item.startTime);
    const endTime = toSeconds(item.endTime) - 0.5; // - 0.5是为了适应淡出的时间
    if (this.src === item.title) { // 点击是同一首歌时不操作
      if (this.audio.paused) { // 处于播放状态不操作
        if (this.mode) {
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
      if (this.mode) {
        this.audio.currentTime = startTime;
        // 当播放进度超出合法范围时, 停止播放
        this.validCheckTimer = setInterval(() => {
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

  ngOnInit(): void {
    // 监听歌曲结束时, 切下一首歌
    this.audio.onpause = () => {
      if (this.mode) {
        const playingSong = this.songsList.find(v => v.playing);
        if (this.audio.currentTime >= toSeconds(playingSong.endTime) - 1) {
          this.nextSong();
        }
      } else {
        if (this.audio.currentTime === this.audio.duration) {
          this.nextSong();
        }
      }
    };
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
    this.appService.modeChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => this.mode = v);
  }
}
