import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShapeComponent } from './shapes/shape/shape.component';
import { ShapesToPickFromComponent } from './shapes/shapes-to-pick-from/shapes-to-pick-from.component';
import { ShapesToMemorizeComponent } from './shapes/shapes-to-memorize/shapes-to-memorize.component';


@NgModule({
  declarations: [
    AppComponent,
    ShapeComponent,
    ShapesToPickFromComponent,
    ShapesToMemorizeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
