import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { TimerService } from '../common/timer.service';
import { DialogService } from '../common/dialog.service';
import { Subscription } from 'rxjs';
import { DifficultyService } from '../common/difficulty.service';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  private readonly colors: string[] = ['#C8707E', '#EFB4C1', '#E48E58', '#EDAA7D', '#5AA08D', '#4C92B1', '#AC99C1',
    '#A8C879', '#C8C2BD', '#ADA759'];

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  leftShapes = [];
  rightShapes = [];
  currentShapeIndex = 0;
  interval;
  leftAnimationFrame;
  rightAnimationFrame;
  difficulty: string;
  difficultySubscriber: Subscription;
  loggedUser: String;

  constructor(private timerService: TimerService, private dialogService: DialogService,
    private difficultyService: DifficultyService) {
    this.difficultySubscriber = this.difficultyService.difficulty$.subscribe(
      (difficulty) => { this.difficulty = difficulty; });

    this.loggedUser = localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser') : null;
  }

  play() {
    this.dialogService.openLoginDialog();
  }

  openHighScore() {
    this.dialogService.openHighScoreDialog();
  }

  openDifficulty() {
    this.dialogService.openDifficultyDialog();
  }

  openInstructions() {
    this.dialogService.openInstructionsDialog();
  }

  logOut(): void {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
    }

    if (localStorage.getItem('loggedUser')) {
      localStorage.removeItem('loggedUser');
    }

    window.location.reload();
  }

  ngOnInit(): void {
    const localDifficulty = localStorage.getItem('difficulty');

    if (localDifficulty) {
      this.difficulty = localDifficulty;
    } else {
      localStorage.setItem('difficulty', 'Simple');
      this.difficulty = 'Simple';
    }

    this.timerService.clearOutTimeInterval();
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.generateLeftShapes(3);
    this.generateRightShapes(3);
    this.startAnimation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.width = event.target.innerWidth;
    this.canvas.height = event.target.innerHeight;
    this.clearAnimationFrame();
    clearInterval(this.interval);
    this.leftShapes = [];
    this.rightShapes = [];
    this.generateLeftShapes(3);
    this.generateRightShapes(3);
    this.startAnimation();
  }

  animateLeftCircles(index) {
    this.ctx.beginPath();
    let radius = 65;

    if (window.innerWidth < 500) {
      radius = 15;
    }

    this.ctx.arc(this.leftShapes[index].x, this.leftShapes[index].y, radius, 0, Math.PI * 2, false);
    this.ctx.closePath();

    this.ctx.fillStyle = this.leftShapes[index].color;
    this.ctx.fill();

    this.leftShapes[index].x += 3;
    this.leftShapes[index].y += 3;

    this.leftAnimationFrame = window.requestAnimationFrame(this.animateLeftCircles.bind(this, index));
  }

  animateRightCircles(index) {
    this.ctx.beginPath();
    let radius = 65;

    if (window.innerWidth < 500) {
      radius = 15;
    }

    this.ctx.arc(this.rightShapes[index].x, this.rightShapes[index].y, radius, 0, Math.PI * 2, false);
    this.ctx.closePath();

    this.ctx.fillStyle = this.rightShapes[index].color;
    this.ctx.fill();

    this.rightShapes[index].x -= 3;
    this.rightShapes[index].y -= 3;

    this.rightAnimationFrame = window.requestAnimationFrame(this.animateRightCircles.bind(this, index));
  }

  generateLeftShapes(numberOfShapes: Number): void {
    let y = window.innerHeight - (window.innerHeight / 10);

    for (let i = 0; i < numberOfShapes; i++) {
      const shape = {
        id: i,
        type: 'circle',
        color: this.getUnusedRandomColor(),
        x: -100,
        y: y
      };

      this.leftShapes.push(shape);

      if (window.innerWidth < 500) {
        y -= 50;
      } else {
        y -= 190;
      }
    }
  }

  generateRightShapes(numberOfShapes: Number): void {
    let y = (window.innerHeight / 10);

    for (let i = 0; i < numberOfShapes; i++) {
      const shape = {
        id: i,
        type: 'circle',
        color: this.getUnusedRandomColor(),
        x: window.innerWidth + 100,
        y: y
      };

      this.rightShapes.push(shape);

      if (window.innerWidth < 500) {
        y += 50;
      } else {
        y += 190;
      }

    }
  }

  getUnusedRandomColor(): String {
    let color = this.colors[Math.floor(Math.random() * (this.colors.length))];

    const shapes = this.leftShapes.concat(this.rightShapes);
    const takenColors = [];

    shapes.forEach(e => {
      if (e.color !== undefined) {
        takenColors.push(e.color);
      }
    });

    while (true) {
      if (!takenColors.includes(color)) {
        return color;
      } else {
        color = this.colors[Math.floor(Math.random() * (this.colors.length))];
      }
    }
  }

  startAnimation() {
    this.currentShapeIndex = 0;
    this.animateLeftCircles(this.currentShapeIndex);
    this.animateRightCircles(this.currentShapeIndex);

    this.interval = setInterval(() => {
      if (this.isEndOfAnimation()) {
        this.clearAnimationFrame();
        clearInterval(this.interval);

        return;
      }

      this.clearAnimationFrame();
      this.currentShapeIndex += 1;

      this.animateLeftCircles(this.currentShapeIndex);
      this.animateRightCircles(this.currentShapeIndex);
    }, 3100);

  }

  isEndOfAnimation() {
    if (this.currentShapeIndex === this.leftShapes.length - 1) {
      return true;
    }

    return false;
  }

  clearAnimationFrame() {
    window.cancelAnimationFrame(this.leftAnimationFrame);
    window.cancelAnimationFrame(this.rightAnimationFrame);
  }

}
