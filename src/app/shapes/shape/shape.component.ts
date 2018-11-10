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
        if (this.parentClass === 'shape-to-pick-from') {
            if (this.id === this.gameService.getCurrentWinningShapeId()) {
                this.isHidden = true;
                this.gameService.updateGame();
            } else {
                this.livesService.decreaseLives();
            }
        }
    }
}
