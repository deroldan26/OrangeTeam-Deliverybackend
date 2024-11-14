import { DomainEvent } from "./domain.event";
import { Entity } from "./entity";
import { SendMessage } from "./send-message";
import { ValueObject } from "./value.object";

export abstract class AggregateRoot<T extends ValueObject<T>> extends Entity<T> {
    protected events: DomainEvent[] = [];
    protected abstract when(event: DomainEvent): void;
    protected abstract checkValidState(): void;

    protected constructor(id: T, /*private readonly messagingService: SendMessage<DomainEvent>,*/ event: DomainEvent) {
        super(id);
        this.apply(event);
    }

    protected async apply(event: DomainEvent): Promise<void>{
        this.when(event);
        this.checkValidState();
        //await this.messagingService.sendMessage(event.EventName, event);
    }

    public pullDomainEvents(): DomainEvent[] {
        const events = this.events;
        this.events = [];
        return events;
    }
}