import { unvalidCuponExpireDateException } from "../exceptions/unvalid.cupon.expireDate";
import { ValueObject } from "../../../core/domain/value.object";

export class CuponExpireDate implements ValueObject<CuponExpireDate> {
  constructor(private _expireDate: Date) {
    const now = new Date();
    if (_expireDate <= now) {
      throw new unvalidCuponExpireDateException(`Expire date '${_expireDate.toISOString()}' is not valid.`);
    }
  }

  get ExpireDate() {
    return this._expireDate;
  }

  equals(obj?: CuponExpireDate | undefined): boolean {
    return obj?._expireDate.getTime() === this._expireDate.getTime();
  }
}
