import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ValueService {
  value = new BehaviorSubject<number>(0);
  currentValue = this.value.asObservable();
  constructor() { }

  changeValue(value: number) {
    this.value.next(value);
  }
}
