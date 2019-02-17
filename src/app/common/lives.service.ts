import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivesService implements OnInit {
    private lives = 5;
    private _lives$ = new Subject<number>();

    ngOnInit(): void {
        this._lives$.next(this.lives);
    }

    getRemainingLives(): number {
        return this.lives;
    }

    decreaseLives(): void {
        this.lives -= 1;
        this._lives$.next(this.lives);
    }

    resetLives(): void {
        this.lives = 5;
        this._lives$.next(this.lives);
    }

    get lives$(): Observable<number> {
        return this._lives$.asObservable();
    }
}
