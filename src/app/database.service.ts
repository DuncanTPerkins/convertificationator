import { LocalStorage } from "@ngx-pwa/local-storage";
import { Conversion } from './conversion.model';
import { Injectable } from '@angular/core';
import { ValueService } from "./value.service";
import { ForexService } from "./forex.service";

@Injectable()
export class DatabaseService {
    databaseVersion = '6';
    data: any = new Array();
    constructor(private db: LocalStorage, private value: ValueService, private forexService: ForexService) {
        this.db.getItem('dbVersion').subscribe((version: string) => {
            if(version != this.databaseVersion) {
                this.db.setItem('dbVersion', this.databaseVersion).subscribe((data) => {
                    console.log('removing old database schema');
                    this.db.removeItem('conversions').subscribe(() => {
                        this.getForexCurrencies();                        
                        this.fillDb();
                    });
                });
            }
            else {
                this.db.getItem('conversions').subscribe((conversions: Conversion[]) => {
                    if(!conversions) {
                        console.log('creating database');
                        this.getForexCurrencies(); 
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

    getForexCurrencies() {
        let baseCurrency: string = "USD";
        let targetCurrencies: string[] = ["EUR", "CAD", "JPY"];
        for (let targetCurrency of targetCurrencies) {
            this.forexService.getForexConversion(baseCurrency, targetCurrency).subscribe(data => {
                var forex = data.json();
                var dbObj = {
                    from: baseCurrency,
                    to: targetCurrency,
                    formula: `x * ${forex.quotes[baseCurrency+targetCurrency]}`,
                    name: `${baseCurrency} to ${targetCurrency}`,
                    isFavorited: true
                }
                this.data.push(dbObj);
                this.db.setItem('conversions', this.data).subscribe(data => {
                });
                this.value.updateConversions(this.data);
            });
        }
    }

    ngOnInit() {

    }

    fillDb() {
            this.data.push(
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
                },
            );
            this.db.setItem('conversions', this.data).subscribe(data => {
            });
            this.value.updateConversions(this.data);
    }
}