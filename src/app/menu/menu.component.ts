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
  colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x = 225;
  y = 225;

  constructor(private gameService: GameService, private timerService: TimerService, private dialogService: DialogService) {
    this.timerService.clearOutTimeInterval();
  }

  play() {
    this.dialogService.openLoginDialog();
  }

  openHighScore() {
    this.dialogService.openHighScoreDialog();
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // this.drawCircle();
    // this.drawRectangle();
    // this.drawTriangle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.width = event.target.innerWidth;
    this.canvas.height = event.target.innerHeight;

    this.drawCircle();
  }

  drawCircle() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // draw the circle
    this.ctx.beginPath();

    const radius = 75;

    this.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
    this.ctx.closePath();

    // color in the circle
    this.ctx.fillStyle = '#006699';
    this.ctx.fill();

    this.x += 2;
    this.y += 2;

    window.requestAnimationFrame(this.drawCircle.bind(this));
  }

  drawRectangle() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fillRect(this.x - 65, this.y - 65, 100, 100);

    this.ctx.fillStyle = '#006699';
    this.ctx.fill();

    window.requestAnimationFrame(this.drawRectangle.bind(this));
  }

  drawTriangle() {
    this.ctx.beginPath();
    this.ctx.moveTo(600, 0);
    this.ctx.lineTo(500, 200);
    this.ctx.lineTo(700, 200);
    this.ctx.closePath();

    // the fill color
    this.ctx.fillStyle = '#FFCC00';
    this.ctx.fill();

    window.requestAnimationFrame(this.drawTriangle.bind(this));
  }
}
