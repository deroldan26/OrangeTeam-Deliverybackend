import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderLongitudeException } from "../exceptions/unvalid.order.longitude"

export class OrderLongitude implements ValueObject<OrderLongitude> {
    constructor(private _longitude: number) {
        if (_longitude < 0) throw new unvalidOrderLongitudeException(`Longitude '${_longitude}' not valid`)
    }
    get Longitude() {
        return this._longitude
    }
    equals(obj?: OrderLongitude | undefined): boolean {
        return obj?._longitude === this._longitude
    }
}