import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetCuponByIdServiceEntryDto } from "../dtos/entry/get-cuponById-entry.service.dto";
import { GetCuponByIdServiceResponseDto } from "../dtos/response/get-cuponById-response.service.dto";
import { ICuponRepository } from "src/cupon/domain/repositories/cupon-repositories.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Cupon } from "src/cupon/domain/cupon";
import { GetCuponByNameServiceEntryDto } from "../dtos/entry/get-cuponByName-entry.service.dto";
import { GetCuponByNameServiceResponseDto } from "../dtos/response/get-cuponByName-response.service.dto";


export class getCuponByNameService implements IApplicationService<GetCuponByNameServiceEntryDto, GetCuponByNameServiceResponseDto>{

    constructor(
        private readonly cuponRepository: ICuponRepository
    ){}
    
    async execute(data: GetCuponByNameServiceEntryDto): Promise<Result<GetCuponByNameServiceResponseDto>> {
        
        const cupon: Result<Cupon> = await this.cuponRepository.findCuponByName(data.name);
        if(!cupon.isSuccess()) {
            return Result.fail( cupon.Error, cupon.StatusCode, cupon.Message )
        }

        const response: GetCuponByNameServiceResponseDto = {
            id: cupon.Value.Id.Id,
            name: cupon.Value.Name.Name,
            description: cupon.Value.Description.Description,
            expireDate: cupon.Value.ExpireDate.ExpireDate,
            startDate: cupon.Value.StartDate.StartDate,
            value: cupon.Value.Value.Value
        };

        return Result.success(response, 200);
    }
}