import { Result } from '../../../../core/domain/result-handler/result';
import { User } from '../../../domain/user';
import { IUserRepository } from '../../../domain/repositories/user-repositories.interface';
import { UserEntity as UserORM } from '../../../infrastructure/models/postgres/user.entity';
import { DataSource, Repository } from "typeorm";
import { UserMapper } from '../../mapper/user.mapper';

export class UserPostgresRepository extends Repository<UserORM> implements IUserRepository{
    private readonly userMapper: UserMapper;
  
    constructor(dataSource: DataSource) {
      super(UserORM, dataSource.createEntityManager());
      this.userMapper = new UserMapper();
    }

    async findUserById(id: string): Promise<Result<User>> {
      try {
        var user = await this.createQueryBuilder('User').select(['User.id','User.name','User.email','User.password','User.phone','User.type','User.image']).where('User.id = :id',{id}).getOne()
        const getUser = await this.userMapper.fromPersistenceToDomain(user);
        return Result.success<User>(getUser, 200)
      } catch (error) {
        console.log(error.message);
        return Result.fail<User>(new Error(error.message), error.code, error.message);
      }
    }

    async findUserByEmail(email: string): Promise<Result<User> | null> {
      try {
        var user = await this.createQueryBuilder('User').select(['User.id','User.name','User.email','User.password','User.phone','User.type','User.image']).where('User.email = :email',{email}).getOne()
        if(user){
          const getUser = await this.userMapper.fromPersistenceToDomain(user);
          return Result.success<User>(getUser, 200)
        }
        return null;
      } catch (error) {
        console.log(error.message);
        return Result.fail<User>(new Error(error.message), error.code, error.message);
      }
    }

    async saveUserAggregate(user: User): Promise<Result<User>> {
      try {
        const newUser = await this.userMapper.fromDomainToPersistence(user);
        await this.save(newUser);
        return Result.success<User>(user, 200);
      } catch (error) {
        return Result.fail<User>(new Error(error.message), error.code, error.message);
      }
    }
}