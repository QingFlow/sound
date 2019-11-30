import { Component, OnInit, OnDestroy, Host } from '@angular/core';
import { songbie, meijianxue } from '../piano.constants';
import { EventService } from '../../../core/service/event.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppPianoComponent } from '../piano.component';

interface SongListItem {
  id: number;
  name: string;
  source: string[];
}

@Component({
  selector: 'app-piano-score-board',
  templateUrl: './piano-score-board.component.html',
  styleUrls: ['piano-score-board.component.scss']
})
export class AppPianoScoreBoardComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  songList: SongListItem[] = [
    { id: 1, name: '《送别》', source: songbie },
    { id: 2, name: '《眉间雪》', source: meijianxue }
  ];
  selecedSong = this.songList[0];
  score: string[] = songbie;
  boardScrollTimer: NodeJS.Timer;
  beatsCount = 0;
  autoPlaying = false;

  compareSong(song1: SongListItem, song2: SongListItem): boolean {
    return song1.id === song2.id;
  }

  changeSong(song: SongListItem): void {
    this.score = song.source;
    this.beatsCount = 0;
    this.clearTimer();
  }

  toggleAutoPlay(): void {
    if (this.autoPlaying) {
      this.beatsCount = 0;
      this.clearTimer();
      this.autoPlaying = false;
    } else {
      this.beatsCount = 0;
      this.clearTimer();
      this.autoPlaying = true;
      this.boardScrollTimer = setInterval(() => {
        this.pianoComp.triggerPianoKey(this.score[this.beatsCount - 3]);
        this.beatsCount++;
      }, 500);
    }
  }

  private clearTimer(): void {
    clearInterval(this.boardScrollTimer);
    this.boardScrollTimer = null;
  }

  constructor(
    private eventSrv: EventService,
    @Host() private pianoComp: AppPianoComponent
  ) {}

  ngOnInit(): void {
    this.eventSrv.keyEvent$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        if (event.key !== ' ' || event.event !== 'keydown') { return; }
        if (!this.boardScrollTimer) {
          this.boardScrollTimer = setInterval(() => {
              this.beatsCount++;
              if (this.beatsCount > this.score.length + 10) {
                this.clearTimer();
              }
            }, 500);
        } else {
          this.clearTimer();
          if (this.autoPlaying) {
            this.beatsCount = 0;
            this.autoPlaying = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
