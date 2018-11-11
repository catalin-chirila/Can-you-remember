import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { ShapesVisibilityService } from './shapes-visibility.service';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    timeLeft = 5;
    time$ = new Subject<number>();
    interval;

    constructor(private shapesVisibilityService: ShapesVisibilityService) { }

    startTimer(timerStartingValue: number) {
        if (this.timeLeft === 0) {
            this.time$.next(timerStartingValue);
        }

        this.timeLeft = timerStartingValue;
        this.interval = setInterval(() => {
            if (this.timeLeft > 1) {
                this.timeLeft--;
                this.time$.next(this.timeLeft);
            } else {
                this.stopTimer();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.interval);
        this.timeLeft = 0;
        this.time$.next(this.timeLeft);
        this.shapesVisibilityService.hideShapesToMemorize();
        this.shapesVisibilityService.showShapesToPickFrom();
    }
}
