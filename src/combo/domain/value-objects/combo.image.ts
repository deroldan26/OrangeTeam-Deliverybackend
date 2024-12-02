import { ValueObject } from "../../../core/domain/value.object";
import { unvalidComboImageException } from "../exceptions/unvalid.combo.image";

export class ComboImage implements ValueObject<ComboImage> {
  constructor(private _image: string) {
    if (!_image) throw new unvalidComboImageException(`Image ${_image} not valid`);
  }

  get Image() {
    return this._image;
  }

  equals(obj?: ComboImage | undefined): boolean {
    return obj?._image === this._image;
  }
}
