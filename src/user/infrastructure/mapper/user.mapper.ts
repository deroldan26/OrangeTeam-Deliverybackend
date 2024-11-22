import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { User } from "../../domain/user";
import { UserEntity } from "../models/postgres/user.entity";
import { UserID } from "../../domain/value-objects/user.id";
import { UserEmail } from "../../domain/value-objects/user.email";
import { UserUsername } from "../../domain/value-objects/user.username";
import { UserPassword } from "../../domain/value-objects/user.password";
import { UserPhone } from "../../domain/value-objects/user.phone";

export class UserMapper implements IMapper<User, UserEntity> {
    async fromDomainToPersistence(domain: User): Promise<UserEntity> {
        const userORM = new UserEntity();
        userORM.id = domain.Id.Id;
        userORM.email = domain.Email.Email;
        userORM.username = domain.Username.Username;
        userORM.password = domain.Password.Password;
        userORM.phone = domain.Phone.Phone;

        return userORM;
    }

    async fromPersistenceToDomain(persistence: UserEntity): Promise<User> {
        return new User(new UserID(persistence.id), 
            new UserEmail(persistence.email),
            new UserUsername(persistence.username),
            new UserPassword(persistence.password),
            new UserPhone(persistence.phone));
    }
}