import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConversionCollection } from './conversion-collection.model';
import { Conversion } from './conversion.model';
@Injectable()
export class ValueService {
  value = new BehaviorSubject<number>(0);
  currentValue = this.value.asObservable();

  conversions = new BehaviorSubject<Conversion[]>(new Array());
  currentConversions = this.conversions.asObservable();

  conversionCollections = new BehaviorSubject<ConversionCollection[]>(new Array());;
  currentCollection = this.conversionCollections.asObservable();

  constructor() { }

  changeValue(value: number) {
    this.value.next(value);
  }

  updateCollection(collections: ConversionCollection[]) {
    this.conversionCollections.next(collections);
  }

  updateConversions(conversions: Conversion[]) {
    this.conversions.next(conversions);
  }
}
