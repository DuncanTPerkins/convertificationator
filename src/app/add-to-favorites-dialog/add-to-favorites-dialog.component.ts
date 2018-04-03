import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Conversion } from '../conversion.model';

@Component({
  selector: 'app-add-to-favorites-dialog',
  templateUrl: './add-to-favorites-dialog.component.html',
  styleUrls: ['./add-to-favorites-dialog.component.css']
})
export class AddToFavoritesDialogComponent implements OnInit {

  conversions: Conversion[];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.conversions = data['conversions'];
   }

  ngOnInit() {
  }

}
