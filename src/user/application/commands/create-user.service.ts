import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { CreateUserServiceEntryDto } from "../dtos/entry/create-user-entry.service.dto";
import { Result } from "../../../core/domain/result-handler/result";
import { CreateUserServiceResponseDto } from "../dtos/response/create-product-response.service.dto";
import { IUserRepository } from "../../domain/repositories/user-repositories.interface";
import { IdGenerator } from "../../../core/application/id.generator/id.generator";
import { User } from "../../../user/domain/user";
import { UserID } from "src/user/domain/value-objects/user.id";
import { UserName } from "src/user/domain/value-objects/user.name";
import { UserEmail } from "src/user/domain/value-objects/user.email";
import { UserPassword } from "src/user/domain/value-objects/user.password";
import { UserPhone } from "src/user/domain/value-objects/user.phone";
import { UserType } from "src/user/domain/value-objects/user.type";
import { BcryptService } from "../../../core/infrastructure/bcrypt/bcrypt.service";
import { IImageHandler } from "src/core/application/image.handler/image.handler";
import { UserImage } from "src/user/domain/value-objects/user.image";

export class createUserService implements IApplicationService<CreateUserServiceEntryDto, CreateUserServiceResponseDto>{
    constructor(
        private readonly userRepository:IUserRepository,
        private readonly idGenerator: IdGenerator<string>, 
        private readonly imageHandler: IImageHandler
    ){}
    
    async execute(data: CreateUserServiceEntryDto): Promise<Result<CreateUserServiceResponseDto>> {
        
        data.password = await new BcryptService().hash(data.password);
        const url = await this.imageHandler.UploadImage("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=");
        const user = new User(
            new UserID(await this.idGenerator.generateId()), 
            new UserEmail(data.email),
            new UserName(data.name),
            new UserPassword(data.password),
            new UserPhone(data.phone),
            new UserType(data.type),
            new UserImage(url));
        const result = await this.userRepository.saveUserAggregate(user);
        if ( !result.isSuccess() ){
            return Result.fail<CreateUserServiceResponseDto>( result.Error, result.StatusCode, result.Message )
        }
        const response: CreateUserServiceResponseDto = {
            id: user.Id.Id
        };

        return Result.success<CreateUserServiceResponseDto>(response, 200);
    }
}