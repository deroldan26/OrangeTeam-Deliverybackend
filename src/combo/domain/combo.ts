import { AggregateRoot } from "../../core/domain/aggregate.root";
import { DomainEvent } from "../../core/domain/domain.event";
import { ComboCreatedEvent } from "./events/combo.created";
import { unvalidComboException } from "./exceptions/unvalid.combo";
import { ComboName } from "./value-objects/combo.name";
import { ComboDescription } from "./value-objects/combo.description";
import { ComboImage } from "./value-objects/combo.image";
import { ComboCurrency } from "./value-objects/combo.currency";
import { ComboSpecialPrice } from "./value-objects/combo.specialPrice";
import { ComboID } from "./value-objects/combo.id";
import { ProductID } from "../../product/domain/value-objects/product.id";

export class Combo extends AggregateRoot<ComboID> {
    
    private name: ComboName;
    private description: ComboDescription;
    private comboImage: ComboImage;
    private specialPrice: ComboSpecialPrice;
    private currency: ComboCurrency;
    private products: ProductID[];

    get Name(): ComboName {
        return this.name;
    }

    get Description(): ComboDescription {
        return this.description;
    }

    get ComboImage(): ComboImage {
        return this.comboImage;
    }

    get SpecialPrice(): ComboSpecialPrice {
        return this.specialPrice;
    }

    get Currency(): ComboCurrency {
        return this.currency;
    }

    get Products(): ProductID[] {
        return this.products;
    }

    constructor(
        id: ComboID, 
        name: ComboName, 
        description: ComboDescription, 
        comboImage: ComboImage, 
        specialPrice: ComboSpecialPrice, 
        currency: ComboCurrency,
        products: ProductID[] = []
    ) {
        const comboCreated = ComboCreatedEvent.create(id, name, specialPrice, currency, description, comboImage, products);
        super(id, comboCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof ComboCreatedEvent) {
            this.name = event.name;
            this.description = event.description;
            this.comboImage = event.comboImage;
            this.specialPrice = event.specialPrice;
            this.currency = event.currency;
            this.products = event.products;
        }
    }

    protected checkValidState(): void {
        if (!this.name || !this.description || !this.comboImage || !this.specialPrice || !this.currency) {
            throw new unvalidComboException("Combo not valid");
        }
    }
}