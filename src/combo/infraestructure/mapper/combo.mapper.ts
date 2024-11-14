import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { Combo } from "../../domain/combo";
import { ComboEntity } from "../models/postgres/combo.entity";
import { ComboID } from "../../domain/value-objects/combo.id";
import { ComboName } from "../../domain/value-objects/combo.name";
import { ComboDescription } from "../../domain/value-objects/combo.description";
import { ComboImage } from '../../domain/value-objects/combo.image';
import { ComboSpecialPrice } from "../../domain/value-objects/combo.specialPrice";
import { ComboCurrency } from "../../domain/value-objects/combo.currency";
import { ProductID } from "src/product/domain/value-objects/product.id";

export class ComboMapper implements IMapper<Combo, ComboEntity> {
  
    async fromDomainToPersistence(domain: Combo): Promise<ComboEntity> {
        const comboORM = new ComboEntity();
        comboORM.id = domain.Id.Id;
        comboORM.name = domain.Name.Name;
        comboORM.description = domain.Description.Description;
        comboORM.comboImage = domain.ComboImage.Image;
        comboORM.specialPrice = domain.SpecialPrice.Price;
        comboORM.currency = domain.Currency.Currency;
        comboORM.products = domain.Products.map(product => product.Id);
        
        return comboORM;
    }

    async fromPersistenceToDomain(persistence: ComboEntity): Promise<Combo> {
        return new Combo(
            new ComboID(persistence.id),
            new ComboName(persistence.name),
            new ComboDescription(persistence.description),
            new ComboImage(persistence.comboImage),
            new ComboSpecialPrice(persistence.specialPrice),
            new ComboCurrency(persistence.currency),
            persistence.products.map(productId => new ProductID(productId))
        );
    }
}
