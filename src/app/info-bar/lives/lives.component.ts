import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { LivesService } from '../../common/lives.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-lives',
    templateUrl: './lives.component.html',
    styleUrls: ['./lives.component.css']
})
export class LivesComponent implements OnDestroy {
    lives = 5;
    livesSubscription: Subscription;

    constructor(private livesService: LivesService) {
        this.livesSubscription = this.livesService.livesSubject.subscribe(
            (livesLeft) => {this.lives = livesLeft; });
    }

    ngOnDestroy(): void {
        this.livesSubscription.unsubscribe();
    }
}
