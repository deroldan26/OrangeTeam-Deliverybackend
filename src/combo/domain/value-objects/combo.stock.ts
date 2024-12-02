import { ValueObject } from "../../../core/domain/value.object"
import { unvalidComboStockException } from "../exceptions/unvalid.combo.stock"



export class ComboStock implements ValueObject<ComboStock> {
    constructor(private _stock: number) {
        if (_stock < 0) throw new unvalidComboStockException(`Stock '${_stock}' not valid`)
    }
    get Stock() {
        return this._stock
    }
    equals(obj?: ComboStock | undefined): boolean {
        return obj?._stock === this._stock
    }
}