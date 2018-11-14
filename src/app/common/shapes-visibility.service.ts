import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapesVisibilityService {
    private _isShapesToPickFromDisplayed = false;
    private _isShapesToMemorizeDisplayed = false;

    showShapesToPickFrom$ = new Subject<boolean>();
    showShapesToMemorize$ = new Subject<boolean>();

    showShapesToMemorize() {
        this._isShapesToMemorizeDisplayed = true;
        this.showShapesToMemorize$.next(true);
    }

    hideShapesToMemorize() {
        this._isShapesToMemorizeDisplayed = false;
        this.showShapesToMemorize$.next(false);
    }

    showShapesToPickFrom() {
        this._isShapesToPickFromDisplayed = true;
        this.showShapesToPickFrom$.next(true);
    }

    hideShapesToPickFrom() {
        this._isShapesToPickFromDisplayed = false;
        this.showShapesToPickFrom$.next(false);
    }

    public get isShapesToMemorizeDisplayed(): boolean {
        return this._isShapesToMemorizeDisplayed;
    }
    public set isShapesToMemorizeDisplayed(value: boolean) {
        this._isShapesToMemorizeDisplayed = value;
    }

    public get isShapesToPickFromDisplayed(): boolean {
        return this._isShapesToPickFromDisplayed;
    }
    public set isShapesToPickFromDisplayed(value: boolean) {
        this._isShapesToPickFromDisplayed = value;
    }
}
