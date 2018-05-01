import { LocalStorage } from "@ngx-pwa/local-storage";
import { Conversion } from './conversion.model';
import { Injectable } from '@angular/core';
import { ValueService } from "./value.service";

@Injectable()
export class DatabaseService {
    databaseVersion = '3';
    constructor(private db: LocalStorage, private value: ValueService) {
        this.db.getItem('dbVersion').subscribe((version: string) => {
            if(version != this.databaseVersion) {
                this.db.setItem('dbVersion', this.databaseVersion).subscribe((data) => {
                    console.log('removing old database schema');
                    this.db.removeItem('conversions').subscribe(() => {                       
                        this.fillDb();
                    });
                });
            }
            else {
                this.db.getItem('conversions').subscribe((conversions: Conversion[]) => {
                    if(!conversions) {
                        console.log('creating database');
                        this.fillDb();
                    }
                    else {
                        console.log('found db');
                        this.value.updateConversions(conversions);
                    }
                });
            }
        });

        this.value.currentConversions.subscribe((data: Conversion[]) => {
            if(data) {
                this.db.setItem('conversions', data).subscribe(data => {
                });
            }
        })
    }

    ngOnInit() {
    }

    fillDb() {
            var data = new Array();
            data.push(
                {
                    from: 'Miles',
                    to: 'Kilometers',
                    formula: 'x / 0.62137',
                    name: 'Miles to Kilometers',
                    isFavorited: true
                },
                {
                    from: 'Celcius',
                    to: 'Fahrenheit',
                    formula: 'x * 1.8 + 32',
                    name: 'Celsius to Fahrenheit',
                    isFavorited: true
                },
                {
                    from: 'Miles',
                    to: 'Acres',
                    formula: 'x * 640',
                    name: 'Square Miles to Acres'
                },
                {
                    from: 'Fahrenheit',
                    to: 'Celcius',
                    formula: '(x - 32) / 1.8',
                    name: 'Fahrenheit to Celcius'
                },
                {
                    from: 'Centimeters', 
                    to: 'Inches',
                    formula: 'x * 0.39370',
                    name: 'Centimeters to Inches'
                },
                {
                    from: 'Kilometers',
                    to: 'Miles',
                    formula: 'x * 0.62137',
                    name: 'Kilometers to Miles'
                }, 
                {
                    from: 'Inches',
                    to: 'Centimeters',
                    formula: 'x / 0.39370',
                    name: 'Inches to Centimeters',
                    isFavorited: true
                },
                {
                    from: 'Fahrenheit',
                    to: 'Kelvin',
                    formula: '(x + 459.67) x 1.92',
                    name: 'Fahrenheit to Kelvin'
                },
                {
                    from: 'Celcius',
                    to: 'Kelvin',
                    formula: 'x + 273.15',
                    name: 'Celcius to Kelvin'
                }
            );
            this.db.setItem('conversions', data).subscribe(data => {
            });
            this.value.updateConversions(data);
    }
}