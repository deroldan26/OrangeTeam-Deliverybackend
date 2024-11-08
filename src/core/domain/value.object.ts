export interface ValueObject<T> {
    equals(obj?: T): boolean;
}