import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivesService implements OnInit {
    private lives = 5;
    lives$ = new Subject<number>();

    ngOnInit(): void {
        this.lives$.next(this.lives);
    }

    getRemainingLives(): number {
        return this.lives;
    }

    decreaseLives(): void {
        this.lives -= 1;
        this.lives$.next(this.lives);
    }

    resetLives(): void {
        this.lives = 5;
        this.lives$.next(this.lives);
    }
}
