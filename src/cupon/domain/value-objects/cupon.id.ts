import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidCuponIDException } from "../exceptions/unvalid.cupon.id"


export class CuponID implements ValueObject<CuponID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidCuponIDException(`Id '${_id}' not valid`)
    }
    get Id() {
        return this._id
    }
    equals(obj?: CuponID | undefined): boolean {
        return obj?._id === this._id
    }
}