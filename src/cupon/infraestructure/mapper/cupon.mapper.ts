import { IMapper } from "src/core/application/mapper/mapper.interface";
import { Cupon } from "src/cupon/domain/cupon";
import { CuponID } from "src/cupon/domain/value-objects/cupon.id";
import { CuponName } from "src/cupon/domain/value-objects/cupon.name";
import { CuponDescription } from "src/cupon/domain/value-objects/cupon.description";
import { CuponExpireDate } from "src/cupon/domain/value-objects/cupon.expireDate";
import { CuponStartDate } from "src/cupon/domain/value-objects/cupon.startDate";
import { CuponValue } from "src/cupon/domain/value-objects/cupon.value";
import { CuponEntity } from "../models/postgres/cupon.entity";

export class CuponMapper implements IMapper<Cupon, CuponEntity> {
  
    async fromDomainToPersistence(domain: Cupon): Promise<CuponEntity> {
        const cuponORM = new CuponEntity();
        cuponORM.id = domain.Id.Id;
        cuponORM.name = domain.Name.Name;
        cuponORM.value = domain.Value.Value;
        cuponORM.description = domain.Description.Description;
        cuponORM.expireDate = domain.ExpireDate.ExpireDate
        cuponORM.startDate = domain.StartDate.StartDate;
        
        return cuponORM;
    }

    async fromPersistenceToDomain(persistence: CuponEntity): Promise<Cupon> {
        return new Cupon(
            new CuponID(persistence.id),
            new CuponName(persistence.name),
            new CuponValue(persistence.value),
            new CuponDescription(persistence.description),
            new CuponExpireDate(persistence.expireDate),
            new CuponStartDate(persistence.startDate)
        );
    }
}
