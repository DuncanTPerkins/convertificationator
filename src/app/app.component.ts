import { Component, forwardRef, Inject, ViewChild, Renderer2 } from '@angular/core';
import { ValueService } from './value.service';
import { ConversionCardComponent } from './conversion-card/conversion-card.component';
import { Conversion } from './conversion.model';
import { AddToFavoritesDialogComponent } from './add-to-favorites-dialog/add-to-favorites-dialog.component';
import { MatDialog } from '@angular/material';
import { DatabaseService } from './database.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('valueField')valueField: any
  constructor(private valueService: ValueService, private dialog: MatDialog, private db: DatabaseService) {}

  changeValue(value: number) {
    this.valueService.changeValue(value);
  }

  addToFavorites() {
    let dialogRef = this.dialog.open(AddToFavoritesDialogComponent, {
      height: '50%',
      width: '50%',
      data: {
        conversions: [{from: 'Miles', to: ['Meters', 'Kilometers', 'Parsecs']},
                      {from: 'Fahrenheit', to: ['Celcius', 'Kelvin']}]
        }
      });
    }
  }
