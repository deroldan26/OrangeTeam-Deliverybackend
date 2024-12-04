import { unvalidProductCaducityDateException } from "../exceptions/unvalid.product.caducityDate"
import { ValueObject } from "../../../core/domain/value.object"


export class ProductCaducityDate implements ValueObject<ProductCaducityDate> {
    constructor(private _caducityDate: Date) {
        const now = new Date();
        if (_caducityDate <= now) {
          throw new unvalidProductCaducityDateException(`Caducity date '${_caducityDate.toISOString()}' is not valid.`);
        }
      }
    get CaducityDate() {
        return this._caducityDate
    }
    equals(obj?: ProductCaducityDate | undefined): boolean {
        return obj?._caducityDate === this._caducityDate
    }
}