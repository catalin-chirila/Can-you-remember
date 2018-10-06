import { Component } from '@angular/core';
import { GameService } from '../../common/game.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shapes-to-memorize',
    templateUrl: './shapes-to-memorize.component.html',
    styleUrls: ['./shapes-to-memorize.component.css']
  })
export class ShapesToMemorizeComponent {
  shapesToMemorize = this.gameService.getShapesToMemorize();
  shapesToMemorizeSubscriber: Subscription;

  constructor(private gameService: GameService) {
    this.shapesToMemorizeSubscriber = this.gameService.shapesToMemorizeSubject.subscribe(
      (shapesToMemorize) => {this.shapesToMemorize = shapesToMemorize; });
  }

}
