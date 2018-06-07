import { ValueService } from './value.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatFormFieldModule, MatCardModule, MatInputModule, MatExpansionModule, MatListModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ConversionCardComponent } from './conversion-card/conversion-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddToFavoritesDialogComponent } from './add-to-favorites-dialog/add-to-favorites-dialog.component';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { DatabaseService } from './database.service';
import { ForexService } from './forex.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ConversionCardComponent,
    AddToFavoritesDialogComponent
  ],
  entryComponents: [
    AddToFavoritesDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    LocalStorageModule,
    HttpModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    ],
    providers: [ValueService, DatabaseService, ForexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
