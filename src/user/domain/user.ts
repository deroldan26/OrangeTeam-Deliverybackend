import { AggregateRoot } from "../../core/domain/aggregate.root";
import { DomainEvent } from "../../core/domain/domain.event";
import { UserID } from "./value-objects/user.id";
import { UserEmail } from "./value-objects/user.email";
import { UserUsername } from "./value-objects/user.username";
import { UserPassword } from "./value-objects/user.password";
import { UserPhone } from "./value-objects/user.phone";
import { userCreatedEvent } from "./events/user.created";
import { unvalidUserException } from "./exceptions/unvalid.user";

export class User extends AggregateRoot<UserID>{
    
    private email: UserEmail
    private username: UserUsername
    private password: UserPassword
    private phone: UserPhone

    get Email (): UserEmail
    {
        return this.email
    }

    get Username (): UserUsername
    {
        return this.username
    }

    get Password (): UserPassword
    {
        return this.password
    }

    get Phone (): UserPhone
    {
        return this.phone
    }
    
    constructor(id: UserID, email: UserEmail, username: UserUsername, password: UserPassword, phone: UserPhone){
        const userCreated = userCreatedEvent.create(id, email, username, password, phone);
        
        super(id,userCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof userCreatedEvent) {
            this.email = event.email
            this.username = event.username
            this.password = event.password
            this.phone = event.phone
          }
    }
    protected checkValidState (): void{
        if ( !this.email || !this.username || !this.password || !this.phone)
            throw new unvalidUserException(`User not valid`)
    }
}