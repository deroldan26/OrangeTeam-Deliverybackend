import { unvalidProductImageException } from "../exceptions/unvalid.product.image"
import { ValueObject } from "src/core/domain/value.object"


export class ProductImage implements ValueObject<ProductImage> {
    constructor(private _image: string) {
        if (!_image) throw new unvalidProductImageException(`Image '${_image}' not valid`)
    }
    get Image() {
        return this._image
    }
    equals(obj?: ProductImage | undefined): boolean {
        return obj?._image === this._image
    }
}