import { ValueObject } from "../../../core/domain/value.object"
import { unvalidComboWeightException } from "../exceptions/unvalid.combo.weight"

export class ComboWeight implements ValueObject<ComboWeight> {
    constructor(private _weight: number) {
        if (_weight < 0) throw new unvalidComboWeightException(`Weight '${_weight}' not valid`)
    }
    get Weight() {
        return this._weight
    }
    equals(obj?: ComboWeight | undefined): boolean {
        return obj?._weight === this._weight
    }
}