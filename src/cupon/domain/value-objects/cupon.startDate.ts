import { unvalidCuponStartDateException } from "../exceptions/unvalid.cupon.startDate";
import { ValueObject } from "../../../core/domain/value.object";

export class CuponStartDate implements ValueObject<CuponStartDate> {
  constructor(private _startDate: Date) {
    const now = new Date();
    const pastLimit = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());
    const futureLimit = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate());

    if (_startDate < pastLimit || _startDate > futureLimit) {
      throw new unvalidCuponStartDateException(`Start date '${_startDate.toISOString()}' is not valid.`);
    }

  }

  get StartDate() {
    return this._startDate;
  }

  equals(obj?: CuponStartDate | undefined): boolean {
    return obj?._startDate.getTime() === this._startDate.getTime();
  }
}
