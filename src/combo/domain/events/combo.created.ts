import { DomainEvent } from "../../../core/domain/domain.event";
import { ComboID } from "../value-objects/combo.id";
import { ComboName } from "../value-objects/combo.name";
import { ComboSpecialPrice } from "../value-objects/combo.specialPrice";
import { ComboCurrency } from "../value-objects/combo.currency";
import { ComboDescription } from "../value-objects/combo.description";
import { ComboImage } from "../value-objects/combo.image";
import { ProductID } from "../../../product/domain/value-objects/product.id";

export class ComboCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: ComboID,
    public readonly name: ComboName,
    public readonly specialPrice: ComboSpecialPrice,
    public readonly currency: ComboCurrency,
    public readonly description: ComboDescription,
    public readonly comboImage: ComboImage,
    public readonly products: ProductID[]
  ) {
    super();
  }

  static create(
    id: ComboID,
    name: ComboName,
    specialPrice: ComboSpecialPrice,
    currency: ComboCurrency,
    description: ComboDescription,
    comboImage: ComboImage,
    products: ProductID[]
  ): ComboCreatedEvent {
    return new ComboCreatedEvent(id, name, specialPrice, currency, description, comboImage, products);
  }
}
