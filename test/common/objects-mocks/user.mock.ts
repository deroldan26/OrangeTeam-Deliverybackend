import { UuidGenerator } from "../../../src/core/infrastructure/id.generator.ts/uuid-generator";
import { User } from "../../../src/user/domain/user";
import { UserID } from "../../../src/user/domain/value-objects/user.id";
import { UserEmail } from "../../../src/user/domain/value-objects/user.email";
import { UserPassword } from "../../../src/user/domain/value-objects/user.password";
import { UserName } from "../../../src/user/domain/value-objects/user.name";
import { UserPhone } from "../../../src/user/domain/value-objects/user.phone";
import { UserImage } from "../../../src/user/domain/value-objects/user.image";
import { UserType } from "../../../src/user/domain/value-objects/user.type";

export class UserMock {

    static async getUserMock(): Promise<User> {
        const idGenerator = new UuidGenerator();

        const user = new User(
            new UserID( await idGenerator.generateId()),
            new UserEmail("test@gmail.com"),
            new UserName("User Name"),
            new UserPassword("123456"),
            new UserPhone("123456789"),
            new UserType("Admin"),
            new UserImage("www.imagenGenerica.com")
        );
        return user;
    }

    static create(){
        return new UserMock();
    }
}