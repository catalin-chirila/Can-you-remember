import { Component, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../common/game.service';
import { TimerService } from '../common/timer.service';
import * as anime from 'animejs';
import { DialogService } from '../common/dialog.service';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('stage') canvas;
  cx: CanvasRenderingContext2D;

  colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

  constructor(private gameService: GameService, private timerService: TimerService, private dialogService: DialogService) {
    this.timerService.clearOutTimeInterval();
  }

  play() {
    this.dialogService.openLoginDialog();
  }

  ngAfterViewInit(): void {
    anime({
      targets: '#test',
      translateX: 250,
      delay: 1000
    });
  }



}
