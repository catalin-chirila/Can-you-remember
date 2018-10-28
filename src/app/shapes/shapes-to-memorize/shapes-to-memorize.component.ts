import { Component, OnDestroy } from '@angular/core';
import { GameService } from '../../common/game.service';
import { Subscription } from 'rxjs';
import { LevelService } from 'src/app/common/level.service';

@Component({
    selector: 'app-shapes-to-memorize',
    templateUrl: './shapes-to-memorize.component.html',
    styleUrls: ['./shapes-to-memorize.component.css']
  })
export class ShapesToMemorizeComponent implements OnDestroy {
  shapesToMemorize = this.gameService.getShapesToMemorize();
  numberOfShapes: number[];

  isHidden = false;
  shapesToMemorizeSubscriber: Subscription;
  isHiddenSubscriber: Subscription;

  constructor(private gameService: GameService, private levelService: LevelService) {
    this.shapesToMemorizeSubscriber = this.gameService.shapesToMemorizeSubject.subscribe(
      (shapesToMemorize) => {this.shapesToMemorize = shapesToMemorize; });

    this.isHiddenSubscriber = this.gameService.isShapesToMemorizeHiddenSubject.subscribe(
      (isHidden) => {this.isHidden = isHidden; });

    this.numberOfShapes = this.generateArray(this.levelService.getAmountOfShapes());
  }

  generateArray(amountOfNumbers: number): number[] {
    const numberArray = [];
    for (let i = 0; i < amountOfNumbers; i++) {
      numberArray.push(0);
    }
    return numberArray;
  }

  ngOnDestroy(): void {
    this.shapesToMemorizeSubscriber.unsubscribe();
    this.isHiddenSubscriber.unsubscribe();
  }
}
