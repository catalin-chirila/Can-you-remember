import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService implements OnInit {
    level = 1;
    levelSubject = new Subject<number>();

    constructor() { }

    increaseLevel() {
        this.level += 1;
        this.levelSubject.next(this.level);
    }

    ngOnInit(): void {
        this.levelSubject.next(this.level);
    }

    getLevel() {
        return this.level;
    }

    getAmountOfShapes(): number {
        switch (this.level) {
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
}
