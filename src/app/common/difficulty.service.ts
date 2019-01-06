import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService implements OnInit {
    private _difficulty$ = new Subject<string>();

    constructor() { }

    ngOnInit(): void {
    }

    changeDifficulty(difficulty: string) {
        localStorage.setItem('difficulty', difficulty);
        this._difficulty$.next(difficulty);
    }

    public get difficulty$() {
        return this._difficulty$;
    }
}
