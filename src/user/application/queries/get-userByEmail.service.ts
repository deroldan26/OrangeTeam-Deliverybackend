import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetUserByEmailServiceEntryDto } from "../dtos/entry/get-userByEmail-entry.service.dto";
import { GetUserServiceResponseDto } from "../dtos/response/get-user-response.service.dto";
import { IUserRepository } from "../../domain/repositories/user-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { User } from "../../../user/domain/user";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';

export class getUserByEmailService implements IApplicationService<GetUserByEmailServiceEntryDto, GetUserServiceResponseDto>{

    constructor(
        private readonly userRepository:IUserRepository
    ){}
    
    async execute(data: GetUserByEmailServiceEntryDto): Promise<Result<GetUserServiceResponseDto>> {
        const user: Result<User> = await this.userRepository.findUserByEmail(data.email)

        if(user == null || !user.isSuccess()) {
            return Result.fail( user.Error, user.StatusCode, user.Message )
        }
        const response: GetUserServiceResponseDto = {
            id: user.Value.Id.Id,
            username: user.Value.Username.Username,
            email: user.Value.Email.Email,
            password: user.Value.Password.Password,
            phone: user.Value.Phone.Phone
        };
        return Result.success(response, 200);
    }
}