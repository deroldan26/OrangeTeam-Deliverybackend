import { ValueObject } from './value.object'

export abstract class Entity<T extends ValueObject<T>> {
    protected constructor(protected _id: T) {}

    get id(): T {
        return this._id
    }

    equals(obj?: T): boolean {
        return obj == this.id
    }
}
