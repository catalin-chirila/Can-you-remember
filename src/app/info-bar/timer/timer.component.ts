import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from 'src/app/common/timer.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
  })
export class TimerComponent {
  timeLeft = 5;
  timeSubscriber: Subscription;

  constructor(private timerService: TimerService) {
    this.timeSubscriber = this.timerService.time$.subscribe(
      (timeLeft) => {this.timeLeft = timeLeft; });
  }
}
