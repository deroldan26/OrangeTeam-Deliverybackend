import { unvalidDiscountPercentageException } from "../exceptions/unvalid.discount.percentage";
import { ValueObject } from "../../../core/domain/value.object";

export class DiscountPercentage implements ValueObject<DiscountPercentage> {
  constructor(private _percentage: number) {
    if (_percentage < 0 || _percentage > 1) throw new unvalidDiscountPercentageException(`Percentage '${_percentage}' not valid`);
  }

  get Percentage() {
    return this._percentage;
  }

  equals(obj?: DiscountPercentage | undefined): boolean {
    return obj?._percentage === this._percentage;
  }
}
