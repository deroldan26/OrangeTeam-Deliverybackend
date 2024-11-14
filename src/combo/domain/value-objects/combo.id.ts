import { ValueObject } from "../../../core/domain/value.object";
import { regExpUUID } from "../../../core/tools/regexp.uuid";
import { unvalidComboIDException } from "../exceptions/unvalid.combo.id";

export class ComboID implements ValueObject<ComboID> {
  constructor(private _id: string) {
    if (!regExpUUID.test(_id)) throw new unvalidComboIDException(`Id '${_id}' not valid`);
  }

  get Id() {
    return this._id;
  }

  equals(obj?: ComboID | undefined): boolean {
    return obj?._id === this._id;
  }
}
