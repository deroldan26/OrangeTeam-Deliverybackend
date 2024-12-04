import { unvalidComboMeasurementException } from "../exceptions/unvalid.combo.measurement";
import { ValueObject } from "../../../core/domain/value.object";

export class ComboMeasurement implements ValueObject<ComboMeasurement> {

  constructor(private _measurement: string) {
    if (_measurement.length === 0) {
      throw new unvalidComboMeasurementException(`Measurement '${_measurement}' is not valid.`);
    }
  }

  get Measurement() {
    return this._measurement;
  }

  equals(obj?: ComboMeasurement | undefined): boolean {
    return obj?._measurement === this._measurement;
  }
}
