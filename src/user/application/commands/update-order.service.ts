import { IApplicationService } from "src/core/application/service/application-service.interface";
import { UpdateUserServiceEntryDto } from "../dtos/entry/update-user-entry.service.dto";
import { UpdateUserServiceResponseDto } from "../dtos/response/update-user-response.service.dto";
import { Result } from "src/core/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repositories.interface";
import { UserName } from "src/user/domain/value-objects/user.name";
import { UserEmail } from "src/user/domain/value-objects/user.email";
import { UserPassword } from "src/user/domain/value-objects/user.password";
import { UserPhone } from "src/user/domain/value-objects/user.phone";
import { UserType } from "src/user/domain/value-objects/user.type";
import { BcryptService } from "src/core/infrastructure/bcrypt/bcrypt.service";

export class UpdateUserService implements IApplicationService<UpdateUserServiceEntryDto, UpdateUserServiceResponseDto>{

    constructor(
        private readonly userRepository:IUserRepository,
        private readonly bcryptService: BcryptService
    ) {}

    async execute(data: UpdateUserServiceEntryDto): Promise<Result<UpdateUserServiceResponseDto>> {
        const result = await this.userRepository.findUserById(data.id);
        if (!result.isSuccess()){
            return Result.fail<UpdateUserServiceResponseDto>(result.Error, result.StatusCode, result.Message)
        }

        if(data.name) result.Value.ChangeName(new UserName(data.name));
        if(data.email) result.Value.ChangeEmail(new UserEmail(data.email));
        if(data.phone) result.Value.ChangePhone(new UserPhone(data.phone));
        if(data.type) result.Value.ChangeType(new UserType(data.type));

        if(data.password){
            data.password = await this.bcryptService.hash(data.password);
            result.Value.ChangePassword(new UserPassword(data.password));
        }

        const update = await this.userRepository.saveUserAggregate(result.Value);
        if (!update.isSuccess()){
            return Result.fail<UpdateUserServiceResponseDto>(update.Error, update.StatusCode, update.Message)
        }

        const response: UpdateUserServiceResponseDto = {
            id: result.Value.Id.Id,
            name: result.Value.Name.Name,
            email: result.Value.Email.Email,
            password: result.Value.Password.Password,
            phone: result.Value.Phone.Phone,
            type: result.Value.Type.Type
        }

        return Result.success<UpdateUserServiceResponseDto>(response, 200);
    }
}