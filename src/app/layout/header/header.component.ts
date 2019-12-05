import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { AppSettingService, User } from 'src/app/core/service/setting.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private isfullscreen: boolean;

  public user: User;
  public maxExp: number; // 升级所需经验
  public currentExp = 0; // 当前经验值

  get width(): number {
    return 100 * this.user.exp / this.maxExp;
  }

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
    } else {
      switch (type) {
        case 'reset':
          this.isfullscreen ? this.closefullscreen() : this.openfullscreen();
          break;
        default:
          this.nzMessageService.warning('仅支持原生应用, 可前往仓库下载exe安装文件');
          break;
      }
    }
  }

  private openfullscreen() {
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
    this.isfullscreen = true;
  }

  private closefullscreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.isfullscreen = false;
  }

  private getUser(): void {
    this.user = this.appSettingService.user;
    this.maxExp = this.appSettingService.maxExp;
  }

  constructor(
    private electronService: ElectronService,
    private nzMessageService: NzMessageService,
    private appSettingService: AppSettingService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.appSettingService.guessRight$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.getUser());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
