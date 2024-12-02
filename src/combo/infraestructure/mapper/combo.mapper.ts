import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { Combo } from "../../domain/combo";
import { ComboEntity } from "../models/postgres/combo.entity";
import { ComboID } from "../../domain/value-objects/combo.id";
import { ComboName } from "../../domain/value-objects/combo.name";
import { ComboDescription } from "../../domain/value-objects/combo.description";
import { ComboImage } from '../../domain/value-objects/combo.image';
import { ComboSpecialPrice } from "../../domain/value-objects/combo.specialPrice";
import { ComboCurrency } from "../../domain/value-objects/combo.currency";
import { ProductID } from "../../../product/domain/value-objects/product.id";
import { ComboWeight } from "src/combo/domain/value-objects/combo.weight";
import { ComboMeasurement } from "src/combo/domain/value-objects/combo.measurement";
import { ComboStock } from "src/combo/domain/value-objects/combo.stock";
import { ComboCaducityDate } from "src/combo/domain/value-objects/combo.caducityDate";
import { CategoryID } from "src/category/domain/value-objects/category.id";

export class ComboMapper implements IMapper<Combo, ComboEntity> {
  
    async fromDomainToPersistence(domain: Combo): Promise<ComboEntity> {
        const comboORM = new ComboEntity();
        comboORM.id = domain.Id.Id;
        comboORM.name = domain.Name.Name;
        comboORM.description = domain.Description.Description;
        comboORM.comboImages = domain.ComboImages.map(image => image.Image)
        comboORM.specialPrice = domain.SpecialPrice.Price;
        comboORM.currency = domain.Currency.Currency;
        comboORM.products = domain.Products.map(product => product.Id);
        comboORM.weight = domain.Weight.Weight;
        comboORM.measurement = domain.Measurement.Measurement;
        comboORM.stock = domain.Stock.Stock;
        if (domain.CaducityDate) {
            comboORM.caducityDate = domain.CaducityDate.CaducityDate;
        }
        comboORM.categories = domain.Categories.map(category => category.Id);
        
        return comboORM;
    }

    async fromPersistenceToDomain(persistence: ComboEntity): Promise<Combo> {
        return new Combo(
            new ComboID(persistence.id),
            new ComboName(persistence.name),
            new ComboDescription(persistence.description),
            persistence.comboImages.map(imageUrl => new ComboImage(imageUrl)),
            new ComboSpecialPrice(persistence.specialPrice),
            new ComboCurrency(persistence.currency),
            persistence.products.map(productId => new ProductID(productId)),
            new ComboWeight(persistence.weight),
            new ComboMeasurement(persistence.measurement),
            new ComboStock(persistence.stock),
            persistence.caducityDate ? new ComboCaducityDate(persistence.caducityDate) : undefined, 
            persistence.categories.map(categoryId => new CategoryID(categoryId))
        );
    }
}
