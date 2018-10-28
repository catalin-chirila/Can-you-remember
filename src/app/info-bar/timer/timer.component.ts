import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../common/game.service';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
  })
export class TimerComponent {
  timeLeft: number;
  interval;

  constructor(private gameService: GameService) {
    this.startTimer(5);
    this.gameService.showShapesToMemorize();
  }

  startTimer(timerStartingValue: number) {
    this.gameService.showShapesToMemorize();
    this.timeLeft = timerStartingValue;
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.stopTimer();
        // this.gameService.hideShapesToMemorize();
        this.gameService.populateShapesToPickFrom();
        this.gameService.populateShapesToMemorize();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.gameService.populateShapesToPickFrom();
  }
}
