import { Component } from '@angular/core';
import { GameService } from '../../common/game.service';

@Component({
    selector: 'app-shapes-to-memorize',
    templateUrl: './shapes-to-memorize.component.html',
    styleUrls: ['./shapes-to-memorize.component.css']
  })
export class ShapesToMemorizeComponent {
  shapesToMemorize = this.gameService.getShapesToMemorize();

  constructor(private gameService: GameService) {}

}
