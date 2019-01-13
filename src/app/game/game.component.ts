import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  constructor(private router: Router) {}

  logOut() {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
    }

    if (localStorage.getItem('loggedUser')) {
      localStorage.removeItem('loggedUser');
    }
    this.router.navigate(['menu']);
  }

  isUserLoggedIn(): Boolean {
    return localStorage.getItem('loggedUser') ? true : false;
  }
}

