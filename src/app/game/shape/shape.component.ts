import { Component, Input } from '@angular/core';
import { GameService } from '../../common/game.service';
import { LivesService } from '../../common/lives.service';
import { Subscription } from 'rxjs';
import { ShapesVisibilityService } from 'src/app/common/shapes-visibility.service';
import { DialogService } from 'src/app/common/dialog.service';
import { LevelService } from 'src/app/common/level.service';
import * as anime from 'animejs';

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
        private levelService: LevelService,
        private shapesVisibilityService: ShapesVisibilityService) {
    }

    updateGame() {
        if (this.isDisplayedShapeToPickFrom()) {
            if (this.id === this.gameService.getCurrentWinningShapeId()) {
                this.gameService.updateGame();
                this.animateWinningShape(this.id);
            } else {
                this.animateLosingShape(this.id);
                this.livesService.decreaseLives();
                if (this.livesService.getRemainingLives() <= 0) {
                    this.levelService.saveScore();
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

    animateWinningShape(shapeId: Number) {
        const shape = document.getElementById(shapeId.toString());
        anime({
            targets: shape,
            translateY: 200,
            opacity: 0,
            duration: 2000,
            easing: 'easeInOutBack',
            rotate: '1turn',
            complete: () => this.isHidden = true
        });
    }

    animateLosingShape(shapeId: Number) {
        const shape = document.getElementById(shapeId.toString());

        const tl = anime.timeline({
            easing: 'linear'
        });

        tl
        .add({
            targets: shape,
            translateX: 20,
            duration: 100,
        })
        .add({
            targets: shape,
            translateX: -20,
            duration: 100,
        })
        .add({
            targets: shape,
            translateX: 20,
            duration: 100,
        })
        .add({
            targets: shape,
            translateX: -20,
            duration: 100,
        })
        .add({
            targets: shape,
            translateX: 0,
            duration: 100
        });
    }

}
