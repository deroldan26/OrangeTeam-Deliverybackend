import { Result } from '../../../core/domain/result-handler/result';
import { User } from '../user';

export interface IUserRepository {
  findUserById(id: string): Promise<Result<User>>;
  findUserByEmail(email: string): Promise<Result<User>>;
  saveUserAggregate(user: User): Promise<Result<User>>;
}