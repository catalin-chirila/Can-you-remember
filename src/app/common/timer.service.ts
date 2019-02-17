import { Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SectionVisibilityService } from './section-visibility.service';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    private timeLeft = 5;
    private _time$ = new Subject<number>();
    private interval;

    constructor(private shapesVisibilityService: SectionVisibilityService) {}

    startTimer(timerStartingValue: number): void {
        if (this.timeLeft === 0) {
            this._time$.next(timerStartingValue);
        }

        this.timeLeft = timerStartingValue;
        this.interval = setInterval(() => {
            if (this.timeLeft > 1) {
                this.timeLeft--;
                this._time$.next(this.timeLeft);
            } else {
                this.stopTimer();
            }
        }, 1000);
    }

    stopTimer(): void {
        clearInterval(this.interval);
        this.timeLeft = 0;
        this._time$.next(this.timeLeft);
        this.shapesVisibilityService.hideShapesToMemorize();
        this.shapesVisibilityService.showShapesToPickFrom();
    }

    clearOutTimeInterval(): void {
        clearInterval(this.interval);
    }

    get time$(): Observable<number> {
        return this._time$.asObservable();
    }
}
