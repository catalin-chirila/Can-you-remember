import { Component, Input, OnDestroy } from '@angular/core';
import { GameService } from '../../common/game.service';
import { LivesService } from '../../common/lives.service';
import { Subscription } from 'rxjs';
import { ShapesVisibilityService } from 'src/app/common/shapes-visibility.service';
import { DialogService } from 'src/app/common/dialog.service';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.scss']
})
export class ShapeComponent {
    @Input() id: number;
    @Input() style: string;
    @Input() type: string;
    @Input() parentClass: string;
    showShapesToPickFromSub: Subscription;
    showShapesToPickFrom = false;
    isHidden = false;

    constructor(private gameService: GameService,
        private dialogService: DialogService,
        private livesService: LivesService,
        private shapesVisibilityService: ShapesVisibilityService) {
    }

    updateGame() {
        if (this.isDisplayedShapeToPickFrom()) {
            if (this.id === this.gameService.getCurrentWinningShapeId()) {
                this.isHidden = true;
                this.gameService.updateGame();
            } else {
                this.livesService.decreaseLives();
                if (this.livesService.getRemainingLives() <= 0) {
                    this.dialogService.openGameOverDialog();
                }
            }
        }
    }

    isDisplayedShapeToPickFrom(): boolean {
        if (this.parentClass === 'shape-to-pick-from' && this.shapesVisibilityService.isShapesToPickFromDisplayed) {
            return true;
        }
        return false;
    }
}
