import { getComboByIdService } from "../../src/combo/application/queries/get-comboById.service";
import { ComboRepositoryMock } from "../../test/common/repository-mocks/combo.repository.mock";
import { GetComboByIdServiceEntryDto } from "../../src/combo/application/dtos/entry/get-comboById-entry.service.dto";
import { ImageHandlerMock } from "../../test/common/other-mocks/image.handler.mock";
import { ComboMock } from "../../test/common/objects-mocks/combo.mock";


describe('getComboByIdService', () => {

    it('should return a combo by id', async () => {
        const repository = ComboRepositoryMock.create();
        const combo = await ComboMock.getComboMock();
 
        await repository.saveComboAggregate(combo);

        const imageHandlerMock = ImageHandlerMock.create();
        const service = new getComboByIdService(repository, imageHandlerMock);

        const data: GetComboByIdServiceEntryDto = {
            id: combo.Id.Id
        };

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeTruthy();
    });

    it('should return an error, the combo does not exists', async () => {
        const repository = ComboRepositoryMock.create();
        const combo = await ComboMock.getComboMock();

        const imageHandlerMock = ImageHandlerMock.create();
        const service = new getComboByIdService(repository, imageHandlerMock);

        const data: GetComboByIdServiceEntryDto = {
            id: combo.Id.Id
        };

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeFalsy();
    });

});