import { unvalidProductCaducityDateException } from "../exceptions/unvalid.product.caducityDate"
import { ValueObject } from "../../../core/domain/value.object"


export class ProductCaducityDate implements ValueObject<ProductCaducityDate> {
    constructor(private _caducityDate: string) {
        if (_caducityDate.length < 2) throw new unvalidProductCaducityDateException(`Caducity Date '${_caducityDate}' not valid`)
    }
    get CaducityDate() {
        return this._caducityDate
    }
    equals(obj?: ProductCaducityDate | undefined): boolean {
        return obj?._caducityDate === this._caducityDate
    }
}