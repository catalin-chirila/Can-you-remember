import { Component, Input} from '@angular/core';
import { GameService } from '../../common/game.service';
import { LivesService } from '../../common/lives.service';

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
    isHidden = false;

    constructor(private gameService: GameService, private livesService: LivesService) {}

    updateGame() {
        // console.log('This Id: ' + this.id + ' GameService Current Id: ' + this.gameService.getCurrentWinningShapeId());
        if (this.id === this.gameService.getCurrentWinningShapeId()) {
            this.isHidden = true;
            this.gameService.updateGame();
            // console.log('Update');
        } else {
            this.livesService.decreaseLives();
        }
    }
}
