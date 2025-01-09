import { DomainEvent } from "../../../core/domain/domain.event";
import { UserID } from "../value-objects/user.id";
import { UserEmail } from "../value-objects/user.email";
import { UserName } from "../value-objects/user.name";
import { UserPassword } from "../value-objects/user.password";
import { UserPhone } from "../value-objects/user.phone";
import { UserType } from "../value-objects/user.type";
import { UserImage } from "../value-objects/user.image";
import { unvalidUserException } from "../exceptions/unvalid.user";

export class userCreatedEvent extends DomainEvent{
    protected constructor(
        public id: UserID,
        public email: UserEmail,
        public username: UserName,
        public password: UserPassword,
        public phone: UserPhone,
        public type: UserType,
        public image: UserImage

    ){
        super()
    }
    static create(id: UserID, email: UserEmail, username: UserName, password: UserPassword, phone: UserPhone, type: UserType, image: UserImage): userCreatedEvent{
        return new userCreatedEvent(id, email, username, password, phone, type, image);
    }
}