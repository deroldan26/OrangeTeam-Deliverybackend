import { Result } from "../../../src/core/domain/result-handler/result";
import { IComboRepository } from "../../../src/combo/domain/repositories/combo-repositories.interface";
import { Combo } from "../../../src/combo/domain/combo";
import { ComboID } from "../../../src/combo/domain/value-objects/combo.id";

export class ComboRepositoryMock implements IComboRepository {

    private readonly combos: Combo[] = [];

    async findComboById(id: string): Promise<Result<Combo>> {
        try{
            for (let i = 0; i < this.combos.length; i++) {
                const combo = this.combos[i];
                if (combo.Id.Id == id) {
                    return Result.success<Combo>(combo, 200)
                }
            }
            throw new Error(`Combo with ID ${id} not found`);
        }catch(error){
            return Result.fail<Combo>(new Error(error.message), error.code, error.message);
        }
    }

    async findPaginatedCombos(page: number, take: number, filters: { category?: string[]; name?: string; price?: number; discount?: string; }): Promise<Result<Combo[]>> {
        throw new Error('Method not implemented.');
    }

    async saveComboAggregate(combo: Combo): Promise<Result<Combo>> {
        this.combos.push(combo);
        return Result.success<Combo>(combo, 200);
    }

    static create(){
        return new ComboRepositoryMock();
    }
}