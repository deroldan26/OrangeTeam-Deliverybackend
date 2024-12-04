import { unvalidComboCaducityDateException } from "../exceptions/unvalid.combo.caducityDate";
import { ValueObject } from "../../../core/domain/value.object";

export class ComboCaducityDate implements ValueObject<ComboCaducityDate> {
  constructor(private _caducityDate: Date) {
    const now = new Date();
    if (_caducityDate <= now) {
      throw new unvalidComboCaducityDateException(`Caducity date '${_caducityDate.toISOString()}' is not valid.`);
    }
  }

  get CaducityDate() {
    return this._caducityDate;
  }

  equals(obj?: ComboCaducityDate | undefined): boolean {
    return obj?._caducityDate.getTime() === this._caducityDate.getTime();
  }
}
