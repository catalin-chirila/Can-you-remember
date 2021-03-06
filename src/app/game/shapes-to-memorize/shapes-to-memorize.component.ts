import { Component, OnDestroy } from '@angular/core';
import { GameService } from '../../common/game.service';
import { Subscription } from 'rxjs';
import { LevelService } from 'src/app/common/level.service';
import { SectionVisibilityService } from 'src/app/common/section-visibility.service';

@Component({
  selector: 'app-shapes-to-memorize',
  templateUrl: './shapes-to-memorize.component.html',
  styleUrls: ['./shapes-to-memorize.component.scss']
})
export class ShapesToMemorizeComponent implements OnDestroy {
  shapesToMemorize = this.gameService.getShapesToMemorize();
  questionMarks = this.generateArray(2);
  currentShapeToDisplayIndex = 0;
  shapesToDisplay = [];

  showShapes = true;
  shapesToMemorizeSubscriber: Subscription;
  showShapesToMemorizeSubscriber: Subscription;
  numberOfShapesSubscriber: Subscription;

  constructor(private gameService: GameService, private levelService: LevelService,
              private shapesVisibilityService: SectionVisibilityService) {

    this.shapesToMemorizeSubscriber = this.gameService.shapesToMemorize$.subscribe(
      (shapesToMemorize) => {
        this.shapesToMemorize = shapesToMemorize;
        this.currentShapeToDisplayIndex = 0;
        this.shapesToDisplay = [];
      });

    this.showShapesToMemorizeSubscriber = this.shapesVisibilityService.showShapesToMemorizeSection$.subscribe(
      (showShapes) => { this.showShapes = showShapes; });

    this.numberOfShapesSubscriber = this.gameService.questionMarksNumber$.subscribe(
      (numberOfShapes) => {

        this.questionMarks = numberOfShapes;

        if (numberOfShapes.length !== this.levelService.getAmountOfShapes()) {
          this.shapesToDisplay.push(this.shapesToMemorize[this.currentShapeToDisplayIndex]);
          this.currentShapeToDisplayIndex++;
        }

      });
  }

  private generateArray(amountOfNumbers: number): number[] {
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
