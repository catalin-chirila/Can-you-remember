import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DifficultyService } from '../common/difficulty.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {
  difficulty: string;
  difficultySubscriber: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private difficultyService: DifficultyService) {
    this.difficultySubscriber = this.difficultyService.difficulty$.subscribe(
      (difficulty) => {this.difficulty = difficulty; });
  }

  ngOnInit() {
    this.difficulty = this.difficultyService.getDifficulty();
  }

  selectSimpleDifficulty() {
    this.difficultyService.changeDifficulty('Simple');
  }

  selectRegularDifficulty() {
    this.difficultyService.changeDifficulty('Regular');
  }

}
