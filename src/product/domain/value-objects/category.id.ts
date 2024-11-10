import { ValueObject } from "src/core/domain/value.object"
import { regExpUUID } from "src/core/tools/regexp.uuid"
import { unvalidCategoryIdException } from "../exceptions/unvalid.category.id"


export class CategoryID implements ValueObject<CategoryID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidCategoryIdException(`Id '${_id}' not valid`)
    }
    get Id() {
        return this._id
    }
    equals(obj?: CategoryID | undefined): boolean {
        return obj?._id === this._id
    }
}