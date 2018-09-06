import { Component } from '@angular/core';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.css']
  })
export class ShapeComponent {
    readonly colors: string[] = ['#C8707E', '#EFB4C1', '#E48E58', '#EDAA7D', '#5AA08D','#4C92B1', '#AC99C1' ,
                                '#A8C879', '#C8C2BD', '#ADA759'];
    readonly shapes: string[] = ['square', 'rectangle', 'circle', 'triangle-up', 'triangle-left', 'triangle-down', 'triangle-right'];

    _winning: boolean;
    _orderId = 1;
    color: string;
    type: string;

    constructor() {
        this.color = this.colors[Math.floor(Math.random() * (this.colors.length))];
        this.type = this.shapes[Math.floor(Math.random() * (this.shapes.length))];
    }

    get winning(): boolean {
        return this._winning;
    }

    set winning(value: boolean) {
        this._winning = value;
    }

    get orderId(): number {
        return this._orderId;
    }

    set orderId(value: number) {
        this._orderId = value;
    }

    getShapeStyle() {
        if (this.type === 'triangle-up') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' +  this.color;
            return {'border-bottom': borderStyle};
        } else if (this.type === 'triangle-left') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' +  this.color;
            return {'border-right': borderStyle};
        } else if (this.type === 'triangle-right') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' +  this.color;
            return {'border-left': borderStyle};
        } else if (this.type === 'triangle-down') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' +  this.color;
            return {'border-top': borderStyle};
        } else {
            return {'background-color': this.color};
        }
    }
}
