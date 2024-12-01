import { Result } from "../../../core/domain/result-handler/result";
import { IComboRepository } from "src/combo/domain/repositories/combo-repositories.interface";
import { ComboID } from "src/combo/domain/value-objects/combo.id";

export class ComboValidatorService {
    constructor(private readonly comboRepository: IComboRepository) {}

    async validateComboIds(comboIds: string[]): Promise<Result<ComboID[]>> {
        const validatedComboIds: ComboID[] = [];
        for (const id of comboIds) {
            const comboId = new ComboID(id);
            const result = await this.comboRepository.findComboById(comboId.Id);

            if (!result.isSuccess()) {
                return Result.fail<ComboID[]>(
                    new Error(`Combo with ID ${id} does not exist`),
                    400,
                    `Invalid combo ID: ${id}`
                );
            }
            validatedComboIds.push(comboId);
        }
        return Result.success(validatedComboIds, 200);
    }
}
