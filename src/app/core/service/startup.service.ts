import { Injectable } from '@angular/core';
import { AppSettingService, User } from './setting.service';

/**
 * 应用启动时, 获取用户信息
 */
@Injectable()
export class StartupService {
  load(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      let user = JSON.parse(localStorage.getItem('soundUser')) as User;
      if (!user) {
        user = {
          level: 1,
          exp: 0
        };
      }
      localStorage.setItem('soundUser', JSON.stringify(user));
      this.appSettingService.setUser(user);
      resolve(true);
    });
  }

  constructor(
    private appSettingService: AppSettingService
  ) { }
}
