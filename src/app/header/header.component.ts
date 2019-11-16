import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class AppHeaderComponent {
  constructor(
    private electronService: ElectronService
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
}
