import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniqueIdService {
    nextId = 0;

    constructor() { }

    getNextUniqueId() {
        return this.nextId++;
    }
}
