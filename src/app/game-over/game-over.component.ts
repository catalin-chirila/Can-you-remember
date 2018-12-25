import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-game-over',
    templateUrl: './game-over.component.html',
    styleUrls: ['./game-over.component.scss']
  })
export class GameOverComponent {
    levelReached: number;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GameOverComponent>) {
        this.levelReached = data.levelReached;
    }

    closeByPlayAgainOption() {
        this.dialogRef.close('playAgain');
    }

    closeByGoToMenuOption() {
        this.dialogRef.close('goToMenu');
    }
}
