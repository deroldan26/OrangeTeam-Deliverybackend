import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { Category } from "../../domain/category";
import { CategoryEntity } from "../models/postgres/category.entity";
import { CategoryID } from "../../domain/value-objects/category.id";
import { CategoryName } from "../../domain/value-objects/category.name";
import { CategoryImage } from '../../domain/value-objects/category.image';

export class CategoryMapper implements IMapper<Category, CategoryEntity> {
  
    async fromDomainToPersistence(domain: Category): Promise<CategoryEntity> {
        const categoryORM = new CategoryEntity();
        categoryORM.id = domain.Id.Id;
        categoryORM.name = domain.Name.Name;
        categoryORM.image = domain.Image.Image;
        
        return categoryORM;
    }

    async fromPersistenceToDomain(persistence: CategoryEntity): Promise<Category> {
        return new Category(
            new CategoryID(persistence.id),
            new CategoryName(persistence.name),
            new CategoryImage(persistence.image)
        );
    }
}
