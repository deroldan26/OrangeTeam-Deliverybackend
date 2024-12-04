
import { unvalidDiscountDescriptionException } from "../exceptions/unvalid.discount.description";
import { ValueObject } from "../../../core/domain/value.object";

export class DiscountDescription implements ValueObject<DiscountDescription> {
  constructor(private _description: string) {
    if (_description.length < 10) throw new unvalidDiscountDescriptionException(`Description '${_description}' not valid`);
  }

  get Description() {
    return this._description;
  }

  equals(obj?: DiscountDescription | undefined): boolean {
    return obj?._description === this._description;
  }
}