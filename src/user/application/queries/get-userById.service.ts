import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetUserByIdServiceEntryDto } from "../dtos/entry/get-userById-entry.service.dto";
import { GetUserServiceResponseDto } from "../dtos/response/get-user-response.service.dto";
import { IUserRepository } from "../../domain/repositories/user-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { User } from "../../../user/domain/user";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';

export class getUserByIdService implements IApplicationService<GetUserByIdServiceEntryDto, GetUserServiceResponseDto>{

    constructor(
        private readonly userRepository:IUserRepository
    ){}
    
    async execute(data: GetUserByIdServiceEntryDto): Promise<Result<GetUserServiceResponseDto>> {
        
        const user: Result<User> = await this.userRepository.findUserById(data.id)
        if(!user.isSuccess()) {
            return Result.fail( user.Error, user.StatusCode, user.Message )
        }

        const response: GetUserServiceResponseDto = {
            id: user.Value.Id.Id,
            name: user.Value.Name.Name,
            email: user.Value.Email.Email,
            password: user.Value.Password.Password,
            phone: user.Value.Phone.Phone,
            type: user.Value.Type.Type
        };
        return Result.success(response, 200);
    }
}