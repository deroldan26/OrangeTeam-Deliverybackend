import { Entity } from "../../../core/domain/entity";
import { UserID } from "../value-objects/user.id";
import { UserEmail } from "../value-objects/user.email";
import { UserUsername } from "../value-objects/user.username";
import { UserPassword } from "../value-objects/user.password";
import { UserPhone } from "../value-objects/user.phone";

export class User extends Entity<UserID> {
    constructor(id: UserID, email: UserEmail, username: UserUsername, password: UserPassword, phone: UserPhone) {
        super(id);
    }
}