import { Component, forwardRef, Inject } from '@angular/core';
import { ValueService } from './value.service';
import { ConversionCardComponent } from './conversion-card/conversion-card.component';
import { Conversion } from './conversion.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  conversions: Conversion[] = new Array();
  constructor(@Inject(forwardRef(() => ValueService))private valueService: ValueService) {
    this.conversions.push({
      from: 'MI',
      to: 'KM',
      formula: (x: number) => { return x / 0.62137; },
      name: 'Miles to Kilometers'
    });
  }

  changeValue(value: number) {
    this.valueService.changeValue(value);
  }
}
