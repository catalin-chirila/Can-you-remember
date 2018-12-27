import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material';
import { GameOverComponent } from '../game-over/game-over.component';
import { LevelService } from './level.service';
import { GameService } from './game.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { TimerService } from './timer.service';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    gameOverDialogRef: MatDialogRef<GameOverComponent>;
    loginDialogRef: MatDialogRef<LoginComponent>;

    constructor(private dialogWindow: MatDialog,
                private gameService: GameService,
                private levelService: LevelService,
                private timerService: TimerService,
                private router: Router) { }

    openLoginDialog() {
        // if (localStorage.getItem('loggedUser')) {
        //     this.router.navigate(['game']);
        //     this.timerService.startTimer(5);
        // } else {
            this.loginDialogRef = this.dialogWindow.open(LoginComponent, {
                disableClose: false
            });
            this.loginDialogRef.afterClosed().subscribe(() => {
                this.timerService.startTimer(5);
            });
        // }
    }

    openGameOverDialog() {
        this.gameOverDialogRef = this.dialogWindow.open(GameOverComponent, {
            disableClose: true,
            data: {
                levelReached: this.levelService.level
            }
        });
        this.gameOverDialogRef.afterClosed().subscribe((buttonName: any) => {
            if (buttonName === 'playAgain') {
                this.gameService.resetGame();
            }
        });
    }


}
