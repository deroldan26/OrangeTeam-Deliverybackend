import { Repository, DataSource } from "typeorm";
import { Result } from "../../../../core/domain/result-handler/result";
import { Category } from "../../../domain/category";
import { ICategoryRepository } from "../../../domain/repositories/category-repositories.interface";
import { CategoryEntity as CategoryORM } from "../../models/postgres/category.entity";
import { CategoryMapper } from "../../mapper/category.mapper";

export class CategoryPostgresRepository extends Repository<CategoryORM> implements ICategoryRepository {
    private readonly categoryMapper: CategoryMapper;

    constructor(dataSource: DataSource) {
        super(CategoryORM, dataSource.createEntityManager());
        this.categoryMapper = new CategoryMapper();
    }

    async findCategoryById(id: string): Promise<Result<Category>>{return}

    async findPaginatedCategory(page: number, take: number): Promise<Result<Category[]>>{
        try {
            const skip = page * take - take;
            const category = await this.createQueryBuilder('Category').select(['Category.id','Category.name','Category.image']).skip(skip).take(take).getMany();
            const response = await Promise.all(category.map(category => this.categoryMapper.fromPersistenceToDomain(category)));
            return Result.success<Category[]>(response,200)
          } catch (error) {
            return Result.fail(error, 400, error.message);
          }
    }

    async saveCategoryAggregate(category: Category): Promise<Result<Category>>
    {
        try {
            const newCategory = await this.categoryMapper.fromDomainToPersistence(category);
            await this.save(newCategory);
            return Result.success<Category>(category, 200);
        } catch (error) {
            return Result.fail<Category>(new Error(error.message), error.code, error.message);
        }
    }
}