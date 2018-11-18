import { Component, OnDestroy } from '@angular/core';
import { GameService } from '../../common/game.service';
import { Subscription } from 'rxjs';
import { LevelService } from 'src/app/common/level.service';
import { ShapesVisibilityService } from 'src/app/common/shapes-visibility.service';

@Component({
  selector: 'app-shapes-to-memorize',
  templateUrl: './shapes-to-memorize.component.html',
  styleUrls: ['./shapes-to-memorize.component.scss']
})
export class ShapesToMemorizeComponent implements OnDestroy {
  shapesToMemorize = this.gameService.getShapesToMemorize();
  questionMarks = this.generateArray(2);

  showShapes = true;
  shapesToMemorizeSubscriber: Subscription;
  showShapesToMemorizeSubscriber: Subscription;
  numberOfShapesSubscriber: Subscription;

  constructor(private gameService: GameService, private levelService: LevelService,
              private shapesVisibilityService: ShapesVisibilityService) {

    this.shapesToMemorizeSubscriber = this.gameService.shapesToMemorize$.subscribe(
      (shapesToMemorize) => { this.shapesToMemorize = shapesToMemorize; });

    this.showShapesToMemorizeSubscriber = this.shapesVisibilityService.showShapesToMemorize$.subscribe(
      (showShapes) => { this.showShapes = showShapes; });

    this.numberOfShapesSubscriber = this.gameService.questionMarksNumber$.subscribe(
      (numberOfShapes) => { this.questionMarks = numberOfShapes; });
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
    this.showShapesToMemorizeSubscriber.unsubscribe();
  }
}
