import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidUserIdException } from "../exceptions/unvalid.user.id"


export class UserID implements ValueObject<UserID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidUserIdException(`Id '${_id}' not valid`)
    }
    get Id() {
        return this._id
    }
    equals(obj?: UserID | undefined): boolean {
        return obj?._id === this._id
    }
}