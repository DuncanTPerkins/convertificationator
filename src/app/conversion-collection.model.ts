import { Conversion } from "./conversion.model";

export class ConversionCollection {
    conversion: Conversion;
    relatedConversions: Conversion[];

    constructor() {
        this.conversion = new Conversion();
        this.relatedConversions = new Array();
    }
}