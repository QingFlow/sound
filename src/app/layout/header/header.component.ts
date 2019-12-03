import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { AppSettingService, User } from 'src/app/core/service/setting.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public user: User;
  public maxExp: number; // 升级所需经验
  public currentExp = 0; // 当前经验值

  constructor(
    private electronService: ElectronService,
    private appSettingService: AppSettingService
  ) { }

  public operate(type: 'minimize' | 'reset' | 'close'): void {
    if (this.electronService.isElectronApp) {
      const mainWindow = this.electronService.remote.getCurrentWindow();
      switch (type) {
        case 'minimize':
          mainWindow.minimize();
          break;
        case 'reset':
          mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
          break;
        case 'close':
          mainWindow.close();
          break;
      }
    }
  }

  get width(): number {
    return 100 * this.user.exp / this.maxExp;
  }

  private getUser(): void {
    this.user = this.appSettingService.user;
    this.maxExp = this.appSettingService.maxExp;
  }

  ngOnInit(): void {
    this.getUser();
    this.appSettingService.guessRight$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.getUser());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
