import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ShapeComponent } from './game/shape/shape.component';
import { ShapesToPickFromComponent } from './game/shapes-to-pick-from/shapes-to-pick-from.component';
import { ShapesToMemorizeComponent } from './game/shapes-to-memorize/shapes-to-memorize.component';
import { LivesComponent } from './info-bar/lives/lives.component';
import { TimerComponent } from './info-bar/timer/timer.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { LevelComponent } from './level/level.component';
import { LevelService } from './common/level.service';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { GameOverComponent } from './game-over/game-over.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';

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
    GameOverComponent,
    GameComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'menu', component: MenuComponent},
      { path: 'game', component: GameComponent},
      { path: '', redirectTo: 'menu', pathMatch: 'full'},
      { path: '**', redirectTo: 'menu', pathMatch: 'full'}
    ])
  ],
  providers: [LevelService],
  bootstrap: [AppComponent],
  entryComponents: [GameOverComponent]
})
export class AppModule { }
