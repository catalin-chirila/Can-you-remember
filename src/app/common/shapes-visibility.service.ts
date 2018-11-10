import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapesVisibilityService {
    showShapesToPickFromSubject = new Subject<boolean>();
    showShapesToMemorizeSubject = new Subject<boolean>();

    showShapesToMemorize() {
        this.showShapesToMemorizeSubject.next(true);
    }

    hideShapesToMemorize() {
        this.showShapesToMemorizeSubject.next(false);
    }

    showShapesToPickFrom() {
        this.showShapesToPickFromSubject.next(true);
    }

    hideShapesToPickFrom() {
        this.showShapesToPickFromSubject.next(false);
    }
}
