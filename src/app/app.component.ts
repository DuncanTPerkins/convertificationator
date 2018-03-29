import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inValue: number;
  kil: number;
  cel: number;

  toKm(miles: number) {
    return miles/0.62137
  }

  toCelcius(f: number) {
    return (f-32)/1.8
  }

  evaluateConversions(value: number) {
    this.kil = this.toKm(value);
    this.cel = this.toCelcius(value);
  }
}
