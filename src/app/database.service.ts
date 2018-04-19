import { LocalStorage } from "@ngx-pwa/local-storage";
import { Conversion } from './conversion.model';
import { Injectable } from '@angular/core';
import { ValueService } from "./value.service";

@Injectable()
export class DatabaseService {
    constructor(private db: LocalStorage, private value: ValueService) {
        this.db.getItem('conversions').subscribe((conversions: Conversion[]) => {
            if(!conversions) {
                console.log('creating database');
                this.fillDb();
            }
            else {
                console.log('found records in database');
                this.value.updateConversions(conversions);
            }
        });
    }

    ngOnInit() {
    }

    fillDb() {
            var data = new Array();
            data.push(
                {
                    from: 'Miles',
                    to: 'Kilometers',
                    formula: 'return x / 0.62137',
                    name: 'Miles to Kilometers',
                    isFavorited: true
                },
                {
                    from: 'Celcius',
                    to: 'Fahrenheit',
                    formula: 'return x * 1.8 + 32',
                    name: 'Celsius to Fahrenheit'
                },
                {
                    from: 'Miles',
                    to: 'Acres',
                    formula: 'return x * 640',
                    name: 'Square Miles to Acres'
                }
            );
            this.db.setItem('conversions', data).subscribe(data => {
                console.log(data);
            })
            this.value.updateConversions(data);
    }
}