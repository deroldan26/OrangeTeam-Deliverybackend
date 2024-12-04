import { AggregateRoot } from "../../core/domain/aggregate.root";
import { DomainEvent } from "../../core/domain/domain.event";
import { CategoryCreatedEvent } from "./events/category.created";
import { unvalidCategoryException } from "./exceptions/unvalid.category";
import { CategoryName } from "./value-objects/category.name";
import { CategoryImage } from "./value-objects/category.image";
import { CategoryID } from "./value-objects/category.id";


export class Category extends AggregateRoot<CategoryID> {
    
    private name: CategoryName;
    private image: CategoryImage;

    get Name(): CategoryName {
        return this.name;
    }

    get Image(): CategoryImage {
        return this.image;
    }

    constructor(
        id: CategoryID, 
        name: CategoryName, 
        image: CategoryImage, 
    ) {
        const categoryCreated = CategoryCreatedEvent.create(id, name, image);
        super(id, categoryCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof CategoryCreatedEvent) {
            this.name = event.name;
            this.image = event.image;
        }
    }

    protected checkValidState(): void {
        if (!this.name || !this.image) {
            throw new unvalidCategoryException("Category not valid");
        }
    }
}