import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent {
  scores: any[];
  error: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.scores = data.highscores;
    this.error = data.error;

    if (this.scores !== null) {
      this.scores = this.scores.sort((a, b) => {
        if (a.level === b.level) {
          return Math.abs(a.date - b.date);
        }

        return b.level - a.level;
      });
    }
  }

}
