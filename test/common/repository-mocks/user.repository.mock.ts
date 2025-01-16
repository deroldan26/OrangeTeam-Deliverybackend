import { Result } from "../../../src/core/domain/result-handler/result";
import { IUserRepository } from "../../../src/user/domain/repositories/user-repositories.interface";
import { User } from "src/user/domain/user";
import { ProductID } from "../../../src/product/domain/value-objects/product.id";

export class UserRepositoryMock implements IUserRepository {

    private readonly users: User[] = [];

    async findUserById(id: string): Promise<Result<User>> {
        try{
            for (let i = 0; i < this.users.length; i++) {
                const user = this.users[i];
                if (user.Id.Id == id) {
                    return Result.success<User>(user, 200)
                }
            }
            throw new Error(`User with ID ${id} not found`);
        }catch(error){
            return Result.fail<User>(new Error(error.message), error.code, error.message);
        }
    }

    async findUserByEmail(email: string): Promise<Result<User>> {
        try{
            for (let i = 0; i < this.users.length; i++) {
                const user = this.users[i];
                if (user.Email.Email == email) {
                    return Result.success<User>(user, 200)
                }
            }
            throw new Error(`User with email ${email} not found`);
        }catch(error){
            return Result.fail<User>(new Error(error.message), error.code, error.message);
        }
    }

    async saveUserAggregate(user: User): Promise<Result<User>> {
        this.users.push(user);
        return Result.success<User>(user, 200);
    }

    static create(){
        return new UserRepositoryMock();
    }
}