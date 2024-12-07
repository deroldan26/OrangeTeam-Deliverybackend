import { Result } from 'src/core/domain/result-handler/result';
import { Cupon } from 'src/cupon/domain/cupon';
import { ICuponRepository } from 'src/cupon/domain/repositories/cupon-repositories.interface';
import { CuponEntity as CuponORM } from '../models/postgres/cupon.entity';
import { DataSource, Repository } from "typeorm";
import { CuponMapper } from '../mapper/cupon.mapper';

export class CuponPostgresRepository extends Repository<CuponORM> implements ICuponRepository {
    private readonly cuponMapper: CuponMapper;

    constructor(dataSource: DataSource) {
        super(CuponORM, dataSource.createEntityManager());
        this.cuponMapper = new CuponMapper();
    }

    async findCuponById(id: string): Promise<Result<Cupon>>{
        try {
            var cupon = await this.createQueryBuilder('Cupon').select(['Cupon.id','Cupon.name','Cupon.description','Cupon.expireDate','Cupon.startDate','Cupon.value']).where('Cupon.id = :id',{id}).getOne()
            const getDiscount = await this.cuponMapper.fromPersistenceToDomain(cupon);
            return Result.success<Cupon>(getDiscount, 200)
          } catch (error) {
            console.log(error.message);
            return Result.fail<Cupon>(new Error(error.message), error.code, error.message);
          }
    }

    async saveCuponAggregate(cupon: Cupon): Promise<Result<Cupon>>
    {
        try {
            const newCupon = await this.cuponMapper.fromDomainToPersistence(cupon);
            await this.save(newCupon);
            return Result.success<Cupon>(cupon, 200);
        } catch (error) {
            return Result.fail<Cupon>(new Error(error.message), error.code, error.message);
        }
    }
}