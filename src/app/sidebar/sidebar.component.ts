import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
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

  public listClickHandler(listIndex: number, itemIndex: number): void {
    this.regularList.forEach(list => list.children.forEach(item => item.selected = false));
    this.regularList[listIndex].children[itemIndex].selected = true;
  }

  public openQingForm(): void {
    // QingForm的链接到时候放这里
    window.open('https://www.baidu.com', '_blank');
  }

  ngOnInit(): void {

    // {
    //   name: 'QingForm',
    //   icon: 'qing-form',
    //   link: 'panio',
    //   selected: false
    // }
  }
}
