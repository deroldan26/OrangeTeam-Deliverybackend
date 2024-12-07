import { AggregateRoot } from "../../core/domain/aggregate.root";
import { DomainEvent } from "../../core/domain/domain.event";
import { CuponCreatedEvent } from "./events/cupon.created";
import { CuponID } from "./value-objects/cupon.id";
import { CuponName } from "./value-objects/cupon.name";
import { CuponDescription } from "./value-objects/cupon.description";
import { CuponExpireDate } from "./value-objects/cupon.expireDate";
import { CuponStartDate } from "./value-objects/cupon.startDate";
import { CuponValue } from "./value-objects/cupon.value";
import { unvalidCuponException } from "./exceptions/unvalid.cupon";

export class Cupon extends AggregateRoot<CuponID> {
    
    public readonly id: CuponID;
    private name: CuponName;
    private value: CuponValue;
    private description: CuponDescription;
    private expireDate: CuponExpireDate;
    private startDate: CuponStartDate;

    get Name(): CuponName {
        return this.name;
    }

    get Value(): CuponValue {
        return this.value;
    }

    get Description(): CuponDescription {
        return this.description;
    }

    get ExpireDate(): CuponExpireDate {
        return this.expireDate;
    }

    get StartDate(): CuponStartDate {
        return this.startDate;
    }

    constructor(
        id: CuponID,
        name: CuponName,
        value: CuponValue,
        description: CuponDescription,
        expireDate: CuponExpireDate,
        startDate: CuponStartDate
    ) {
        const cuponCreated = CuponCreatedEvent.create(id, name, value, description, expireDate, startDate);
        super(id, cuponCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof CuponCreatedEvent) {
            this.name = event.name;
            this.value = event.value;
            this.description = event.description;
            this.expireDate = event.expireDate;
            this.startDate = event.startDate;
        }
    }

    protected checkValidState(): void {
        if (!this.name || !this.value || !this.description || !this.expireDate || !this.startDate) {
            throw new unvalidCuponException("Discount not valid");
        }
    }
}