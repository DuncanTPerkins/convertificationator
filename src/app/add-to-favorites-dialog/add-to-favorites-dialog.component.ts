import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ConversionCollection } from '../conversion-collection.model';
import { DatabaseService } from '../database.service';
import { Conversion } from '../conversion.model';
import { ValueService } from '../value.service';
@Component({
  selector: 'app-add-to-favorites-dialog',
  templateUrl: './add-to-favorites-dialog.component.html',
  styleUrls: ['./add-to-favorites-dialog.component.css']
})
export class AddToFavoritesDialogComponent implements OnInit {
  conversionCollections: ConversionCollection[] = new Array();
  conversions: Conversion[];
  constructor(private db: DatabaseService, private value: ValueService, private dialog: MatDialogRef<AddToFavoritesDialogComponent>) {
    this.value.currentConversions.subscribe(value => {
      this.conversions = value;
      let usedValues = new Array();
      for(var conversion of this.conversions) {
        if(!usedValues.includes(conversion.from)) {
          usedValues.push(conversion.from);
          var collection = new ConversionCollection();
          collection.conversion = conversion;
          collection.relatedConversions = this.conversions.filter(x => x.from == conversion.from);
          this.conversionCollections.push(collection);
        }
      }
    });
  }

  saveChanges() {
    this.value.updateConversions(this.conversions);
    this.dialog.close(this.conversions);
  }
  
  ngOnInit() {
  }
}
