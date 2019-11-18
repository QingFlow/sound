import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-song',
  templateUrl: './guess-song.component.html'
})
export class AppGuessSongComponent implements OnInit {
  ngOnInit(): void {
    // 尝试阻止空格键引起页面下拉
    // document.body.onkeydown = e => {
    //   e.preventDefault();
    // };
  }
}
