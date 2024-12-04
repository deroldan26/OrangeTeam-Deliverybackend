import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { User } from "../../domain/user";
import { UserEntity } from "../models/postgres/user.entity";
import { UserID } from "../../domain/value-objects/user.id";
import { UserEmail } from "../../domain/value-objects/user.email";
import { UserName } from "../../domain/value-objects/user.name";
import { UserPassword } from "../../domain/value-objects/user.password";
import { UserPhone } from "../../domain/value-objects/user.phone";
import { UserType } from "../../domain/value-objects/user.type";

export class UserMapper implements IMapper<User, UserEntity> {
    async fromDomainToPersistence(domain: User): Promise<UserEntity> {
        const userORM = new UserEntity();
        userORM.id = domain.Id.Id;
        userORM.email = domain.Email.Email;
        userORM.name = domain.Name.Name;
        userORM.password = domain.Password.Password;
        userORM.phone = domain.Phone.Phone;
        userORM.type = domain.Type.Type;

        return userORM;
    }

    async fromPersistenceToDomain(persistence: UserEntity): Promise<User> {
        return new User(new UserID(persistence.id), 
            new UserEmail(persistence.email),
            new UserName(persistence.name),
            new UserPassword(persistence.password),
            new UserPhone(persistence.phone),
            new UserType(persistence.type));
    }
}