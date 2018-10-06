import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    readonly colors: string[] = ['#C8707E', '#EFB4C1', '#E48E58', '#EDAA7D', '#5AA08D', '#4C92B1', '#AC99C1',
        '#A8C879', '#C8C2BD', '#ADA759'];
    readonly shapes: string[] = ['square', 'rectangle', 'circle', 'triangle-up', 'triangle-left', 'triangle-down', 'triangle-right'];

    totalNumberOfShapes = 12;
    shapesToPickFrom = [];
    shapesToMemorize = [];
    winningShapesIds = [];
    currentWinningShapeId = -1;
    currentWinningShapeIndex = 0;

    shapesToPickFromSubject = new Subject<any[]>();
    shapesToMemorizeSubject = new Subject<any[]>();

    constructor() {
        this.populateShapesToPickFrom();
        this.populateShapesToMemorize();

        this.shapesToPickFromSubject.next(this.shapesToPickFrom);
        this.shapesToMemorizeSubject.next(this.shapesToMemorize);
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
    }

    /**
     * @returns CSS style for the shapes used in the shapes-to-pick-from component.
     */
    insertStyleForShapesToPickFrom() {
        for (let i = 0; i < this.shapesToPickFrom.length; i++) {
            if (this.shapesToPickFrom[i].type === 'triangle-up') {
                const borderStyle = 'var(--triangle-biggest-border) solid ' + this.shapesToPickFrom[i].color;
                this.shapesToPickFrom[i]['style'] = {'border-bottom': borderStyle};
            } else if (this.shapesToPickFrom[i].type === 'triangle-left') {
                const borderStyle = 'var(--triangle-biggest-border) solid ' + this.shapesToPickFrom[i].color;
                this.shapesToPickFrom[i]['style'] = {'border-right': borderStyle};
            } else if (this.shapesToPickFrom[i].type === 'triangle-right') {
                const borderStyle = 'var(--triangle-biggest-border) solid ' + this.shapesToPickFrom[i].color;
                this.shapesToPickFrom[i]['style'] = {'border-left': borderStyle};
            } else if (this.shapesToPickFrom[i].type === 'triangle-down') {
                const borderStyle = 'var(--triangle-biggest-border) solid ' + this.shapesToPickFrom[i].color;
                this.shapesToPickFrom[i]['style'] = {'border-top': borderStyle};
            } else {
                this.shapesToPickFrom[i]['style'] = {'background-color': this.shapesToPickFrom[i].color};
            }
        }
    }

    populateShapesToMemorize() {
        this.shapesToMemorize = [];
        while (this.shapesToMemorize.length < 2) {
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
    }

    insertStyleForShapesToMemorize() {
        for (let i = 0; i < this.shapesToMemorize.length; i++) {
            if (this.shapesToMemorize[i].type === 'triangle-up') {
                this.shapesToMemorize[i]['style'] = {
                    'border-left': '40px solid transparent',
                    'border-right': '40px solid transparent',
                    'border-bottom': '80px solid ' + this.shapesToMemorize[i].color
                };
            } else if (this.shapesToMemorize[i].type === 'triangle-left') {
                this.shapesToMemorize[i]['style'] = {
                    'border-top': '40px solid transparent',
                    'border-bottom': '40px solid transparent',
                    'border-right': '80px solid ' + this.shapesToMemorize[i].color
                };
            } else if (this.shapesToMemorize[i].type === 'triangle-right') {
                this.shapesToMemorize[i]['style'] = {
                    'border-top': '40px solid transparent',
                    'border-bottom': '40px solid transparent',
                    'border-left': '80px solid ' + this.shapesToMemorize[i].color
                };
            } else if (this.shapesToMemorize[i].type === 'triangle-down') {
                this.shapesToMemorize[i]['style'] = {
                    'border-left': '40px solid transparent',
                    'border-right': '40px solid transparent',
                    'border-top': '80px solid ' + this.shapesToMemorize[i].color
                };
            } else {
                this.shapesToMemorize[i]['style'] = { 'background-color': this.shapesToMemorize[i].color };
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

    isEndOfLevel(): boolean {
        if (this.winningShapesIds.indexOf(this.currentWinningShapeId) === this.winningShapesIds.length - 1) {
            return true;
        }

        return false;
    }

    updateGame() {
        if (this.isEndOfLevel()) {
            this.populateShapesToPickFrom();
            this.populateShapesToMemorize();
            console.log('test');

            this.shapesToPickFromSubject.next(this.shapesToPickFrom);
            this.shapesToMemorizeSubject.next(this.shapesToMemorize);
            this.resetWinningShapeIndex();
        }

        this.loadNextWinningShapeId();
    }

    resetWinningShapeIndex() {
        this.currentWinningShapeIndex = 0;
    }

    loadNextWinningShapeId(): void {
        this.currentWinningShapeIndex += 1;
        this.currentWinningShapeId = this.winningShapesIds[this.currentWinningShapeIndex];
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
}

