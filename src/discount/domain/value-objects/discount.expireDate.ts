import { unvalidDiscountExpireDateException } from "../exceptions/unvalid.discount.expireDate";
import { ValueObject } from "../../../core/domain/value.object";

export class DiscountExpireDate implements ValueObject<DiscountExpireDate> {
  constructor(private _expireDate: Date) {
    const now = new Date();
    const pastLimit = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());
    const futureLimit = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate());
    if (_expireDate < pastLimit || _expireDate > futureLimit) {
      throw new unvalidDiscountExpireDateException(`Expire date '${_expireDate.toISOString()}' is not valid.`);
    }
  }

  get ExpireDate() {
    return this._expireDate;
  }

  equals(obj?: DiscountExpireDate | undefined): boolean {
    return obj?._expireDate.getTime() === this._expireDate.getTime();
  }
}
