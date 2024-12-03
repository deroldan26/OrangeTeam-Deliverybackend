import { Result } from "src/core/domain/result-handler/result";
import { Combo } from "src/order/domain/entities/combo";
import { IOrderCombosRepository } from "src/order/domain/repositories/order-combos-repositories.interface";
import { DataSource, Repository } from "typeorm";
import { OrderComboEntity as ComboORM } from "../../models/order.combos.entity";
import { OrderComboMapper } from "../../mapper/order.combos.mapper";

export class OrderComboPostgresRepository extends Repository<ComboORM> implements IOrderCombosRepository{
    
    private readonly comboMapper: OrderComboMapper;

    constructor(dataSource: DataSource){
        super(ComboORM, dataSource.createEntityManager());
        this.comboMapper = new OrderComboMapper();
    }
    
    async findOrderById(id: string): Promise<Result<Combo[]>> {
        throw new Error("Method not implemented.");
    }
    async saveOrderComboAggregate(combos: Combo[]): Promise<Result<Combo[]>> {
        try {
            const newCombos = await Promise.all(combos.map(combo => this.comboMapper.fromDomainToPersistence(combo)));
            await this.save(newCombos);
            return Result.success<Combo[]>(combos, 200);
        } catch (error) {
            return Result.fail<Combo[]>(new Error(error.message), error.code, error.message);
        }
    }

}