import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ConversionCollection } from '../conversion-collection.model';
import { DatabaseService } from '../database.service';
import { Conversion } from '../conversion.model';
@Component({
  selector: 'app-add-to-favorites-dialog',
  templateUrl: './add-to-favorites-dialog.component.html',
  styleUrls: ['./add-to-favorites-dialog.component.css']
})
export class AddToFavoritesDialogComponent implements OnInit {
  conversionCollections: ConversionCollection[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private db: DatabaseService) {
    for(var conversion of this.db.conversions) {
      var collection = new ConversionCollection;
      collection.conversion = conversion;
      for(var childConversion of this.db.conversions) {
        if(childConversion.to == conversion.from) {
          collection.relatedConversions.push(childConversion);
        }
      }
    }
  }

  ngOnInit() {}

}
