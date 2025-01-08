import { ValueObject } from "../../../core/domain/value.object";
import { unvalidUserImageException } from "../exceptions/unvalid.user.image";

export class UserImage implements ValueObject<UserImage> {
  constructor(private _image: string) {
    if (!_image) throw new unvalidUserImageException(`Image ${_image} not valid`);
  }

  get Image() {
    return this._image;
  }

  equals(obj?: UserImage | undefined): boolean {
    return obj?._image === this._image;
  }
}
