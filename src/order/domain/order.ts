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
import { OrderCancelledDate } from "./value-objects/order.cancelled.date";
import { OrderShippedDate } from "./value-objects/order.shipped.date";
import { OrderBeingProcessedDate } from "./value-objects/order.being.processed.date";
import { OrderIndications } from "./value-objects/order.indications";
import { OrderUserID } from "./value-objects/order.user.id";
import { OrderUserEmail } from "./value-objects/order.user.email";
import { OrderCuponID } from "./value-objects/order.cupon.id";

export class Order extends AggregateRoot<OrderID> {
    
    private userId: OrderUserID;
    private userEmail: OrderUserEmail;
    private createdDate: OrderCreatedDate;
    private status: OrderStatus;
    private address: OrderAddress;
    private indications?: OrderIndications;
    private products: Product[];
    private combos: Combo[];
    private cupon?: OrderCuponID;
    private paymentMethod: PaymentMethod;
    private report?: OrderReport;
    private receivedDate?: OrderReceivedDate;
    private cancelledDate?: OrderCancelledDate;
    private shippedDate?: OrderShippedDate;
    private beingProcessedDate?: OrderBeingProcessedDate;

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

    get CancelledDate (): OrderCancelledDate{
        return this.cancelledDate;
    }

    get ShippedDate (): OrderShippedDate{
        return this.shippedDate;
    }

    get BeingProcessedDate (): OrderBeingProcessedDate{
        return this.beingProcessedDate;
    }

    get Indications (): OrderIndications{
        return this.indications;
    }

    get UserID (): OrderUserID{
        return this.userId;
    }

    get UserEmail (): OrderUserEmail{
        return this.userEmail;
    }

    get Cupon (): OrderCuponID{
        return this.cupon;
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

    ChangeUserID(userId: OrderUserID): void{
        this.userId = userId;
    }

    ChangeUserEmail(userEmail: OrderUserEmail): void{
        this.userEmail = userEmail;
    }

    ChangeCupon(cupon: OrderCuponID): void{
        this.cupon = cupon;
    }

    ChangeReport(report: OrderReport): void{
        this.report = report;
    }

    ChangeReceivedDate(receivedDate: OrderReceivedDate): void{
        this.receivedDate = receivedDate;
    }

    ChangeCancelledDate(cancelledDate: OrderCancelledDate): void{
        this.cancelledDate = cancelledDate;
    }

    ChangeShippedDate(shippedDate: OrderShippedDate): void{
        this.shippedDate = shippedDate;
    }

    ChangeBeingProcessedDate(beingProcessedDate: OrderBeingProcessedDate): void{
        this.beingProcessedDate = beingProcessedDate;
    }

    ChangeIndications(indications: OrderIndications): void{
        this.indications = indications;
    }

    constructor(id: OrderID, createdDate: OrderCreatedDate, status: OrderStatus, address: OrderAddress, products: Product[], combos: Combo[], paymentMethod: PaymentMethod, userId: OrderUserID, userEmail: OrderUserEmail, report?: OrderReport, receivedDate?: OrderReceivedDate, cancelledDate?: OrderCancelledDate, shippedDate?: OrderShippedDate, beingProcessedDate?: OrderBeingProcessedDate, indications?: OrderIndications, cupon?: OrderCuponID){
        const orderCreated = orderCreatedEvent.create(id, createdDate, status, address, products, combos, paymentMethod, userId, userEmail, report, receivedDate, cancelledDate, shippedDate, beingProcessedDate, indications, cupon);
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
            this.userId = event.userId;
            this.userEmail = event.userEmail;
            this.report = event.report;
            this.receivedDate = event.receivedDate;
            this.cancelledDate = event.cancelledDate;
            this.shippedDate = event.shippedDate;
            this.beingProcessedDate = event.beingProcessedDate;
            this.indications = event.indications;
            this.cupon = event.cupon;
        }
    }

    protected checkValidState(): void {
        if(!this.createdDate || !this.status || !this.address || !this.products || !this.combos || !this.paymentMethod /*|| !this.report || !this.receivedDate*/){
            throw new unvalidOrderException(`Order not valid`);
        }
    }
}