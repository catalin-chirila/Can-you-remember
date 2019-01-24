import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LevelService } from './level.service';
import { TimerService } from './timer.service';
import { ShapesVisibilityService } from './shapes-visibility.service';
import { LivesService } from './lives.service';
import { DifficultyService } from './difficulty.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    readonly colors: string[] = ['#C8707E', '#EFB4C1', '#E48E58', '#EDAA7D', '#5AA08D', '#4C92B1', '#AC99C1',
        '#A8C879', '#C8C2BD', '#ADA759'];
    readonly shapes: string[] = ['square', 'rectangle', 'circle', 'triangle-up', 'triangle-left', 'triangle-down', 'triangle-right'];

    totalNumberOfShapes;
    shapesToPickFrom = [];
    shapesToMemorize = [];
    winningShapesIds = [];
    currentWinningShapeId = -1;
    currentWinningShapeIndex = 0;

    shapesToPickFrom$ = new Subject<any[]>();
    shapesToMemorize$ = new Subject<any[]>();
    currentWinningShapeId$ = new Subject<number>();
    questionMarksNumber$ = new Subject<number[]>();
    levelComplete$ = new Subject<boolean>();

    difficultySubscriber: Subscription;

    constructor(private levelService: LevelService,
                private timerService: TimerService,
                private livesService: LivesService,
                private difficultyService: DifficultyService,
                private shapesVisibilityService: ShapesVisibilityService) {

        this.difficultySubscriber = this.difficultyService.difficulty$.subscribe(
            (difficulty) => {
                this.totalNumberOfShapes = difficulty === 'Simple' ? 8 : 12;
            });
        this.resetGame();
    }

    getHiddenShapesToPickFrom() {
        this.shapesToPickFrom = [];
        const shape = {
            'id': 0,
            'type': 'square',
            'color': '#C8C2BD',
            'parentClass' : 'shape-to-pick-from'
        };
        shape['style'] = {'background-color': '#C8C2BD'};

        const shapes = [];
        for (let i = 1; i <= 4; i++ ) {
            shapes.push(shape);
        }
        return shapes;
    }

    populateShapesToPickFrom() {
        this.shapesToPickFrom = [];
        let id = 1;

        while (this.shapesToPickFrom.length < this.totalNumberOfShapes) {
            const shape = {
                'id': id,
                'type': this.shapes[Math.floor(Math.random() * (this.shapes.length))],
                'color': this.colors[Math.floor(Math.random() * (this.colors.length))],
                'parentClass' : 'shape-to-pick-from'
            };

            if (!this.alreadyExistsInShapesToPickFrom(shape)) {
                this.shapesToPickFrom.push(shape);
                id++;
            }
        }
        this.insertStyleForShapesToPickFrom();
        this.shapesToPickFrom$.next(this.shapesToPickFrom);
    }

    insertStyleForShapesToPickFrom() {
        for (let i = 0; i < this.shapesToPickFrom.length; i++) {
            const shape = this.shapesToPickFrom[i];
            if (shape.type === 'triangle-up') {
                shape['style'] = {'border-bottom-color': shape.color};
            } else if (shape.type === 'triangle-left') {
                shape['style'] = {'border-right-color': shape.color};
            } else if (shape.type === 'triangle-right') {
                shape['style'] = {'border-left-color': shape.color};
            } else if (shape.type === 'triangle-down') {
                shape['style'] = {'border-top-color': shape.color};
            } else {
                shape['style'] = {'background-color': shape.color};
            }
        }
    }

    populateShapesToMemorize() {
        const amount = this.levelService.getAmountOfShapes();
        this.shapesToMemorize = [];
        while (this.shapesToMemorize.length < amount) {
            const winningShape = Object.assign({}, this.shapesToPickFrom[Math.floor(Math.random() * (this.shapesToPickFrom.length))]) ;

            if (!this.alreadyExistsInShapesToMemorize(winningShape)) {
                this.shapesToMemorize.push(winningShape);
            }
        }
        this.insertStyleForShapesToMemorize();

        this.winningShapesIds = [];

        for (let i = 0; i < this.shapesToMemorize.length; i++) {
            this.winningShapesIds.push(this.shapesToMemorize[i].id);
        }

        this.currentWinningShapeId = this.winningShapesIds[0];
        this.currentWinningShapeIndex = 0;
        this.shapesToMemorize$.next(this.shapesToMemorize);
    }

    insertStyleForShapesToMemorize() {
        for (let i = 0; i < this.shapesToMemorize.length; i++) {
            const shape = this.shapesToMemorize[i];
            if (shape.type === 'triangle-up') {
                shape['style'] = {'border-bottom-color': shape.color};
            } else if (shape.type === 'triangle-left') {
                shape['style'] = {'border-right-color': shape.color};
            }  else if (shape.type === 'triangle-right') {
                shape['style'] = {'border-left-color': shape.color};
            } else if (shape.type === 'triangle-down') {
                shape['style'] = {'border-top-color': shape.color};
            } else {
                shape['style'] = {'background-color': shape.color};
            }
        }
        for (let i = 0; i < this.shapesToMemorize.length; i++) {
            this.shapesToMemorize[i].parentClass = 'shape-to-memorize';
        }
    }

    alreadyExistsInShapesToPickFrom(shape) {
        for (let i = 0; i < this.shapesToPickFrom.length; i++) {
            if (this.shapesToPickFrom[i].type === shape.type && this.shapesToPickFrom[i].color === shape.color) {
                return true;
            }
        }
        return false;
    }

    alreadyExistsInShapesToMemorize(shape) {
        for (let i = 0; i < this.shapesToMemorize.length; i++) {
            if (this.shapesToMemorize[i].type === shape.type && this.shapesToMemorize[i].color === shape.color) {
                return true;
            }
        }
        return false;
    }

    updateGame() {
        if (this.isEndOfLevel()) {
            this.levelComplete$.next(true);
            this.updateQuestionMarksNumber(false);
            setTimeout(() => {
                this.switchToNextLevel();
                this.levelComplete$.next(false);
            }
            , 3000);
        } else {
            this.updateQuestionMarksNumber(false);
            this.loadNextWinningShapeId();
        }
    }

    switchToNextLevel() {
        this.timerService.startTimer(5);
        this.levelService.increaseLevel();
        this.populateShapesToPickFrom();
        this.populateShapesToMemorize();
        this.shapesVisibilityService.showShapesToMemorize();
        this.shapesVisibilityService.hideShapesToPickFrom();
        this.updateQuestionMarksNumber(true);
    }

    loadNextWinningShapeId(): void {
        this.currentWinningShapeIndex += 1;
        this.currentWinningShapeId = this.winningShapesIds[this.currentWinningShapeIndex];
    }

    isEndOfLevel(): boolean {
        if (this.winningShapesIds.indexOf(this.currentWinningShapeId) === this.winningShapesIds.length - 1) {
            return true;
        }
        return false;
    }

    updateQuestionMarksNumber(isLevelAtBeggining: boolean): void {
        const questionMarks = [];
        let numberOfQuestionMarks;

        if (isLevelAtBeggining) {
            numberOfQuestionMarks = this.levelService.getAmountOfShapes();
        } else {
            numberOfQuestionMarks = this.levelService.getAmountOfShapes() - this.winningShapesIds.indexOf(this.currentWinningShapeId) - 1;
        }

        console.log('Number of Question marks: ' + numberOfQuestionMarks);
        for (let i = 0; i < numberOfQuestionMarks; i++) {
            questionMarks.push(0);
        }
        this.questionMarksNumber$.next(questionMarks);
    }

    getCurrentWinningShapeId(): number {
        return this.currentWinningShapeId;
    }

    getShapesToPickFrom() {
        return this.shapesToPickFrom;
    }

    getShapesToMemorize() {
        return this.shapesToMemorize;
    }

    resetTotalNumberOfShapes() {
        if (localStorage.getItem('difficulty')) {
            this.totalNumberOfShapes = localStorage.getItem('difficulty') === 'Simple' ? 8 : 12;
        } else {
            this.totalNumberOfShapes = 8;
        }
    }

    resetGame(): void {
        this.resetTotalNumberOfShapes();
        this.levelService.resetLevel();
        this.livesService.resetLives();
        this.populateShapesToPickFrom();
        this.populateShapesToMemorize();
        this.shapesVisibilityService.showShapesToMemorize();
        this.shapesVisibilityService.hideShapesToPickFrom();
        this.updateQuestionMarksNumber(true);
        this.timerService.clearOutTimeInterval();
        this.timerService.startTimer(5);
    }

}
