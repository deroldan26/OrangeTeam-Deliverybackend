import { DataSource, Repository } from "typeorm";
import { DiscountEntity as DiscountORM } from "../../models/postgres/discount.entity";
import { IDiscountRepository } from "src/discount/domain/repositories/discount-repositories.interface";
import { DiscountMapper } from "../../mapper/discount.mapper";
import { Result } from "src/core/domain/result-handler/result";
import { Discount } from "src/discount/domain/discount";


export class DiscountPostgresRepository extends Repository<DiscountORM> implements IDiscountRepository {
    private readonly discountMapper: DiscountMapper;

    constructor(dataSource: DataSource) {
        super(DiscountORM, dataSource.createEntityManager());
        this.discountMapper = new DiscountMapper();
    }

    async findDiscountById(id: string): Promise<Result<Discount>>{
        try {
            var discount = await this.createQueryBuilder('Discount').select(['Discount.id','Discount.name','Discount.description','Discount.expireDate','Discount.initDate','Discount.percentage']).where('Discount.id = :id',{id}).getOne()
            const getDiscount = await this.discountMapper.fromPersistenceToDomain(discount);
            return Result.success<Discount>(getDiscount, 200)
          } catch (error) {
            console.log(error.message);
            return Result.fail<Discount>(new Error(error.message), error.code, error.message);
          }
    }

    async findPaginatedDiscount(page: number, perpage: number): Promise<Result<Discount[]>> {
        try {
            const discounts = await this.createQueryBuilder('Discount').select(['Discount.id','Discount.name','Discount.description','Discount.expireDate','Discount.initDate','Discount.percentage'])
            .skip(page).take(perpage).getMany();
            const response = await Promise.all(discounts.map(discount => this.discountMapper.fromPersistenceToDomain(discount)));
            return Result.success<Discount[]>(response, 200);
        } catch (error) {
            return Result.fail<Discount[]>(new Error(error.message), error.code, error.message);
        }
    }

    async saveDiscountAggregate(discount: Discount): Promise<Result<Discount>>
    {
        try {
            const newDiscount = await this.discountMapper.fromDomainToPersistence(discount);
            await this.save(newDiscount);
            return Result.success<Discount>(discount, 200);
        } catch (error) {
            return Result.fail<Discount>(new Error(error.message), error.code, error.message);
        }
    }
}