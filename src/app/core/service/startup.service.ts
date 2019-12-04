import { Injectable } from '@angular/core';
import { AppSettingService, User } from './setting.service';
import { getLocalStorage, setLocalStorage } from '../common/utils';

/**
 * 应用启动时, 获取用户信息
 */
@Injectable()
export class StartupService {
  load(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      let user = getLocalStorage('soundUser') as User;
      if (!user) {
        user = {
          level: 1,
          exp: 0
        };
      }
      setLocalStorage('soundUser', user);
      this.appSettingService.setUser(user);
      resolve(true);
    });
  }

  constructor(
    private appSettingService: AppSettingService
  ) { }
}
