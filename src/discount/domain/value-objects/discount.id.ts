import { ValueObject } from "../../../core/domain/value.object";
import { regExpUUID } from "../../../core/tools/regexp.uuid";
import { unvalidDiscountIDException } from "../exceptions/unvalid.discount.id";

export class DiscountID implements ValueObject<DiscountID> {
  constructor(private _id: string) {
    if (!regExpUUID.test(_id)) throw new unvalidDiscountIDException(`Id '${_id}' not valid`);
  }

  get Id() {
    return this._id;
  }

  equals(obj?: DiscountID | undefined): boolean {
    return obj?._id === this._id;
  }
}
