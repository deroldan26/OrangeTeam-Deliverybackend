import { Entity } from "../../../core/domain/entity";
import { OrderReportID } from "../value-objects/order.report.id";
import { OrderReportDescription } from "../value-objects/order.report.description";
import { OrderReportDate } from "../value-objects/order.report.date";

export class OrderReport extends Entity<OrderReportID>{

    constructor(id: OrderReportID, private description: OrderReportDescription, private date: OrderReportDate) {
        super(id);
    }

    ReportDescription(): OrderReportDescription{
        return this.description;
    }

    ReportDate(): OrderReportDate{
        return this.date;
    }

}