import { ValueService } from './value.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ConversionCardComponent } from './conversion-card/conversion-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ConversionCardComponent
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
  ],
  providers: [ValueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
