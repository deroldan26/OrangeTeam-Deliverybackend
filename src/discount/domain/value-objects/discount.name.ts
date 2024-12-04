import { unvalidDiscountNameException } from "../exceptions/unvalid.discount.name";
import { ValueObject } from "../../../core/domain/value.object";

export class DiscountName implements ValueObject<DiscountName> {
  constructor(private _name: string) {
    if (_name.length < 3) throw new unvalidDiscountNameException(`Name '${_name}' not valid`);
  }

  get Name() {
    return this._name;
  }

  equals(obj?: DiscountName | undefined): boolean {
    return obj?._name === this._name;
  }
}
