import { unvalidProductMeasurementException } from "../exceptions/unvalid.product.measurement"
import { ValueObject } from "../../../core/domain/value.object"


export class ProductMeasuerement implements ValueObject<ProductMeasuerement> {
    constructor(private _measurement: string) {
        if (_measurement.length < 2) throw new unvalidProductMeasurementException(`Name '${_measurement}' not valid`)
    }
    get Measurement() {
        return this._measurement
    }
    equals(obj?: ProductMeasuerement | undefined): boolean {
        return obj?._measurement === this._measurement
    }
}