import { Component } from '@angular/core';
import { GameService } from '../../common/game.service';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
  })
export class TimerComponent {
  constructor(private gameService: GameService) {}

}
