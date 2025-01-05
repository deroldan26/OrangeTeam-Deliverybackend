import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../controller/product.controller';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductPostgresRepository } from '../repositories/postgres/product.repository';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { DataSource } from 'typeorm';
import { createProductService } from '../../application/commands/create-product.service';
import { getProductByIdService } from '../../application/queries/get-productById.service';
import { FindPaginatedProductDto } from '../dto/find-paginated-product.dto';
import { GetPaginatedProductService } from '../../application/queries/get-paginatedProduct.service';
import { MessagingService } from '../../../core/infrastructure/events/rabbitmq/messaging.service';
import { DomainEvent } from '../../../core/domain/domain.event';
import { CategoryValidatorService } from '../../../category/application/services/category-validator.services';
import { DiscountValidatorService } from '../../../discount/application/services/discount-validator.services';
import { CategoryPostgresRepository } from '../../../category/infraestructure/repositories/postgres/category.repository';
import { DiscountPostgresRepository } from '../../../discount/infraestructure/repositories/postgres/discount.repository';
import { IImageHandler } from 'src/core/application/image.handler/image.handler';
import { ImageUrlGenerator } from 'src/core/infrastructure/image.url.generator/image.url.generator';
import { AuditPostgresRepository } from 'src/audit/infrastructure/repositories/postgres/audit.repository';
import { Result } from 'src/core/domain/result-handler/result';
import { Product } from 'src/product/domain/product';
import { CreateProductServiceResponseDto } from 'src/product/application/dtos/response/create-product-response.service.dto';
import { GetPaginatedProductServiceResponseDto } from 'src/product/application/dtos/response/get-paginated-product-response.service';

describe('ProductController', () => {
  let controller: ProductController;
  let getPaginatedProductService: GetPaginatedProductService;
  let productRepository: ProductPostgresRepository;
  let auditRepository: AuditPostgresRepository;
  let uuidCreator: UuidGenerator;
  let categoryValidator: CategoryValidatorService;
  let discountValidator: DiscountValidatorService;
  let imageHandler: IImageHandler;
  let messagingService: MessagingService<DomainEvent>;

  beforeEach(async () => {
    const mockDataSource = { createEntityManager: jest.fn().mockReturnValue({ /* mock entity manager */ }), };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: 'DataSource',
          useValue: mockDataSource,
        },
        MessagingService,
        UuidGenerator,
        ProductPostgresRepository,
        AuditPostgresRepository,
        CategoryValidatorService,
        DiscountValidatorService,
        ImageUrlGenerator,
      ],
    }).overrideProvider('DataSource').useValue(mockDataSource)
    .compile();

    controller = module.get<ProductController>(ProductController);
    getPaginatedProductService = module.get<GetPaginatedProductService>(GetPaginatedProductService);
    productRepository = module.get<ProductPostgresRepository>(ProductPostgresRepository);
    auditRepository = module.get<AuditPostgresRepository>(AuditPostgresRepository);
    uuidCreator = module.get<UuidGenerator>(UuidGenerator);
    categoryValidator = module.get<CategoryValidatorService>(CategoryValidatorService);
    discountValidator = module.get<DiscountValidatorService>(DiscountValidatorService);
    imageHandler = module.get<IImageHandler>(ImageUrlGenerator);
    messagingService = module.get<MessagingService<DomainEvent>>(MessagingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findPaginatedProduct', () => {
    it('should return a list of products', async () => {
      const findPaginatedProductDto: FindPaginatedProductDto = {
        page: 1,
        take: 10,
      };

      const result: GetPaginatedProductServiceResponseDto = {
        products: []
      };

      jest.spyOn(GetPaginatedProductService.prototype, 'execute').mockImplementation(async () => Result.success(result, 200));

      expect(await controller.findPaginatedProduct(findPaginatedProductDto)).toBe(result);

      // const result = { /* resultado esperado */ };

      // jest.spyOn(GetPaginatedProductService.prototype, 'execute').mockImplementation(async () => result);

      // expect(await controller.findPaginatedProduct(findPaginatedProductDto)).toBe(result);
    });
  })

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      images: ['image1.jpg'],
      price: 100,
      categories: ['category-id'],
      discount: 'discount-id',
      stock: 10,
      weight: 1.5,
      currency: 'USD',
      measurement: 'kg',
    };
    const result: CreateProductServiceResponseDto = {
      id: 'product-id',
      name: 'Test Product',
      description: 'Test Description',
      images: ['image1.jpg'],
      price: 100,
      categories: ['category-id'],
      discount: 'discount-id',
      stock: 10,
      weight: 1.5,
      currency: 'USD',
      measurement: 'kg',
    };

    jest.spyOn(createProductService.prototype, 'execute').mockImplementation(async () => Result.success(result, 200));

    expect(await controller.createProduct(createProductDto)).toBe(result);
  });

  // Agrega más tests según sea necesario
});
