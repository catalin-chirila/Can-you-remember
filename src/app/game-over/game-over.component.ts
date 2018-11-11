import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-game-over',
    templateUrl: './game-over.component.html',
    styleUrls: ['./game-over.component.scss']
  })
export class GameOverComponent {
    levelReached: number;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
            this.levelReached = data.levelReached;
    }
}
