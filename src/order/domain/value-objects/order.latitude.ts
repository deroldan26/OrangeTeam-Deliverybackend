import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderLatitudeException } from "../exceptions/unvalid.order.latitude"

export class OrderLatitude implements ValueObject<OrderLatitude> {
    constructor(private _latitude: number) {
        if (_latitude < 0) throw new unvalidOrderLatitudeException(`Latitude '${_latitude}' not valid`)
    }
    get Latitude() {
        return this._latitude
    }
    equals(obj?: OrderLatitude | undefined): boolean {
        return obj?._latitude === this._latitude
    }
}