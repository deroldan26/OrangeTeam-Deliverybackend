import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { OrderReport } from "src/order/domain/entities/orderReport";
import { OrderReportEntity } from "../models/order.report.entity";
import { OrderReportID } from "src/order/domain/value-objects/order.report.id";
import { OrderReportDescription } from "src/order/domain/value-objects/order.report.description";
import { OrderReportDate } from "src/order/domain/value-objects/order.report.date";

export class ReportMapper implements IMapper<OrderReport, OrderReportEntity> {

    //Aqui está el error
    async fromDomainToPersistence(domain: OrderReport): Promise<OrderReportEntity> {
        const reportORM = new OrderReportEntity();
        reportORM.id = domain.Id.ReportId;
        reportORM.description = domain.ReportDescription().ReportDescription;
        reportORM.reportDate = domain.ReportDate().ReportDate;
        return reportORM;
    }
    async fromPersistenceToDomain(persistence: OrderReportEntity): Promise<OrderReport> {
        return new OrderReport(new OrderReportID(persistence.id), 
            new OrderReportDescription(persistence.description), 
            new OrderReportDate(persistence.reportDate));
    }
  }