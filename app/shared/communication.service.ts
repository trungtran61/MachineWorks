import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class CommunicationService {
    constructor() { }

    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();

    emitChange(data: {}) {
        this.emitChangeSource.next(data);
    }

}