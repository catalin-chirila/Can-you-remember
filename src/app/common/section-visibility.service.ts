import { Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionVisibilityService {
    private _isShapesToPickSectionDisplayed = false;
    private _isShapesToMemorizeSectionDisplayed = false;
    private _showShapesToPickSection$ = new Subject<boolean>();
    private _showShapesToMemorizeSection$ = new Subject<boolean>();

    showShapesToMemorize(): void {
        this._isShapesToMemorizeSectionDisplayed = true;
        this._showShapesToMemorizeSection$.next(true);
    }

    hideShapesToMemorize(): void {
        this._isShapesToMemorizeSectionDisplayed = false;
        this._showShapesToMemorizeSection$.next(false);
    }

    showShapesToPickFrom(): void {
        this._isShapesToPickSectionDisplayed = true;
        this._showShapesToPickSection$.next(true);
    }

    hideShapesToPickFrom(): void {
        this._isShapesToPickSectionDisplayed = false;
        this._showShapesToPickSection$.next(false);
    }

    get isShapesToPickSectionDisplayed(): boolean {
        return this._isShapesToPickSectionDisplayed;
    }

    get isShapesToMemorizeSectionDisplayed(): boolean {
        return this._isShapesToMemorizeSectionDisplayed;
    }

    get showShapesToPickSection$(): Observable<boolean> {
        return this._showShapesToPickSection$.asObservable();
    }

    get showShapesToMemorizeSection$(): Observable<boolean> {
        return this._showShapesToMemorizeSection$.asObservable();
    }
}
