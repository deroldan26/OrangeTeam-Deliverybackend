import { AggregateRoot } from "src/core/domain/aggregate.root";
import { OrderID } from "./value-objects/order.id";
import { OrderCreatedDate } from "./value-objects/order.created.date";
import { OrderStatus } from "./value-objects/order.status";
import { OrderAddress } from "./value-objects/order.address";
import { PaymentMethod } from "./entities/paymentMethod";
import { OrderReport } from "./entities/orderReport";
import { OrderReceivedDate } from "./value-objects/order.received.date";
import { orderCreatedEvent } from "./events/order.created";
import { unvalidOrderException } from "./exceptions/unvalid.order";
import { DomainEvent } from "src/core/domain/domain.event";
import { Product } from "./entities/product";
import { Combo } from "./entities/combo";

export class Order extends AggregateRoot<OrderID> {
    
    private createdDate: OrderCreatedDate;
    private status: OrderStatus;
    private address: OrderAddress;
    private products: Product[];
    private combos: Combo[];
    private paymentMethod: PaymentMethod;
    private report?: OrderReport;
    private receivedDate?: OrderReceivedDate;

    get CreatedDate (): OrderCreatedDate{
        return this.createdDate;
    }

    get Status (): OrderStatus{
        return this.status;
    }

    get Address (): OrderAddress{
        return this.address;
    }

    get Products (): Product[]{
        return this.products;
    }

    get Combos (): Combo[]{
        return this.combos;
    }

    get PaymentMethod (): PaymentMethod{
        return this.paymentMethod;
    }

    get Report (): OrderReport{
        return this.report;
    }

    get ReceivedDate (): OrderReceivedDate{
        return this.receivedDate;
    }

    ChangeStatus(status: OrderStatus): void{
        this.status = status;
    }

    ChangeAddress(address: OrderAddress): void{
        this.address = address;
    }

    ChangeProducts(products: Product[]): void{
        this.products = products;
    }

    ChangeCombos(combos: Combo[]): void{
        this.combos = combos;
    }

    ChangePaymentMethod(paymentMethod: PaymentMethod): void{
        this.paymentMethod = paymentMethod;
    }

    ChangeReport(report: OrderReport): void{
        this.report = report;
    }

    ChangeReceivedDate(receivedDate: OrderReceivedDate): void{
        this.receivedDate = receivedDate;
    }

    constructor(id: OrderID, createdDate: OrderCreatedDate, status: OrderStatus, address: OrderAddress, products: Product[], combos: Combo[], paymentMethod: PaymentMethod, report?: OrderReport, receivedDate?: OrderReceivedDate){
        const orderCreated = orderCreatedEvent.create(id, createdDate, status, address, products, combos, paymentMethod, report, receivedDate);
        super(id, orderCreated);
    }

    protected when(event: DomainEvent): void {
        if(event instanceof orderCreatedEvent){
            this.createdDate = event.createdDate;
            this.status = event.status;
            this.address = event.address;
            this.products = event.products;
            this.combos = event.combos;
            this.paymentMethod = event.paymentMethod;
            this.report = event.report;
            this.receivedDate = event.receivedDate;
        }
    }

    protected checkValidState(): void {
        if(!this.createdDate || !this.status || !this.address || !this.products || !this.combos || !this.paymentMethod /*|| !this.report || !this.receivedDate*/){
            throw new unvalidOrderException(`Order not valid`);
        }
    }
}