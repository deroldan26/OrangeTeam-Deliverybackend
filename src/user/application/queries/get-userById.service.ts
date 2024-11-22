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
        
        const product: Result<User> = await this.userRepository.findUserById(data.id)
        if(!product.isSuccess()) {
            return Result.fail( product.Error, product.StatusCode, product.Message )
        }

        const response: GetUserServiceResponseDto = {
            id: product.Value.Id.Id,
            username: product.Value.Username.Username,
            email: product.Value.Email.Email,
            password: product.Value.Password.Password,
            phone: product.Value.Phone.Phone
        };
        return Result.success(response, 200);
    }
}