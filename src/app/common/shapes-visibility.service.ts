import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapesVisibilityService {
    private isShapesToPickSectionDisplayed = false;
    private isShapesToMemorizeSectionDisplayed = false;
    showShapesToPickSection$ = new Subject<boolean>();
    showShapesToMemorizeSection$ = new Subject<boolean>();

    showShapesToMemorize(): void {
        this.isShapesToMemorizeSectionDisplayed = true;
        this.showShapesToMemorizeSection$.next(true);
    }

    hideShapesToMemorize(): void {
        this.isShapesToMemorizeSectionDisplayed = false;
        this.showShapesToMemorizeSection$.next(false);
    }

    showShapesToPickFrom(): void {
        this.isShapesToPickSectionDisplayed = true;
        this.showShapesToPickSection$.next(true);
    }

    hideShapesToPickFrom(): void {
        this.isShapesToPickSectionDisplayed = false;
        this.showShapesToPickSection$.next(false);
    }

    public get isShapesToMemorizeDisplayed(): boolean {
        return this.isShapesToMemorizeSectionDisplayed;
    }

    public get isShapesToPickFromDisplayed(): boolean {
        return this.isShapesToPickSectionDisplayed;
    }
}
