import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { GameService } from '../common/game.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = { username: '', password: '' };
  message = '';
  data: any;
  signupDialogRef: MatDialogRef<SignupComponent>;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,  private dialogRef: MatDialogRef<LoginComponent>,
    private gameService: GameService) {}

  ngOnInit() {}

  login() {
    this.http.post('/api/signin', this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      localStorage.setItem('loggedUser', this.loginData.username);
      this.dialogRef.close();
      this.router.navigate(['game']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  playWithoutLogin() {
    this.dialogRef.close();
    this.router.navigate(['game']);
  }

  openSignupDialog() {
    this.signupDialogRef = this.dialog.open(SignupComponent, {
        disableClose: false
    });
    this.signupDialogRef.afterClosed().subscribe(() => {
      this.gameService.resetGame();
    });
  }
}
