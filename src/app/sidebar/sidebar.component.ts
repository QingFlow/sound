import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class AppSidebarComponent {
  public regularList = [
    {
      name: '推荐',
      children: [
        {
          name: '听歌识曲',
          icon: 'guess-music',
          link: 'guess-song',
          selected: false
        },
        {
          name: '来点钢琴曲吧',
          icon: 'find-music',
          link: 'piano',
          selected: false
        }
      ]
    }
  ];

  public openQingForm(): void {
    const url = 'https://tirelyl.github.io/qing-form/basic';
    if (this.electronService.isElectronApp) {
      this.electronService.shell.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  constructor(
    private electronService: ElectronService
  ) { }
}
