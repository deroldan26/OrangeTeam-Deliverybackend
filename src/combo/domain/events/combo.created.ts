import { DomainEvent } from "../../../core/domain/domain.event";
import { ComboID } from "../value-objects/combo.id";
import { ComboName } from "../value-objects/combo.name";
import { ComboSpecialPrice } from "../value-objects/combo.specialPrice";
import { ComboCurrency } from "../value-objects/combo.currency";
import { ComboDescription } from "../value-objects/combo.description";
import { ComboImage } from "../value-objects/combo.image";
import { ProductID } from "../../../product/domain/value-objects/product.id";
import { ComboWeight } from "../value-objects/combo.weight";
import { ComboMeasurement } from "../value-objects/combo.measurement";
import { ComboStock } from "../value-objects/combo.stock";
import { ComboCaducityDate } from "../value-objects/combo.caducityDate";
import { CategoryID } from "src/category/domain/value-objects/category.id";

export class ComboCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: ComboID,
    public readonly name: ComboName,
    public readonly specialPrice: ComboSpecialPrice,
    public readonly currency: ComboCurrency,
    public readonly description: ComboDescription,
    public readonly comboImages: ComboImage[],
    public readonly products: ProductID[],
    public readonly weight: ComboWeight,
    public readonly measurement: ComboMeasurement,
    public readonly stock: ComboStock,
    public readonly categories: CategoryID[],
    public readonly caducityDate?: ComboCaducityDate,
    
  ) {
    super();
  }

  static create(
    id: ComboID,
    name: ComboName,
    specialPrice: ComboSpecialPrice,
    currency: ComboCurrency,
    description: ComboDescription,
    comboImages: ComboImage[],
    products: ProductID[],
    weight: ComboWeight,
    measurement: ComboMeasurement,
    stock: ComboStock,
    categories: CategoryID[],
    caducityDate?: ComboCaducityDate,
    
  ): ComboCreatedEvent {
    return new ComboCreatedEvent(id, name, specialPrice, currency, description, comboImages, products, weight, measurement, stock, categories, caducityDate);
  }
}
