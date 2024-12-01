import { DataSource, Repository } from "typeorm";
import { OrderReportEntity as ReportORM } from "../../models/order.report.entity";
import { Result } from "src/core/domain/result-handler/result";
import { PaymentMethod } from "src/order/domain/entities/paymentMethod";
import { ReportMapper } from "../../mapper/report.mapper";
import { IReportRepository } from "src/order/domain/repositories/report-repositories.interface";
import { OrderReport } from "src/order/domain/entities/orderReport";

export class ReportPostgresRepository extends Repository<ReportORM> implements IReportRepository{
    private readonly reportMapper: ReportMapper;

    constructor(dataSource: DataSource){
        super(ReportORM, dataSource.createEntityManager());
        this.reportMapper = new ReportMapper();
    }

    findReportById(id: string): Promise<Result<OrderReport>> {
        try {
            
        } catch (error) {
            //return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
        throw new Error("Method not implemented.");
    }

    async saveReportEntity(report: OrderReport): Promise<Result<OrderReport>> {
        try {
            const newReport = await this.reportMapper.fromDomainToPersistence(report);
            await this.save(newReport);
            return Result.success<OrderReport>(report, 200);
        } catch (error) {
            return Result.fail<OrderReport>(new Error(error.message), error.code, error.message);
        }
    }

}