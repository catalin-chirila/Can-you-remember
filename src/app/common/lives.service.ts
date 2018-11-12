import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivesService implements OnInit {
    lives = 5;
    lives$ = new Subject<number>();

    constructor() { }

    decreaseLives() {
        this.lives -= 1;
        this.lives$.next(this.lives);
    }

    getlivesSubject() {
        return this.lives$;
    }

    resetlivesSubjectTo(numberOfLives) {
        this.lives$ = numberOfLives;
    }

    ngOnInit(): void {
        this.lives$.next(this.lives);
    }

    getRemainingLives() {
        return this.lives;
    }

    resetLives() {
        this.lives = 5;
        this.lives$.next(this.lives);
    }
}
