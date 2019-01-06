import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DifficultyService } from './difficulty.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService implements OnInit {
    private _level = 1;
    private _level$ = new Subject<number>();

    constructor(private http: HttpClient, private difficultyService: DifficultyService) { }

    ngOnInit(): void {
        this._level$.next(this._level);
    }

    increaseLevel() {
        this._level += 1;
        this._level$.next(this._level);
    }

    getAmountOfShapes(): number {
        switch (this._level) {
            case 1: return 2;
            case 2: return 2;
            case 3: return 3;
            case 4: return 3;
            case 5: return 4;
            case 6: return 4;
            case 7: return 5;
            case 8: return 5;
            case 9: return 6;
            case 10: return 6;
            default: return 7;
        }
    }

    resetLevel() {
        this._level = 1;
        this._level$.next(this._level);
    }

    public get level() {
        return this._level;
    }

    public get level$() {
        return this._level$;
    }

    saveScore() {
        if (localStorage.getItem('loggedUser')) {
            const score = {
                username: localStorage.getItem('loggedUser'),
                level: this._level,
                difficulty: this.difficultyService.getDifficulty(),
                date: Date.now()
            };

            this.http.post('/api/score', score, {
                headers: new HttpHeaders()
                  .set('Content-Type', 'application/json')
                  .set( 'Authorization', localStorage.getItem('jwtToken'))
              }).subscribe(data => {
                // Show a notification -> Score Saved

            }, err => {
                if (err.status === 401) {
                    // Show a notification -> Score couldn't be Saved
                    console.log(err);
                }
            });
        }

    }
}
