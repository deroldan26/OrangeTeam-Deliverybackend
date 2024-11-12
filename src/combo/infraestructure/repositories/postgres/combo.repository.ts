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

//!Declare estos metodos porque lo necesitaba para implementar todos los metodos de IComboRepository, luego lo implementas bien
    findComboById(id: string): Promise<Result<Combo>>{ return };
    findPaginatedCombos(page: number, take: number): Promise<Result<Combo[]>>{ return };

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
