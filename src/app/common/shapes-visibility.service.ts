import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapesVisibilityService {
    showShapesToPickFrom$ = new Subject<boolean>();
    showShapesToMemorize$ = new Subject<boolean>();

    showShapesToMemorize() {
        this.showShapesToMemorize$.next(true);
    }

    hideShapesToMemorize() {
        this.showShapesToMemorize$.next(false);
    }

    showShapesToPickFrom() {
        this.showShapesToPickFrom$.next(true);
    }

    hideShapesToPickFrom() {
        this.showShapesToPickFrom$.next(false);
    }
}
