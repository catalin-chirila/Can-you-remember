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
  simple: boolean;
  difficultySubscriber: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private difficultyService: DifficultyService) {
    this.difficultySubscriber = this.difficultyService.difficulty$.subscribe(
      (difficulty) => {
        this.simple = difficulty === 'Simple' ? true : false;
      });
  }

  ngOnInit() {
    if (!localStorage.getItem('difficulty')) {
      this.simple = true;
    } else if (localStorage.getItem('difficulty') === 'Simple') {
      this.simple = true;
    } else {
      this.simple = false;
    }
  }

  selectSimpleDifficulty() {
    this.difficultyService.changeDifficulty('Simple');
    this.simple = true;
  }

  selectRegularDifficulty() {
    this.difficultyService.changeDifficulty('Regular');
    this.simple = false;
  }

}
