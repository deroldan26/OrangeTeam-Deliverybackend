import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { IProductRepository } from "../../domain/repositories/product-repositories.interface";
import { DomainEvent } from "../../../core/domain/domain.event";
import { MessagingService } from "../../../core/infrastructure/events/rabbitmq/messaging.service";
import { DeleteProductServiceEntryDto } from "../dtos/entry/delete-product-entry.service.dto";
import { DeleteProductServiceResponseDto } from "../dtos/response/delete-product-response.service.dto";
import { productDeletedEvent } from "src/product/domain/events/product.deleted";

export class deleteProductService implements IApplicationService<DeleteProductServiceEntryDto, DeleteProductServiceResponseDto>{
    constructor(
        private readonly productRepository:IProductRepository,
        private readonly messagingService: MessagingService<DomainEvent>   
    ){}
    
    async execute(data: DeleteProductServiceEntryDto): Promise<Result<DeleteProductServiceResponseDto>> {

        const result = await this.productRepository.findProductById(data.id);
        if (!result.isSuccess()){
            return Result.fail<DeleteProductServiceResponseDto>(result.Error, result.StatusCode, result.Message)
        }
        const deleted = await this.productRepository.deleteProductById(data.id);
        if (!deleted.isSuccess()){
            return Result.fail<DeleteProductServiceResponseDto>(deleted.Error, deleted.StatusCode, deleted.Message)
        }
        const response: DeleteProductServiceResponseDto = {
            id: result.Value.Id.Id,
            name: result.Value.Name.Name,
        };
        await this.messagingService.sendMessage('productDeletedEvent', new productDeletedEvent(result.Value.Id, result.Value.Name));
        return Result.success<DeleteProductServiceResponseDto>(response, 200);
    }
}