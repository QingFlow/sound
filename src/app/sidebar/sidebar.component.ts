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
          name: '发现音乐',
          icon: 'find-music',
          selected: false
        },
        {
          name: '私人FM',
          icon: 'radio',
          selected: false
        },
        {
          name: 'LOOK直播',
          icon: 'LOOK',
          selected: false
        },
        {
          name: '视频',
          icon: 'video',
          selected: false
        },
        {
          name: '朋友',
          icon: 'friends',
          selected: false
        }
      ]
    },
    {
      name: '我的音乐',
      children: [
        {
          name: '本地音乐',
          icon: 'local-music',
          selected: false
        },
        {
          name: '下载管理',
          icon: 'download',
          selected: false
        },
        {
          name: '我的音乐云盘',
          icon: 'clound',
          selected: false
        },
        {
          name: '我的电台',
          icon: 'broadcast',
          selected: false
        },
        {
          name: '我的收藏',
          icon: 'person-save',
          selected: false
        }
      ]
    },
    {
      name: '创建的歌单',
      children: [
        {
          name: '我喜欢的音乐',
          icon: 'heart',
          selected: false
        }
      ]
    }
  ];

  public listClickHandler(listIndex: number, itemIndex: number): void {
    this.regularList.forEach(list => list.children.forEach(item => item.selected = false));
    this.regularList[listIndex].children[itemIndex].selected = true;
  }

  ngOnInit(): void {

  }
}
