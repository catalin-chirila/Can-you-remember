import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/common/game.service';
import { Subscription } from 'rxjs';
import * as anime from 'animejs';

@Component({
  selector: 'app-level-completed',
  templateUrl: './level-completed.component.html',
  styleUrls: ['./level-completed.component.scss']
})
export class LevelCompletedComponent {
  levelComplete = false;
  levelCompleteSubscription: Subscription;
  message = 'Level completed!';

  constructor(private gameService: GameService) {
    this.levelCompleteSubscription = this.gameService.levelComplete$.subscribe(
      (levelComplete) => {
        this.levelComplete = levelComplete;

        if (levelComplete) {
          this.showLevelCompleteMessageAnimation();
        }
      });
  }

  showLevelCompleteMessageAnimation() {
    const message = document.getElementById('levelComplete');

    const tl = anime.timeline({
      easing: 'easeInQuart'
    });

    tl
      .add({
        targets: message,
        opacity: 1,
        duration: 1000,
      })
      .add({
        targets: message,
        opacity: 0,
        delay: 1950,
        duration: 50,
      });
  }

}
