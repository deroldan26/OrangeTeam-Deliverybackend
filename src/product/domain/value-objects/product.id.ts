import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidProductIdException } from "../exceptions/unvalid.product.id"


export class ProductID implements ValueObject<ProductID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidProductIdException(`Id '${_id}' not valid`)
    }
    get Id() {
        return this._id
    }
    equals(obj?: ProductID | undefined): boolean {
        return obj?._id === this._id
    }
}