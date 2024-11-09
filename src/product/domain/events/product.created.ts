import { DomainEvent } from "src/core/domain/domain.event";

export class productCreatedEvent extends DomainEvent{
    protected constructor(
        public id: string,
        public name: string,
        //public description: string,
        //public weight: string,
        //public price: number,
        //public currency: string
    ){
        super()
    }
    static create(id: string, name: string): productCreatedEvent{
        return new productCreatedEvent(id, name);
    }
}