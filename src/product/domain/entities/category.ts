import { Entity } from "src/core/domain/entity";
import { CategoryID } from "../value-objects/category.id";
import { CategoryName } from "../value-objects/category.name";
import { CategoryImage } from "../value-objects/category.image";

export class Category extends Entity<CategoryID> {
    constructor(id: CategoryID, name: CategoryName, image: CategoryImage) {
        super(id);
    }
}