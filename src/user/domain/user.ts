import { AggregateRoot } from "../../core/domain/aggregate.root";
import { DomainEvent } from "../../core/domain/domain.event";
import { UserID } from "./value-objects/user.id";
import { UserEmail } from "./value-objects/user.email";
import { UserName } from "./value-objects/user.name";
import { UserPassword } from "./value-objects/user.password";
import { UserPhone } from "./value-objects/user.phone";
import { UserType } from "./value-objects/user.type";
import { UserImage } from "./value-objects/user.image";
import { userCreatedEvent } from "./events/user.created";
import { unvalidUserException } from "./exceptions/unvalid.user";

export class User extends AggregateRoot<UserID>{
    
    private email: UserEmail
    private name: UserName
    private password: UserPassword
    private phone: UserPhone
    private type: UserType
    private image: UserImage

    get Email (): UserEmail
    {
        return this.email
    }

    get Name (): UserName
    {
        return this.name
    }

    get Password (): UserPassword
    {
        return this.password
    }

    get Phone (): UserPhone
    {
        return this.phone
    }
    
    get Type (): UserType
    {
        return this.type
    }

    get Image (): UserImage
    {
        return this.image
    }
    
    ChangeName(name: UserName): void
    {
        this.name = name;
    }

    ChangeEmail(email: UserEmail): void
    {
        this.email = email;
    }

    ChangePhone(phone: UserPhone): void
    {
        this.phone = phone;
    }

    ChangePassword(password: UserPassword): void
    {
        this.password = password;
    }

    ChangeType(type: UserType): void
    {
        this.type = type;
    }

    ChangeImage(image: UserImage): void
    {
        this.image = image;
    }

    constructor(id: UserID, email: UserEmail, name: UserName, password: UserPassword, phone: UserPhone, type: UserType, image: UserImage){
        const userCreated = userCreatedEvent.create(id, email, name, password, phone, type, image);
        
        super(id,userCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof userCreatedEvent) {
            this.email = event.email
            this.name = event.username
            this.password = event.password
            this.phone = event.phone
            this.type = event.type
            this.image = event.image
        }
    }
    protected checkValidState (): void{
        if ( !this.email || !this.name || !this.password || !this.phone || !this.type || !this.image)
            throw new unvalidUserException(`User not valid`)
    }
}