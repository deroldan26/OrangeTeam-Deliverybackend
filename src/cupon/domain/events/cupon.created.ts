import { DomainEvent } from "../../../core/domain/domain.event";
import { CuponID } from "../value-objects/cupon.id";
import { CuponName } from "../value-objects/cupon.name";
import { CuponDescription } from "../value-objects/cupon.description";
import { CuponExpireDate } from "../value-objects/cupon.expireDate";
import { CuponStartDate } from "../value-objects/cupon.startDate";
import { CuponValue } from "../value-objects/cupon.value";

export class CuponCreatedEvent extends DomainEvent {
    constructor(
      public readonly id: CuponID,
      public readonly name: CuponName,
      public readonly value: CuponValue,
      public readonly description: CuponDescription,
      public readonly expireDate: CuponExpireDate,
      public readonly startDate: CuponStartDate
    ) {
      super();
    }
  
    static create(
        id: CuponID,
        name: CuponName,
        value: CuponValue,
        description: CuponDescription,
        expireDate: CuponExpireDate,
        startDate: CuponStartDate
    ): CuponCreatedEvent {
      return new CuponCreatedEvent(id, name, value, description, expireDate, startDate);
    }
  }
  