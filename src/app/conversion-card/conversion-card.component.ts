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
  @Input() formula: string;
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
    console.log(this.formula);
    let formulaFunction = new Function('x', this.formula);
    return formulaFunction(value);
  }

}
