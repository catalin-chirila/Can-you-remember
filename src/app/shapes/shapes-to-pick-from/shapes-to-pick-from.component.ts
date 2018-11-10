import { Component, OnDestroy } from '@angular/core';
import { GameService } from '../../common/game.service';
import { Subscription } from 'rxjs';
import { ShapesVisibilityService } from 'src/app/common/shapes-visibility.service';

@Component({
    selector: 'app-shapes-to-pick-from',
    templateUrl: './shapes-to-pick-from.component.html',
    styleUrls: ['./shapes-to-pick-from.component.scss']
  })
export class ShapesToPickFromComponent implements OnDestroy {
  shapesToPickFrom = this.gameService.getShapesToPickFrom();
  shapesToPickFromSubscriber: Subscription;
  showShaptesToPickFromSubscriber: Subscription;
  showShapes = false;

  hiddenShapes = this.gameService.getHiddenShapesToPickFrom();

  constructor(private gameService: GameService, private shapesVisibilityService: ShapesVisibilityService) {
    this.shapesToPickFromSubscriber = this.gameService.shapesToPickFromSubject.subscribe(
      (shapesToPickFrom) => {this.shapesToPickFrom = shapesToPickFrom; });

    this.showShaptesToPickFromSubscriber = this.shapesVisibilityService.showShapesToPickFromSubject.subscribe(
      (showShapes) => {this.showShapes = showShapes; });
  }

  getShapesRow(number: number): Object[] {
    const row = [];
    const startIndex = number * 4 - 4;
    const endIndex = number * 4;

    for (let i = startIndex; i < endIndex; i++) {
      row.push(this.shapesToPickFrom[i]);
    }

    return row;
  }

  ngOnDestroy(): void {
    this.shapesToPickFromSubscriber.unsubscribe();
    this.showShaptesToPickFromSubscriber.unsubscribe();
  }
}


