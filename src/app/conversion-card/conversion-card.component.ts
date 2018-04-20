import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ValueService } from '../value.service';
import { Conversion } from '../conversion.model';

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
    let formulaFunction = new Function('x', this.formula);
    return formulaFunction(value);
  }

  removeFavorite() {
    this.valueService.currentConversions.toPromise().then((data: Conversion[]) => {
      let conversion = { from: this.from, to: this.to, formula: this.formula, name: this.name } as Conversion; 
      let newConversions = data.filter(x => x.name != conversion.name);
      newConversions.push(conversion);
      this.valueService.updateConversions(newConversions);
    });
  }

}
