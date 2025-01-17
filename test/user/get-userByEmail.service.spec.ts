import { UserRepositoryMock } from "../../test/common/repository-mocks/user.repository.mock";
import { UserMock } from "../../test/common/objects-mocks/user.mock";
import { ImageHandlerMock } from "../../test/common/other-mocks/image.handler.mock";
import { getUserByEmailService } from "../../src/user/application/queries/get-userByEmail.service";
import { GetUserByEmailServiceEntryDto } from "../../src/user/application/dtos/entry/get-userByEmail-entry.service.dto";

describe('getUserByIdService', () => {

    it('should return a user by his email', async () => {
        const repository = UserRepositoryMock.create();
        const user = await UserMock.getUserMock();

        await repository.saveUserAggregate(user);
        
        const imageHandlerMock = ImageHandlerMock.create();
        const service = new getUserByEmailService(repository, imageHandlerMock);

        const data: GetUserByEmailServiceEntryDto = {
            email: user.Email.Email
        };

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeTruthy();
    });

    it('should return an error, the product does not exists', async () => {
        const repository = UserRepositoryMock.create();
        const user = await UserMock.getUserMock();
        
        const imageHandlerMock = ImageHandlerMock.create();
        const service = new getUserByEmailService(repository, imageHandlerMock);

        const data: GetUserByEmailServiceEntryDto = {
            email: user.Email.Email
        };

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeFalsy();
    });

});