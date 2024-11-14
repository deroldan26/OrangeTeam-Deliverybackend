
import { unvalidComboDescriptionException } from "../exceptions/unvalid.combo.description";
import { ValueObject } from "../../../core/domain/value.object";

export class ComboDescription implements ValueObject<ComboDescription> {
  constructor(private _description: string) {
    if (_description.length < 10) throw new unvalidComboDescriptionException(`Description '${_description}' not valid`);
  }

  get Description() {
    return this._description;
  }

  equals(obj?: ComboDescription | undefined): boolean {
    return obj?._description === this._description;
  }
}