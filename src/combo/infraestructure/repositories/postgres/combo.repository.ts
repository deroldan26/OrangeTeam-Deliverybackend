import { Repository, DataSource } from "typeorm";
import { Result } from "../../../../core/domain/result-handler/result";
import { Combo } from "../../../domain/combo";
import { IComboRepository } from "../../../domain/repositories/combo-repositories.interface";
import { ComboEntity as ComboORM } from "../../models/postgres/combo.entity";
import { ComboMapper } from "../../mapper/combo.mapper";
import { filter } from "rxjs";

export class ComboPostgresRepository extends Repository<ComboORM> implements IComboRepository {
    private readonly comboMapper: ComboMapper;

    constructor(dataSource: DataSource) {
        super(ComboORM, dataSource.createEntityManager());
        this.comboMapper = new ComboMapper();
    }

    async findComboById(id: string): Promise<Result<Combo>>{ 
        try {
            var combo = await this.createQueryBuilder('Combo').select(['Combo.id','Combo.name','Combo.specialPrice','Combo.currency','Combo.description','Combo.comboImages','Combo.products','Combo.weight','Combo.measurement','Combo.stock','Combo.caducityDate','Combo.categories','Combo.discount']).where('Combo.id = :id',{id}).getOne();
            const getCombo = await this.comboMapper.fromPersistenceToDomain(combo);
            return Result.success<Combo>(getCombo, 200)
          } catch (error) {
            console.log(error.message);
            return Result.fail<Combo>(new Error(error.message), error.code, error.message);
          }
    }

    async findPaginatedCombos(page: number, take: number, filters: { category?: string[]; name?: string; price?: number; discount?: string }): Promise<Result<Combo[]>>{ 
        try {
            const skip = page * take - take;
            var combo = await this.createQueryBuilder('Combo').select(['Combo.id','Combo.name','Combo.specialPrice','Combo.currency','Combo.description','Combo.comboImages','Combo.products','Combo.weight','Combo.measurement','Combo.stock','Combo.caducityDate','Combo.categories','Combo.discount']);
            
            // Filtrar por categorías si se proporcionan
            if (filters.category) {
                // Convertir filtros de categorías a formato JSON
                const categoryFilter = JSON.stringify(filters.category);
                combo.andWhere(`"Combo".categories::jsonb @> :categories::jsonb`, { categories: categoryFilter });
            }
        
            // Filtrar por nombre si se proporciona
            if (filters.name) {
                combo.andWhere("Combo.name ILIKE :name", { name: `%${filters.name}%` });
            }
        
            // Filtrar por precio si se proporciona
            if (filters.price) {
                combo.andWhere("Combo.specialPrice <= :price", { price: filters.price });
            }

            // Filtrar por descuento si se proporciona
            if (filters.discount) {
                combo.andWhere("Combo.discount = :discount", { discount: filters.discount });
            }

            combo.skip(skip).take(take);
            const combos = await combo.getMany();
            const response = await Promise.all(combos.map(combo => this.comboMapper.fromPersistenceToDomain(combo)));
            return Result.success<Combo[]>(response,200)
          } catch (error) {
            console.error(error);
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
