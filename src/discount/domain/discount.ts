import { AggregateRoot } from "../../core/domain/aggregate.root";
import { DomainEvent } from "../../core/domain/domain.event";
import { DiscountCreatedEvent } from "./events/discount.created";
import { unvalidDiscountException } from "./exceptions/unvalid.discount";
import { DiscountDescription } from "./value-objects/discount.description";
import { DiscountExpireDate } from "./value-objects/discount.expireDate";
import { DiscountID } from "./value-objects/discount.id";
import { DiscountInitDate } from "./value-objects/discount.initDate";
import { DiscountName } from "./value-objects/discount.name";
import { DiscountPercentage } from "./value-objects/discount.percentage";


export class Discount extends AggregateRoot<DiscountID> {
    
    private name: DiscountName;
    private description: DiscountDescription;
    private expireDate: DiscountExpireDate;
    private initDate: DiscountInitDate;
    private percentage: DiscountPercentage;

    get Name(): DiscountName {
        return this.name;
    }

    get Description(): DiscountDescription {
        return this.description;
    }

    get ExpireDate(): DiscountExpireDate {
        return this.expireDate;
    }

    get InitDate(): DiscountInitDate {
        return this.initDate;
    }

    get Percentage(): DiscountPercentage {
        return this.percentage;
    }

    constructor(
        id: DiscountID, 
        name: DiscountName,
        description: DiscountDescription,
        expireDate: DiscountExpireDate,
        initDate: DiscountInitDate,
        percentage: DiscountPercentage
    ) {
        const discountCreated = DiscountCreatedEvent.create(id, name, description, expireDate, initDate, percentage);
        super(id, discountCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof DiscountCreatedEvent) {
            this.name = event.name;
            this.description = event.description;
            this.expireDate = event.expireDate;
            this.initDate = event.initDate;
            this.percentage = event.percentage;
        }
    }

    protected checkValidState(): void {
        if (!this.name || !this.description || !this.expireDate || !this.initDate || !this.percentage) {
            throw new unvalidDiscountException("Discount not valid");
        }
    }
}