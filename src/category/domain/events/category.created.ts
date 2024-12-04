import { DomainEvent } from "../../../core/domain/domain.event";
import { CategoryName } from "../value-objects/category.name";
import { CategoryImage } from "../value-objects/category.image";
import { CategoryID } from "../value-objects/category.id";


export class CategoryCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: CategoryID,
    public readonly name: CategoryName,
    public readonly image: CategoryImage,
  ) {
    super();
  }

  static create(
    id: CategoryID,
    name: CategoryName,
    image: CategoryImage,
  ): CategoryCreatedEvent {
    return new CategoryCreatedEvent(id, name, image);
  }
}
