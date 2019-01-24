import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../common/game.service';
import { Subscription } from 'rxjs';
import { ShapesVisibilityService } from 'src/app/common/shapes-visibility.service';
import { DifficultyService } from 'src/app/common/difficulty.service';

@Component({
    selector: 'app-shapes-to-pick-from',
    templateUrl: './shapes-to-pick-from.component.html',
    styleUrls: ['./shapes-to-pick-from.component.scss']
  })
export class ShapesToPickFromComponent implements OnInit, OnDestroy {
  shapesToPickFrom = this.gameService.getShapesToPickFrom();
  shapesToPickFromSubscriber: Subscription;
  showShapesToPickFromSubscriber: Subscription;
  showShapes = false;
  difficulty = 'Simple';
  difficultySubscriber: Subscription;

  hiddenShapes = this.gameService.getHiddenShapesToPickFrom();

  constructor(private gameService: GameService,
              private shapesVisibilityService: ShapesVisibilityService,
              private difficultyService: DifficultyService) {
    if (localStorage.getItem('difficulty')) {
      this.difficulty = localStorage.getItem('difficulty');
    }

    this.shapesToPickFromSubscriber = this.gameService.shapesToPickFrom$.subscribe(
      (shapesToPickFrom) => { this.shapesToPickFrom = shapesToPickFrom; });

    this.showShapesToPickFromSubscriber = this.shapesVisibilityService.showShapesToPickSection$.subscribe(
      (showShapes) => { this.showShapes = showShapes; });

    this.difficultySubscriber = this.difficultyService.difficulty$.subscribe(
      (difficulty) => { this.difficulty = difficulty; });
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
    this.showShapesToPickFromSubscriber.unsubscribe();
  }

  ngOnInit(): void {
  }
}
