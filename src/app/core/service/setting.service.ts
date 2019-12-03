import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface User {
  level: number; // 等级
  exp: number; // 经验值
}

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  private _user: User;

  public guessRight$ = new Subject<void>(); // 解锁歌曲

  get user(): User {
    return this._user;
  }

  public setUser(value: User): void {
    this._user = value;
  }

  /** 每答对一首歌, 增加100经验值 */
  public addUserExp(): void {
    this.user.exp += 100;
    // 判断是否应该升级
    const maxExp = 100 * Math.pow(2, this.user.level - 1);
    if (this.user.exp === maxExp) {
      this.levelUp();
    }
    this.guessRight$.next();
    localStorage.setItem('soundUser', JSON.stringify(this.user));
  }

  // 升级
  private levelUp(): void {
    this.user.level++;
    this.user.exp = 0;
  }
}
