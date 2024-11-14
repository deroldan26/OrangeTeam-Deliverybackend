import { ValueObject } from "../../../core/domain/value.object";
import { unvalidCategoryImageException } from "../exceptions/unvalid.category.image";

export class CategoryImage implements ValueObject<CategoryImage> {
  constructor(private _image: string) {
    if (!_image) throw new unvalidCategoryImageException("Combo image URL cannot be empty");
  }

  get Image() {
    return this._image;
  }

  equals(obj?: CategoryImage | undefined): boolean {
    return obj?._image === this._image;
  }
}
