import { unvalidComboCurrencyException } from "../exceptions/unvalid.combo.currency";
import { ValueObject } from "../../../core/domain/value.object";

export class ComboCurrency implements ValueObject<ComboCurrency> {
  constructor(private _currency: string) {
    if (_currency.length !== 3) throw new unvalidComboCurrencyException(`Currency '${_currency}' not valid`);
  }

  get Currency() {
    return this._currency;
  }

  equals(obj?: ComboCurrency | undefined): boolean {
    return obj?._currency === this._currency;
  }
}