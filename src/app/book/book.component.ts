import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: any;

  constructor(private http: HttpClient, private router: Router) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/api/book', httpOptions).subscribe(data => {
      this.books = data;
      console.log(this.books);
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/api/book', httpOptions).subscribe(data => {
      this.books = data;
      console.log(this.books);
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

}
