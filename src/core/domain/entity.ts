import { ValueObject } from './value.object'

export abstract class Entity<T extends ValueObject<T>> {
    protected constructor(private _id: T) {}

    get id(): T {
        return this._id
    }

    equals(obj?: T): boolean {
        return obj == this.id
    }
}
