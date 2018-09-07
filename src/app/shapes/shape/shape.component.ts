import { Component, Input} from '@angular/core';
import { UniqueIdService } from '../../common/unique-id.service';
import { GameService } from '../../common/game.service';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.css']
})
export class ShapeComponent {
    readonly colors: string[] = ['#C8707E', '#EFB4C1', '#E48E58', '#EDAA7D', '#5AA08D', '#4C92B1', '#AC99C1',
        '#A8C879', '#C8C2BD', '#ADA759'];
    readonly shapes: string[] = ['square', 'rectangle', 'circle', 'triangle-up', 'triangle-left', 'triangle-down', 'triangle-right'];

    @Input()displayType: string;
    id = this.uniqueIdService.getNextUniqueId();
    color: string;
    type: string;
    shapesToPickFromStyle: Object;


    serviceShape = this.gameService.shapesToPickFrom[0];

    constructor(private uniqueIdService: UniqueIdService, private gameService: GameService) {
        // this.color = this.colors[Math.floor(Math.random() * (this.colors.length))];
        // this.type = this.shapes[Math.floor(Math.random() * (this.shapes.length))];
        this.color = this.serviceShape['color'];
        this.type = this.serviceShape['type'];
    }

    /**
     * @returns CSS style for the shapes used in the shapes-to-pick-from component.
     */
    getShapesToPickFromStyle() {
        if (this.type === 'triangle-up') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' + this.color;
            return { 'border-bottom': borderStyle };
        } else if (this.type === 'triangle-left') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' + this.color;
            return { 'border-right': borderStyle };
        } else if (this.type === 'triangle-right') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' + this.color;
            return { 'border-left': borderStyle };
        } else if (this.type === 'triangle-down') {
            const borderStyle = 'var(--triangle-biggest-border) solid ' + this.color;
            return { 'border-top': borderStyle };
        } else {
            return { 'background-color': this.color };
        }
    }

    /**
     * @returns CSS style for the shapes used in the shapes-to-memorize component.
     */
    getShapesToMemorizeStyle() {
        if (this.type === 'triangle-up') {
            return {
                'border-left': '40px solid transparent',
                'border-right': '40px solid transparent',
                'border-bottom': '80px solid ' + this.color
            };
        } else if (this.type === 'triangle-left') {
            return {
                'border-top': '40px solid transparent',
                'border-bottom': '40px solid transparent',
                'border-right': '80px solid ' + this.color
            };
        } else if (this.type === 'triangle-right') {
            return {
                'border-top': '40px solid transparent',
                'border-bottom': '40px solid transparent',
                'border-left': '80px solid ' + this.color
            };
        } else if (this.type === 'triangle-down') {
            return {
                'border-left': '40px solid transparent',
                'border-right': '40px solid transparent',
                'border-top': '80px solid ' + this.color
            };
        } else {
            return { 'background-color': this.color };
        }
    }

    /**
     * @returns CSS class which alters the size of a shape
     * depending on where the shape is displayed (in the Memorizing component or in the Shape Picking one).
     */
    getShapeWrapperCssClass(): string {
        return this.displayType === 'shapesToPickFrom' ? 'shape-to-pick-from' : 'shape-to-memorize';
    }

    /**
     * @returns CSS style which alters the size of a shape
     * depending on where the shape is displayed (in the Memorizing component or in the Shape Picking one).
     */
    getShapeStyle(): object {
        return this.displayType === 'shapesToPickFrom' ?  this.getShapesToPickFromStyle() : this.getShapesToMemorizeStyle();
    }
}
