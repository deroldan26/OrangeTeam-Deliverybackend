import { unvalidComboNameException } from "../exceptions/unvalid.combo.name";
import { ValueObject } from "../../../core/domain/value.object";

export class ComboName implements ValueObject<ComboName> {
  constructor(private _name: string) {
    if (_name.length < 3) throw new unvalidComboNameException(`Name '${_name}' not valid`);
  }

  get Name() {
    return this._name;
  }

  equals(obj?: ComboName | undefined): boolean {
    return obj?._name === this._name;
  }
}
