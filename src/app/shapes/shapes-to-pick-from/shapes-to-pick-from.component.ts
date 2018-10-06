import { Component } from '@angular/core';
import { GameService } from '../../common/game.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shapes-to-pick-from',
    templateUrl: './shapes-to-pick-from.component.html',
    styleUrls: ['./shapes-to-pick-from.component.css']
  })
export class ShapesToPickFromComponent {
  shapesToPickFrom = this.gameService.getShapesToPickFrom();
  shapesToPickFromSubscriber: Subscription;

  constructor(private gameService: GameService) {
    this.shapesToPickFromSubscriber = this.gameService.shapesToPickFromSubject.subscribe(
      (shapesToPickFrom) => {this.shapesToPickFrom = shapesToPickFrom; });
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
}


