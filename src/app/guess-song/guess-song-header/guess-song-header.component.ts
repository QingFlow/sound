import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppGuessSongService } from '../guess-song.service';

@Component({
  selector: 'app-guess-song-header',
  templateUrl: './guess-song-header.component.html',
  styleUrls: ['guess-song-header.component.scss']
})
export class AppGuessSongHeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public showSpecialSong = false;
  public showKeys = false;
  public keys: number[];

  // 获得3把钥匙
  public guessRightHandler(): void {
    this.showKeys = true;
    this.keys = [1, 2, 3];
    localStorage.setItem('keys', JSON.stringify(this.keys));
  }

  constructor(
    private appGuessSongService: AppGuessSongService
  ) { }

  ngOnInit(): void {
    const keys = JSON.parse(localStorage.getItem('keys'));
    if (keys) {
      this.keys = keys;
      this.showKeys = true;
    }
    this.appGuessSongService.keyExpend$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.keys.length = this.keys.length - 1;
      localStorage.setItem('keys', JSON.stringify(this.keys));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
