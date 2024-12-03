import { DomainEvent } from "../../../core/domain/domain.event";
import { DiscountDescription } from "../value-objects/discount.description";
import { DiscountExpireDate } from "../value-objects/discount.expireDate";
import { DiscountID } from "../value-objects/discount.id";
import { DiscountInitDate } from "../value-objects/discount.initDate";
import { DiscountName } from "../value-objects/discount.name";
import { DiscountPercentage } from "../value-objects/discount.percentage";


export class DiscountCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: DiscountID,
    public readonly name: DiscountName,
    public readonly description: DiscountDescription,
    public readonly expireDate: DiscountExpireDate,
    public readonly initDate: DiscountInitDate,
    public readonly percentage: DiscountPercentage,
  ) {
    super();
  }

  static create(
    id: DiscountID,
    name: DiscountName,
    description: DiscountDescription,
    expireDate: DiscountExpireDate,
    initDate: DiscountInitDate,
    percentage: DiscountPercentage,
  ): DiscountCreatedEvent {
    return new DiscountCreatedEvent(id, name, description, expireDate, initDate, percentage);
  }
}
