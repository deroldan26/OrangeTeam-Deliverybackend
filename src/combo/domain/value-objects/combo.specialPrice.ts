import { unvalidComboSpecialPriceException } from "../exceptions/unvalid.combo.specialPrice";
import { ValueObject } from "../../../core/domain/value.object";

export class ComboSpecialPrice implements ValueObject<ComboSpecialPrice> {
  constructor(private _price: number) {
    if (_price < 0) throw new unvalidComboSpecialPriceException(`Special price '${_price}' cannot be negative`);
  }

  get Price() {
    return this._price;
  }

  equals(obj?: ComboSpecialPrice | undefined): boolean {
    return obj?._price === this._price;
  }
}
