import { ValueObject } from './value.object'

export abstract class Entity<T extends ValueObject<T>> {
    protected constructor(private _id: T) {}

    get Id(): T {
        return this._id
    }

    equals(id?: T): boolean {
        return this._id.equals(id);
    }
}
