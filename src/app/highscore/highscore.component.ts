import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DifficultyService } from '../common/difficulty.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {
  scores: any[];
  simpleDifficultyScores: any[];
  regularDifficultyScores: any[];

  error: boolean;
  difficulty: string;
  difficultySubscriber: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private difficultyService: DifficultyService) {
    this.scores = data.highscores;
    this.simpleDifficultyScores = data.highscores;
    this.error = data.error;

    this.difficultySubscriber = this.difficultyService.difficulty$.subscribe(
      (difficulty) => {this.difficulty = difficulty; });

    this.difficulty = this.difficultyService.getDifficulty();
  }

  ngOnInit(): void {
    if (!this.error) {
      this.simpleDifficultyScores = this.scores.filter(e => e.difficulty === 'Simple').sort((a, b) => {
        if (a.level === b.level) {
          return Math.abs(a.date - b.date);
        }

        return b.level - a.level;
      });

      this.regularDifficultyScores = this.scores.filter(e => e.difficulty === 'Regular').sort((a, b) => {
        if (a.level === b.level) {
          return Math.abs(a.date - b.date);
        }

        return b.level - a.level;
      });

    }
  }

  switchToSimpleDifficultyScores() {
    this.difficulty = 'Simple';
  }

  switchToRegularDifficultyScores() {
    this.difficulty = 'Regular';
  }

}
