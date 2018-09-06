import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShapeComponent } from './shapes/shape.component';
import { ShapeListComponent } from './shapes/shape-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ShapeListComponent,
    ShapeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ShapeListComponent]
})
export class AppModule { }
