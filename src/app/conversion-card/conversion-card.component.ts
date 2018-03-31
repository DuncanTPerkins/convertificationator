import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ValueService } from '../value.service';

@Component({
  selector: 'conversion-card',
  templateUrl: './conversion-card.component.html',
  styleUrls: ['./conversion-card.component.css']
})
export class ConversionCardComponent implements OnInit {
  @Input() from: string;
  @Input() to: string;
  @Input() formula: Function;
  @Input() name: string;
  convertedValue: number;
  currentInValue: number;
  constructor(private valueService: ValueService) { }

  ngOnInit() {
    this.valueService.currentValue
    .subscribe(value => {
      this.currentInValue = value;
      this.convertedValue = this.performConversion(value);
    });
  }

  performConversion(value: number) {
    let returnval = this.formula(value);
    return returnval;
  }

}
