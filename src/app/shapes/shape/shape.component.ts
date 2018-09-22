import { Component, Input} from '@angular/core';
import { UniqueIdService } from '../../common/unique-id.service';
import { GameService } from '../../common/game.service';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.css']
})
export class ShapeComponent {
    @Input()id: number;
    @Input()style: string;
    @Input()type: string;
    @Input()parentClass: string;

    constructor(private gameService: GameService) {}

    test() {
        console.log("test");
    }
}
