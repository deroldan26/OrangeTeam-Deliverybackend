import { UuidGenerator } from "../../../src/core/infrastructure/id.generator.ts/uuid-generator";
import { Combo } from "../../../src/combo/domain/combo";
import { ComboID } from "../../../src/combo/domain/value-objects/combo.id";
import { ComboImage } from "../../../src/combo/domain/value-objects/combo.image";
import { ComboName } from "../../../src/combo/domain/value-objects/combo.name";
import { ComboSpecialPrice } from "../../../src/combo/domain/value-objects/combo.specialPrice";
import { ComboStock } from "../../../src/combo/domain/value-objects/combo.stock";
import { ComboDescription } from "../../../src/combo/domain/value-objects/combo.description";
import { ComboCurrency } from "../../../src/combo/domain/value-objects/combo.currency";
import { ComboCaducityDate } from "../../../src/combo/domain/value-objects/combo.caducityDate";
import { ComboMeasurement } from "../../../src/combo/domain/value-objects/combo.measurement";
import { ComboWeight } from "../../../src/combo/domain/value-objects/combo.weight";
import { DiscountID } from "../../../src/discount/domain/value-objects/discount.id";
import { ProductID } from "../../../src/product/domain/value-objects/product.id";
import { CategoryID } from "../../../src/category/domain/value-objects/category.id";


export class ComboMock {

    static async getComboMock(): Promise<Combo> {
        const idGenerator = new UuidGenerator();

        const combo = new Combo(
            new ComboID(await idGenerator.generateId()),
            new ComboName("Combo de prueba"),
            new ComboDescription("Descripcion de prueba"),
            [new ComboImage("www.imagenGenerica.com")],
            new ComboSpecialPrice(100),
            new ComboCurrency("USD"),
            [new ProductID( await idGenerator.generateId())], 
            new ComboWeight(100),
            new ComboMeasurement("Kg"),
            new ComboStock(10),
            new ComboCaducityDate(new Date('2050-01-01')),
            [new CategoryID( await idGenerator.generateId())], 
            new DiscountID(await idGenerator.generateId()),
        );
        return combo;
    }

    static create(){
        return new ComboMock();
    }
}