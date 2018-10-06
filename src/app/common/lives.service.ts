import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivesService implements OnInit {
    lives = 5;
    livesSubject = new Subject<number>();

    constructor() { }

    decreaseLives() {
        this.lives -= 1;
        this.livesSubject.next(this.lives);
    }

    getlivesSubject() {
        return this.livesSubject;
    }

    resetlivesSubjectTo(numberOfLives) {
        this.livesSubject = numberOfLives;
    }

    ngOnInit(): void {
        this.livesSubject.next(this.lives);
    }
}
