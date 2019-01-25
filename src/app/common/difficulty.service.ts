import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
    private _difficulty$ = new Subject<string>();

    changeDifficulty(difficulty: string): void {
        localStorage.setItem('difficulty', difficulty);
        this._difficulty$.next(difficulty);
    }

    getDifficulty(): string {
        if (localStorage.getItem('difficulty') === 'Simple') {
            return 'Simple';
        } else if (localStorage.getItem('difficulty') === 'Regular') {
            return 'Regular';
        }

        return 'Simple';
    }

    get difficulty$() {
        return this._difficulty$.asObservable();
    }
}
