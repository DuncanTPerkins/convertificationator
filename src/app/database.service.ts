import { LocalStorage } from "@ngx-pwa/local-storage";
import { Conversion } from './conversion.model';
import { Injectable } from '@angular/core';
import { ValueService } from "./value.service";

@Injectable()
export class DatabaseService {
    constructor(private db: LocalStorage, private value: ValueService) {
        this.db.getItem('conversions').subscribe((conversions: string) => {
            if(!conversions) {
                console.log('creating database');
                this.fillDb();
            }
            else {
                console.log('found records in database');
                this.value.updateConversions(JSON.parse(conversions));
            }
        });
    }

    ngOnInit() {
    }

    fillDb() {
            var data = new Array();
            data.push(
                {
                    from: 'MI',
                    to: 'KM',
                    formula: x => x / 0.62137,
                    name: 'Miles to Kilometers',
                    isFavorited: true
                },
                {
                    from: 'C',
                    to: 'F',
                    formula: x => x * 1.8 + 32,
                    name: 'Celsius to Fahrenheit'
                }
            );
            this.db.setItem('conversions', JSON.stringify(data)).subscribe(data => {
                console.log(data);
            })
            this.value.updateConversions(data);
    }
}