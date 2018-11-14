import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ShapeComponent } from './shapes/shape/shape.component';
import { ShapesToPickFromComponent } from './shapes/shapes-to-pick-from/shapes-to-pick-from.component';
import { ShapesToMemorizeComponent } from './shapes/shapes-to-memorize/shapes-to-memorize.component';
import { LivesComponent } from './info-bar/lives/lives.component';
import { TimerComponent } from './info-bar/timer/timer.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { LevelComponent } from './level/level.component';
import { LevelService } from './common/level.service';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { GameOverComponent } from './game-over/game-over.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShapesVisibilityService } from './common/shapes-visibility.service';

@NgModule({
  declarations: [
    AppComponent,
    ShapeComponent,
    ShapesToPickFromComponent,
    ShapesToMemorizeComponent,
    InfoBarComponent,
    LivesComponent,
    TimerComponent,
    LevelComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [LevelService],
  bootstrap: [AppComponent],
  entryComponents: [GameOverComponent]
})
export class AppModule { }
