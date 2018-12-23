import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TimerService } from '../common/timer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loginData = { username: '', password: '' };
  signupData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router, private timerService: TimerService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit() {
  }

  signup() {
    this.http.post('/api/signup', this.signupData).subscribe(resp => {
      this.data = resp;
      if (!this.data.success) {
        this.message = this.data.msg;
      } else {
        this.http.post('/api/signin', this.signupData).subscribe(res => {
          this.data = res;
          localStorage.setItem('jwtToken', this.data.token);
          this.dialogRef.close();
          this.router.navigate(['game']);
        }, err => {
          this.message = err.error.msg;
        });
      }

    }, err => {
      this.message = err.error.msg;
    });
  }

  playWithoutLogin() {
    this.dialogRef.close();
    this.router.navigate(['game']);
    this.timerService.startTimer(5);
  }
}
