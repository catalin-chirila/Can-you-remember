import { Component } from '@angular/core';
import { GameService } from '../common/game.service';
import { TimerService } from '../common/timer.service';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private gameService: GameService, private timerService: TimerService) {
    this.timerService.clearOutTimeInterval();
  }

  play() {
    this.gameService.resetGame();
  }
}
