import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GameService } from '../common/game.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,  private dialogRef: MatDialogRef<LoginComponent>) {}

  ngOnInit() {}

  login() {
    this.http.post('/api/signin', this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.dialogRef.close();
      this.router.navigate(['game']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
