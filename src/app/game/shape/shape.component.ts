import { Component, Input } from '@angular/core';
import { GameService } from '../../common/game.service';
import { LivesService } from '../../common/lives.service';
import { SectionVisibilityService } from 'src/app/common/section-visibility.service';
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
    isHidden = false;
    isClickable = true;

    constructor(private gameService: GameService,
        private dialogService: DialogService,
        private livesService: LivesService,
        private levelService: LevelService,
        private shapesVisibilityService: SectionVisibilityService) {
    }

    updateGame(): void {
        if (this.isShapesToPickSectionDisplayed()) {
            const isCurrentShapeWinning = (this.id === this.gameService.getCurrentWinningShapeId());

            if (isCurrentShapeWinning) {
                this.isClickable = false;
                this.animateCurrentWinningShape();
                this.gameService.updateGame();
            } else {
                this.animateCurrentLosingShape();
                this.livesService.decreaseLives();
                this.checkGameOver();
            }
        }
    }

    private isShapesToPickSectionDisplayed(): boolean {
        if (this.parentClass === 'shape-to-pick-from' && this.shapesVisibilityService.isShapesToPickFromDisplayed) {
            return true;
        }

        return false;
    }

    private checkGameOver(): void {
        if (this.livesService.getRemainingLives() <= 0) {
            this.levelService.saveScore();
            this.dialogService.openGameOverDialog();
        }
    }

    private animateCurrentWinningShape(): void {
        const shape = document.getElementById(this.id.toString());
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

    private animateCurrentLosingShape(): void {
        const shape = document.getElementById(this.id.toString());

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
