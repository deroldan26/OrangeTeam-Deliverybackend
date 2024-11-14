import { DomainEvent } from "./domain.event";
import { Entity } from "./entity";
import { SendMessage } from "./send-message";
import { ValueObject } from "./value.object";

export abstract class AggregateRoot<T extends ValueObject<T>> extends Entity<T> {

    protected constructor(id: T, protected event: DomainEvent) {
        super(id);
        this.apply(event);
    }

    protected abstract when(event: DomainEvent): void;
    protected abstract checkValidState(): void;

    protected apply(event: DomainEvent): void{
        this.when(event);
        this.checkValidState();
    }

    public pullDomainEvent(): DomainEvent {
        return this.event;
    }
}