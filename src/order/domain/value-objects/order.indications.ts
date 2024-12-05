import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderIndicationsException } from "../exceptions/unvalid.order.indications"

export class OrderIndications implements ValueObject<OrderIndications> {
    constructor(private _indications: string) {
        if (_indications.length < 0) throw new unvalidOrderIndicationsException(`Indications '${_indications}' not valid`)
    }
    get Indications() {
        return this._indications
    }
    equals(obj?: OrderIndications | undefined): boolean {
        return obj?._indications === this._indications
    }
}