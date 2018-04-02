import { Component, forwardRef, Inject, ViewChild, Renderer2 } from '@angular/core';
import { ValueService } from './value.service';
import { ConversionCardComponent } from './conversion-card/conversion-card.component';
import { Conversion } from './conversion.model';
import { AddToFavoritesDialogComponent } from './add-to-favorites-dialog/add-to-favorites-dialog.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  conversions: Conversion[] = new Array();
  @ViewChild('valueField')valueField: any
  constructor(private valueService: ValueService, private dialog: MatDialog) {
    this.conversions.push({
      from: 'MI',
      to: 'KM',
      formula: x => x / 0.62137,
      name: 'Miles to Kilometers'
    },
    {
      from: 'C',
      to: 'F',
      formula: x => x * 1.8 + 32,
      name: 'Celsius to Fahrenheit'
    });
  }

  changeValue(value: number) {
    this.valueService.changeValue(value);
  }

  addToFavorites() {
    let dialogRef = this.dialog.open(AddToFavoritesDialogComponent, {
      height: '80%',
      width: '80%'
    });
  }
}
