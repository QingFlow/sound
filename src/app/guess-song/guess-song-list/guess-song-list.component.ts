import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { toDoubleInteger, toSeconds } from 'src/app/core/common/common';
import { isNullOrUndefined } from 'util';

interface Song {
  title: string; // 标题
  name: string[]; // 歌名, 使用数组的方式匹配多个歌名, 防止多名歌曲
  singer: string; // 歌手
  album: string; // 专辑
  totalTime: string; // 时长
  startTime: string; // 副歌开始时间
  endTime: string; // 副歌结束时间
  selected: boolean; // 是否为当前鼠标选中项
  playing: boolean; // 是否处于播放状态
  guessing: boolean; // 是否正在猜题
  right: boolean; // 是否已答题
}

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

  public showAlert: boolean;
  public pause: boolean; // true: 播放, false: 暂停
  public songsList: Song[] = [
    {
      title: 'Clever勺子 - 如果我变成回忆(吉他女版)（Cover：Tank）.mp3',
      name: ['如果我变成回忆'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '04:46',
      startTime: '01:13',
      endTime: '02:13',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: 'FIELD OF VIEW - Dandan心魅かれてく(渐渐被你吸引).mp3',
      name: ['痴心绝渐渐被你吸引对'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '03:34',
      startTime: '00:04',
      endTime: '00:21',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: '泥鳅Niko - 樱花草（男版）（Cover：Sweety）.mp3',
      name: ['樱花草'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '02:13',
      startTime: '1:11',
      endTime: '1:39',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: 'Westlife - My Love (Radio Edit).mp3',
      name: ['相思'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '03:53',
      startTime: '01:58',
      endTime: '02:38',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: '杨搏 - 遇见.mp3',
      name: ['遇见'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '03:39',
      startTime: '01:15',
      endTime: '01:38',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: '水木年华 - 一生有你.mp3',
      name: ['一生有你'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '04:18',
      startTime: '03:08',
      endTime: '03:54',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: '胡歌 - 忘记时间.mp3',
      name: ['忘记时间'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '04:32',
      startTime: '01:32',
      endTime: '02:00',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: '莫文蔚 - 盛夏的果实.mp3',
      name: ['盛夏的果实'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '04:10',
      startTime: '02:42',
      endTime: '03:50',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: 'Backstreet Boys - As Long as You Love Me.mp3',
      name: ['As Long as You Love Me'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '03:32',
      startTime: '00:57',
      endTime: '01:18',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    },
    {
      title: '蔡依林,周杰伦 - 布拉格广场.mp3',
      name: ['布拉格广场'],
      singer: '阴阳师',
      album: '我要的(完整版)',
      totalTime: '04:54',
      startTime: '01:00',
      endTime: '01:41',
      selected: false,
      playing: false,
      guessing: false,
      right: false
    }
  ];

  @ViewChild('gussInput', { static: false }) input: ElementRef;

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
      if (!isNullOrUndefined(this.showAlert)) { // 防止一开始就出现动画
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
  // 点击猜题按钮
  public guessStart(item: Song): void {
    item.guessing = true;
    setTimeout(() => this.input.nativeElement.focus());
  }

  // 失焦的时候
  public guessingBluerHandler(): void {
    this.songsList.forEach((item, _index) => item.guessing = false);
  }

  // 校验答案
  public guessSong(answer: string, item: Song): void {
    if (item.name.includes(answer)) {
      item.right = true;
    }
  }
  // #endregion

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
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
  }
}
