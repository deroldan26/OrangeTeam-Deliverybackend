import { Repository, DataSource } from "typeorm";
import { Result } from "../../../../core/domain/result-handler/result";
import { Combo } from "../../../domain/combo";
import { IComboRepository } from "../../../domain/repositories/combo-repositories.interface";
import { ComboEntity as ComboORM } from "../../models/postgres/combo.entity";
import { ComboMapper } from "../../mapper/combo.mapper";

export class ComboPostgresRepository extends Repository<ComboORM> implements IComboRepository {
    private readonly comboMapper: ComboMapper;

    constructor(dataSource: DataSource) {
        super(ComboORM, dataSource.createEntityManager());
        this.comboMapper = new ComboMapper();
    }

    async findComboById(id: string): Promise<Result<Combo>>{ 
        try {
            var combo = await this.createQueryBuilder('Combo').select(['Combo.id','Combo.name','Combo.specialPrice','Combo.currency','Combo.description','Combo.comboImage','Combo.products']).where('Combo.id = :id',{id}).getOne();
            const getCombo = await this.comboMapper.fromPersistenceToDomain(combo);
            return Result.success<Combo>(getCombo, 200)
          } catch (error) {
            console.log(error.message);
            return Result.fail<Combo>(new Error(error.message), error.code, error.message);
          }
    }

    async findPaginatedCombos(page: number, take: number): Promise<Result<Combo[]>>{ 
        try {
            const skip = page * take - take;
            var combo = await this.createQueryBuilder('Combo').select(['Combo.id','Combo.name','Combo.specialPrice','Combo.currency','Combo.description','Combo.comboImage','Combo.products']).skip(skip).take(take).getMany();
            const response = await Promise.all(combo.map(combo => this.comboMapper.fromPersistenceToDomain(combo)));
            return Result.success<Combo[]>(response,200)
          } catch (error) {
            return Result.fail(error, 400, error.message);
          }
    }

    async saveComboAggregate(combo: Combo): Promise<Result<Combo>> {
        try {
            const newCombo = await this.comboMapper.fromDomainToPersistence(combo);
            await this.save(newCombo);
            return Result.success<Combo>(combo, 200);
        } catch (error) {
            return Result.fail<Combo>(new Error(error.message), error.code, error.message);
        }
    }
}
