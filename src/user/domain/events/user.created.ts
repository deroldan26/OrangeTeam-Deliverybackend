import { DomainEvent } from "../../../core/domain/domain.event";
import { UserID } from "../value-objects/user.id";
import { UserEmail } from "../value-objects/user.email";
import { UserUsername } from "../value-objects/user.username";
import { UserPassword } from "../value-objects/user.password";
import { UserPhone } from "../value-objects/user.phone";
import { unvalidUserException } from "../exceptions/unvalid.user";

export class userCreatedEvent extends DomainEvent{
    protected constructor(
        public id: UserID,
        public email: UserEmail,
        public username: UserUsername,
        public password: UserPassword,
        public phone: UserPhone

    ){
        super()
    }
    static create(id: UserID, email: UserEmail, username: UserUsername, password: UserPassword, phone: UserPhone): userCreatedEvent{
        return new userCreatedEvent(id, email, username, password, phone);
    }
}