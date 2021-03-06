import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { LevelService } from '../common/level.service';

@Component({
    selector: 'app-level',
    templateUrl: './level.component.html',
    styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnDestroy {
    level = 1;
    levelSubscription: Subscription;

    constructor(private levelService: LevelService) {
        this.levelSubscription = this.levelService.level$.subscribe(
            (level) => {this.level = level; });
    }

    ngOnDestroy(): void {
        this.levelSubscription.unsubscribe();
    }
}
