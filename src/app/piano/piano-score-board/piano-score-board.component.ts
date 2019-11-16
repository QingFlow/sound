import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piano-score-board',
  templateUrl: './piano-score-board.component.html',
  styleUrls: ['piano-score-board.component.scss']
})
export class AppPianoScoreBoardComponent implements OnInit {

  score = [
    'o', ' ',
    'u', 'o',
    's', ' ',
    ' ', ' ',
    'p', ' ',
    's', ' ',
    'o', ' ',
    ' ', ' ',

    'o', ' ',
    't', 'y',
    'u', ' ',
    'y', 't',
    'y', ' ',
    ' ', ' ',
    ' ', ' ',
    ' ', ' ',

    'o', ' ',
    'u', 'o',
    's', ' ',
    ' ', 'a',
    'p', ' ',
    's', ' ',
    'o', ' ',
    ' ', ' ',

    'o', ' ',
    'y', 'u',
    'i', ' ',
    ' ', 'r',
    't', ' ',
    ' ', ' ',
    ' ', ' ',
    ' ', ' ',

    'p', ' ',
    's', ' ',
    's', ' ',
    ' ', ' ',
    'a', ' ',
    'p', 'a',
    's', ' ',
    ' ', ' ',

    'p', 'a',
    's', 'p',
    'p', 'o',
    'u', 't',
    'y', ' ',
    ' ', ' ',
    ' ', ' ',
    ' ', ' ',

    'o', ' ',
    'u', 'o',
    's', ' ',
    ' ', 'a',
    'p', ' ',
    's', ' ',
    'o', ' ',
    ' ', ' ',

    'o', ' ',
    'y', 'u',
    'i', ' ',
    ' ', 'r',
    't', ' ',
    ' ', ' ',
    ' ', ' ',
    ' ', ' ',
  ];

  beatsCount = 0;

  constructor() {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.beatsCount++;
      if (this.beatsCount > this.score.length + 10) {
        clearInterval(interval);
      }
    }, 500);
  }
}
