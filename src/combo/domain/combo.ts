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
import { ComboWeight } from "./value-objects/combo.weight";
import { ComboMeasurement } from "./value-objects/combo.measurement";
import { ComboStock } from "./value-objects/combo.stock";
import { ComboCaducityDate } from "./value-objects/combo.caducityDate";
import { CategoryID } from "src/category/domain/value-objects/category.id";
import { DiscountID } from "src/discount/domain/value-objects/discount.id";

export class Combo extends AggregateRoot<ComboID> {
    
    private name: ComboName;
    private description: ComboDescription;
    private comboImages: ComboImage[];
    private specialPrice: ComboSpecialPrice;
    private currency: ComboCurrency;
    private weight: ComboWeight;
    private measurement: ComboMeasurement;
    private stock: ComboStock;
    private caducityDate?: ComboCaducityDate;
    private categories: CategoryID[];
    private products: ProductID[];
    private discount?: DiscountID;

    get Name(): ComboName {
        return this.name;
    }

    get Description(): ComboDescription {
        return this.description;
    }

    get ComboImages(): ComboImage[] {
        return this.comboImages;
    }

    get SpecialPrice(): ComboSpecialPrice {
        return this.specialPrice;
    }

    get Currency(): ComboCurrency {
        return this.currency;
    }

    get Weight(): ComboWeight {
        return this.weight;
    }

    get Measurement(): ComboMeasurement {
        return this.measurement;
    }

    get Stock(): ComboStock {
        return this.stock;
    }

    get CaducityDate(): ComboCaducityDate {
        return this.caducityDate;
    }

    get Categories(): CategoryID[] {
        return this.categories;
    }

    get Products(): ProductID[] {
        return this.products;
    }

    get Discount(): DiscountID {
        return this.discount;
    }

    constructor(
        id: ComboID, 
        name: ComboName, 
        description: ComboDescription, 
        comboImages: ComboImage[], 
        specialPrice: ComboSpecialPrice, 
        currency: ComboCurrency,
        products: ProductID[] = [],
        weight: ComboWeight,
        measurement: ComboMeasurement,
        stock: ComboStock,
        caducityDate?: ComboCaducityDate,
        categories: CategoryID[] = [],
        discount?: DiscountID
    ) {
        const comboCreated = ComboCreatedEvent.create(id, name, specialPrice, currency, description, comboImages, products, weight, measurement, stock, categories, caducityDate, discount);
        super(id, comboCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof ComboCreatedEvent) {
            this.name = event.name;
            this.description = event.description;
            this.comboImages = event.comboImages;
            this.specialPrice = event.specialPrice;
            this.currency = event.currency;
            this.products = event.products;
            this.weight = event.weight;
            this.measurement = event.measurement;
            this.stock = event.stock;
            this.caducityDate = event.caducityDate;
            this.categories = event.categories;
            this.discount = event.discount;
        }
    }

    protected checkValidState(): void {
        if (!this.name || !this.description || !this.comboImages || !this.specialPrice || !this.currency || !this.weight || !this.measurement || !this.stock) {
            throw new unvalidComboException("Combo not valid");
        }
    }
}