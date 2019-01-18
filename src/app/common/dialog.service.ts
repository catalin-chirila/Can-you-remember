import { Injectable } from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material';
import { GameOverComponent } from '../game-over/game-over.component';
import { LevelService } from './level.service';
import { GameService } from './game.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { TimerService } from './timer.service';
import { SignupComponent } from '../signup/signup.component';
import { HighscoreComponent } from '../highscore/highscore.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DifficultyComponent } from '../difficulty/difficulty.component';
import { InstructionsComponent } from '../instructions/instructions.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    gameOverDialogRef: MatDialogRef<GameOverComponent>;
    loginDialogRef: MatDialogRef<LoginComponent>;
    signupDialogRef: MatDialogRef<SignupComponent>;
    highscoreDialogRef: MatDialogRef<HighscoreComponent>;
    difficultyDialogRef: MatDialogRef<DifficultyComponent>;
    instructionsDialogRef: MatDialogRef<InstructionsComponent>;

    constructor(private dialogWindow: MatDialog,
                private gameService: GameService,
                private levelService: LevelService,
                private timerService: TimerService,
                private http: HttpClient,
                private router: Router) { }

    openLoginDialog() {
        if (localStorage.getItem('loggedUser')) {
            this.gameService.resetGame();
            this.router.navigate(['game']);
        } else {
            this.loginDialogRef = this.dialogWindow.open(LoginComponent, {
                autoFocus: false
            });
        }
    }

    openGameOverDialog() {
        this.gameOverDialogRef = this.dialogWindow.open(GameOverComponent, {
            data: {
                levelReached: this.levelService.level
            },
            disableClose: true,
            autoFocus: false
        });
        this.gameOverDialogRef.afterClosed().subscribe((buttonName: any) => {
            if (buttonName === 'playAgain') {
                this.gameService.resetGame();
            }
        });
    }

    openHighScoreDialog() {
        this.http.get('/api/score', {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
        }).subscribe(scores => {
            this.highscoreDialogRef = this.dialogWindow.open(HighscoreComponent, {
                data: {
                    highscores: scores,
                    error: false
                },
                autoFocus: false
            });
        }, err => {
            this.highscoreDialogRef = this.dialogWindow.open(HighscoreComponent, {
                data: {
                    highscores: null,
                    error: true
                },
                autoFocus: false
            });
        });
    }

    openDifficultyDialog() {
        this.difficultyDialogRef = this.dialogWindow.open(DifficultyComponent, {
            autoFocus: false
        });
    }

    openInstructionsDialog() {
        this.instructionsDialogRef = this.dialogWindow.open(InstructionsComponent, {
            autoFocus: false
        });
    }
}
