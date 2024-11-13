import { ValueObject } from "../../../core/domain/value.object"
import { unvalidProductStockException } from "../exceptions/unvalid.product.stock"


export class ProductStock implements ValueObject<ProductStock> {
    constructor(private _stock: number) {
        if (_stock < 0) throw new unvalidProductStockException(`Stock '${_stock}' not valid`)
    }
    get Stock() {
        return this._stock
    }
    equals(obj?: ProductStock | undefined): boolean {
        return obj?._stock === this._stock
    }
}