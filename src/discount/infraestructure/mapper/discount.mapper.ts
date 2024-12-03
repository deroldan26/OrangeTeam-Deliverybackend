import { IMapper } from "src/core/application/mapper/mapper.interface";
import { Discount } from "src/discount/domain/discount";
import { DiscountID } from "src/discount/domain/value-objects/discount.id";
import { DiscountName } from "src/discount/domain/value-objects/discount.name";
import { DiscountDescription } from "src/discount/domain/value-objects/discount.description";
import { DiscountExpireDate } from "src/discount/domain/value-objects/discount.expireDate";
import { DiscountInitDate } from "src/discount/domain/value-objects/discount.initDate";
import { DiscountPercentage } from "src/discount/domain/value-objects/discount.percentage";
import { DiscountEntity } from "../models/postgres/discount.entity";

export class DiscountMapper implements IMapper<Discount, DiscountEntity> {
  
    async fromDomainToPersistence(domain: Discount): Promise<DiscountEntity> {
        const discountORM = new DiscountEntity();
        discountORM.id = domain.Id.Id;
        discountORM.name = domain.Name.Name;
        discountORM.description = domain.Description.Description;
        discountORM.expireDate = domain.ExpireDate.ExpireDate
        discountORM.initDate = domain.InitDate.InitDate;
        discountORM.percentage = domain.Percentage.Percentage;
        
        return discountORM;
    }

    async fromPersistenceToDomain(persistence: DiscountEntity): Promise<Discount> {
        return new Discount(
            new DiscountID(persistence.id),
            new DiscountName(persistence.name),
            new DiscountDescription(persistence.description),
            new DiscountExpireDate(persistence.expireDate),
            new DiscountInitDate(persistence.initDate),
            new DiscountPercentage(persistence.percentage),
        );
    }
}
