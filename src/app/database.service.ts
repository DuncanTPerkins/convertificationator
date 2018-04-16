import { LocalStorage } from "@ngx-pwa/local-storage";
import { Conversion } from './conversion.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseService {
    conversions: Conversion[];
    constructor(private db: LocalStorage) {
        this.db.getItem('conversions').subscribe((conversions: Conversion[]) => {
            if(!conversions) {
                console.log('creating database');
                this.fillDb();
            }
            else {
                console.log('found records in database');
                this.conversions = conversions;
            }
        });
    }

    fillDb() {
        this.conversions.push(
            {
                from: 'MI',
                to: 'KM',
                formula: x => x / 0.62137,
                name: 'Miles to Kilometers',
                isFavorited: true
            } as Conversion,
            {
                from: 'C',
                to: 'F',
                formula: x => x * 1.8 + 32,
                name: 'Celsius to Fahrenheit'
            } as Conversion
        )
        this.db.setItem('conversions', this.conversions);
    }
}