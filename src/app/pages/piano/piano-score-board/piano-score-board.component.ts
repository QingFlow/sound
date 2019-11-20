import { Component, OnInit } from '@angular/core';
import { songbie } from '../piano.constants';

@Component({
  selector: 'app-piano-score-board',
  templateUrl: './piano-score-board.component.html',
  styleUrls: ['piano-score-board.component.scss']
})
export class AppPianoScoreBoardComponent implements OnInit {

  score = songbie;

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
