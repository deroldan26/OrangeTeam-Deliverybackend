import { unvalidDiscountInitDateException } from "../exceptions/unvalid.discount.initDate";
import { ValueObject } from "../../../core/domain/value.object";

export class DiscountInitDate implements ValueObject<DiscountInitDate> {
  constructor(private _initDate: Date) {
    if (!(_initDate instanceof Date)) {
      throw new unvalidDiscountInitDateException("Init Date not valid.");
    }
  }

  get InitDate() {
    return this._initDate;
  }

  equals(obj?: DiscountInitDate | undefined): boolean {
    return obj?._initDate.getTime() === this._initDate.getTime();
  }
}