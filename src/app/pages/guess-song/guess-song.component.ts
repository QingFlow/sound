import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-song',
  templateUrl: './guess-song.component.html'
})
export class AppGuessSongComponent implements OnInit {
  ngOnInit(): void {
    document.body.onkeydown = e => {
      e.preventDefault();
    };
  }
}
