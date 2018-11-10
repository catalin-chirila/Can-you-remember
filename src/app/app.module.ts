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

@NgModule({
  declarations: [
    AppComponent,
    ShapeComponent,
    ShapesToPickFromComponent,
    ShapesToMemorizeComponent,
    InfoBarComponent,
    LivesComponent,
    TimerComponent,
    LevelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [LevelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
