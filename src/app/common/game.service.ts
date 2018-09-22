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
        this.insertStyleForShapes();
    }

    /**
     * @returns CSS style for the shapes used in the shapes-to-pick-from component.
     */
    insertStyleForShapes() {
        for (let i = 0; i < this.numberOfShapes; i++) {
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

    getCurrentShapeIndex() {
        this.currentShapeIndex++;
        return this.currentShapeIndex;
    }

    getShapesToPickFrom() {
        return this.shapesToPickFrom;
    }
}
