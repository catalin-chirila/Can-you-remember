import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  loggedUser: String;

  constructor() {
    // this.loggedUser = localStorage.getItem('loggedUser').toUpperCase();
  }

}
