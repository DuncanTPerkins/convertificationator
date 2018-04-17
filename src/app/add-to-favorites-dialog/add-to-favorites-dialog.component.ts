import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private db: DatabaseService, private value: ValueService) {
    this.value.currentConversions.subscribe(value => {
      this.conversions = value;
      for(var conversion of this.conversions) {
        var collection = new ConversionCollection;
        collection.conversion = conversion;
        for(var childConversion of this.conversions) {
          if(childConversion.to == conversion.from) {
            collection.relatedConversions.push(childConversion);
          }
        }
        this.conversionCollections.push(collection);
      }
    })
  }

  ngOnInit() {
  }
}
