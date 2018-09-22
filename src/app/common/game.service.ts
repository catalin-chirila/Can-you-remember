import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    readonly colors: string[] = ['#C8707E', '#EFB4C1', '#E48E58', '#EDAA7D', '#5AA08D', '#4C92B1', '#AC99C1',
        '#A8C879', '#C8C2BD', '#ADA759'];
    readonly shapes: string[] = ['square', 'rectangle', 'circle', 'triangle-up', 'triangle-left', 'triangle-down', 'triangle-right'];

    numberOfShapes = 12;
    shapesToPickFrom = [];
    winningShapes = [];
    currentWinningShapeId = -1;
    level: number;

    currentShapeIndex = 0;

    constructor() {
        this.populateShapesToPickFrom();
        this.populateShapesToShapesToMemorize();
    }

    populateShapesToPickFrom() {
        for (let i = 0; i < this.numberOfShapes; i++) {
            this.shapesToPickFrom.push({
                'id': i + 1,
                'type': this.shapes[Math.floor(Math.random() * (this.shapes.length))],
                'color': this.colors[Math.floor(Math.random() * (this.colors.length))],
                'parentClass' : 'shape-to-pick-from'
            });
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

    getShapesToPickFrom() {
        return this.shapesToPickFrom;
    }

    getShapesToMemorize() {
        return this.winningShapes;
    }

    populateShapesToShapesToMemorize() {
        this.winningShapes = [];
        while (this.winningShapes.length < 2) {
            const winningShape = Object.assign({}, this.shapesToPickFrom[Math.floor(Math.random() * (this.shapesToPickFrom.length))]) ;

            if (!this.alreadyExistsInWinningShapes(winningShape)) {
                this.winningShapes.push(winningShape);
            }
        }
        this.insertStyleForWinningShapes();
    }

    insertStyleForWinningShapes() {
        for (let i = 0; i < this.winningShapes.length; i++) {
            if (this.winningShapes[i].type === 'triangle-up') {
                this.winningShapes[i]['style'] = {
                    'border-left': '40px solid transparent',
                    'border-right': '40px solid transparent',
                    'border-bottom': '80px solid ' + this.winningShapes[i].color
                };
            } else if (this.winningShapes[i].type === 'triangle-left') {
                this.winningShapes[i]['style'] = {
                    'border-top': '40px solid transparent',
                    'border-bottom': '40px solid transparent',
                    'border-right': '80px solid ' + this.winningShapes[i].color
                };
            } else if (this.winningShapes[i].type === 'triangle-right') {
                this.winningShapes[i]['style'] = {
                    'border-top': '40px solid transparent',
                    'border-bottom': '40px solid transparent',
                    'border-left': '80px solid ' + this.winningShapes[i].color
                };
            } else if (this.winningShapes[i].type === 'triangle-down') {
                this.winningShapes[i]['style'] = {
                    'border-left': '40px solid transparent',
                    'border-right': '40px solid transparent',
                    'border-top': '80px solid ' + this.winningShapes[i].color
                };
            } else {
                this.winningShapes[i]['style'] = { 'background-color': this.winningShapes[i].color };
            }
        }
        for (let i = 0; i < this.winningShapes.length; i++) {
            this.winningShapes[i].parentClass = 'shape-to-memorize';
        }
    }

    alreadyExistsInWinningShapes(shape) {
        for (let i = 0; i < this.winningShapes.length; i++) {
            if (this.winningShapes[i].type === shape.type && this.winningShapes[i].color === shape.color) {
                return true;
            }
        }
        return false;
    }
}

