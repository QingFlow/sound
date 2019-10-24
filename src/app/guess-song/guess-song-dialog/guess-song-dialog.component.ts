import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-guess-song-dialog',
  templateUrl: './guess-song-dialog.component.html',
  styleUrls: ['guess-song-dialog.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ])
    ])
  ]
})
export class AppGuessSongDialogComponent implements OnInit {
  public data: string;
  ngOnInit(): void {
    console.log(`this.data = ${this.data}`);
  }
  closeOptionPanel(): void {
    console.log('closeOptionPanel');
  }
}
