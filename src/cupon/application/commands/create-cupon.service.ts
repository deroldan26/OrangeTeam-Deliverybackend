import { IApplicationService } from "src/core/application/service/application-service.interface";
import { CreateCuponServiceEntryDto } from "../dtos/entry/create-cupon-entry.service.dto";
import { CreateCuponServiceResponseDto } from "../dtos/response/create-cupon-response.service.dto";
import { ICuponRepository } from "src/cupon/domain/repositories/cupon-repositories.interface";
import { IdGenerator } from "src/core/application/id.generator/id.generator";
import { Result } from "src/core/domain/result-handler/result";
import { Cupon } from "src/cupon/domain/cupon";
import { CuponDescription } from "src/cupon/domain/value-objects/cupon.description";
import { CuponExpireDate } from "src/cupon/domain/value-objects/cupon.expireDate";
import { CuponName } from "src/cupon/domain/value-objects/cupon.name";
import { CuponID } from "src/cupon/domain/value-objects/cupon.id";
import { CuponStartDate } from "src/cupon/domain/value-objects/cupon.startDate";
import { CuponValue } from "src/cupon/domain/value-objects/cupon.value";

export class createCuponService implements IApplicationService<CreateCuponServiceEntryDto, CreateCuponServiceResponseDto> {

    constructor(
        private readonly cuponRepository: ICuponRepository,
        private readonly idGenerator: IdGenerator<string> 
    ) {}

    async execute(data: CreateCuponServiceEntryDto): Promise<Result<CreateCuponServiceResponseDto>> {
        
        const cupon = new Cupon(
            new CuponID(await this.idGenerator.generateId()),
            new CuponName(data.name),
            new CuponValue(data.value),
            new CuponDescription(data.description),
            new CuponExpireDate(data.expireDate),
            new CuponStartDate(data.startDate),

        );

        const result = await this.cuponRepository.saveCuponAggregate(cupon);
        if (!result.isSuccess()) {
            return Result.fail<CreateCuponServiceResponseDto>(result.Error, result.StatusCode, result.Message);
        }
        
        const response: CreateCuponServiceResponseDto = {
            id: cupon.Id.Id,
            name: cupon.Name.Name,
            value: cupon.Value.Value,
            description: cupon.Description.Description,
            expireDate: cupon.ExpireDate.ExpireDate,
            startDate: cupon.StartDate.StartDate
            
        };

        return Result.success<CreateCuponServiceResponseDto>(response, 200);
    }
}
