import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DifficultyService } from './difficulty.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService implements OnInit {
    private _level = 1;
    private _level$ = new Subject<number>();

    constructor(private difficultyService: DifficultyService, private requestService: RequestService) {}

    ngOnInit(): void {
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

    increaseLevel(): void {
        this._level += 1;
        this._level$.next(this._level);
    }

    resetLevel(): void {
        this._level = 1;
        this._level$.next(this._level);
    }

    saveScore(): void {
        if (localStorage.getItem('loggedUser')) {
            const score = {
                username: localStorage.getItem('loggedUser'),
                level: this._level,
                difficulty: this.difficultyService.getDifficulty(),
                date: Date.now()
            };

            this.requestService.saveScore(score);
        }
    }

    get level(): number {
        return this._level;
    }

    get level$(): Observable<number> {
        return this._level$.asObservable();
    }
}
