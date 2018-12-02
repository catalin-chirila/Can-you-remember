import { Component } from '@angular/core';
import { GameService } from '../common/game.service';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private gameService: GameService) {}

}
