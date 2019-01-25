import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(private http: HttpClient) {}

    saveScore(score: Object): void {
        if (localStorage.getItem('loggedUser')) {
            this.http.post('/api/score', score, {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', localStorage.getItem('jwtToken'))
            }).subscribe(data => {
                // Show a notification -> Score Saved
            }, err => {
                if (err.status === 401) {
                    // Show a notification -> Score couldn't be Saved
                    console.log(err);
                }
            });
        }
    }
}
