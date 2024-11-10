import { unvalidProductImageException } from "../exceptions/unvalid.product.image"
import { ValueObject } from "src/core/domain/value.object"


export class CategoryImage implements ValueObject<CategoryImage> {
    constructor(private _image: string) {
        if (!_image) throw new unvalidProductImageException(`Image '${_image}' not valid`)
    }
    get Image() {
        return this._image
    }
    equals(obj?: CategoryImage | undefined): boolean {
        return obj?._image === this._image
    }
}