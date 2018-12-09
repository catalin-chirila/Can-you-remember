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
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { BookComponent } from './book/book.component';
import { PlayComponent } from './play/play.component';


const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  { path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component:  MenuComponent,
    data: { title: 'Menu' }
  },
  {
    path: 'game',
    component:  GameComponent,
    data: { title: 'Game' }
  }
];

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
    MenuComponent,
    LoginComponent,
    SignupComponent,
    BookComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // RouterModule.forRoot([
    //   { path: 'menu', component: MenuComponent},
    //   { path: 'game', component: GameComponent},
    //   { path: '', redirectTo: 'menu', pathMatch: 'full'},
    //   { path: '**', redirectTo: 'menu', pathMatch: 'full'}
    // ])
  ],
  providers: [LevelService],
  bootstrap: [AppComponent],
  entryComponents: [GameOverComponent, PlayComponent]
})
export class AppModule { }
