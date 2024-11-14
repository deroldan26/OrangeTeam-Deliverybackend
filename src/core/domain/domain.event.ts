export abstract class DomainEvent{
    private ocurredOn: Date
    private eventName: string

    constructor(){
        this.ocurredOn = new Date()
        this.eventName = this.constructor.name
    }

    get OcurredOn(): Date{
        return this.ocurredOn
    }

    get EventName(): string{
        return this.eventName
    }
}