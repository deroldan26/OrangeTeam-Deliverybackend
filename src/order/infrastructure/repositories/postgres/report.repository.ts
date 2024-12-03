import { DataSource, Repository } from "typeorm";
import { OrderReportEntity as ReportORM } from "../../models/order.report.entity";
import { Result } from "src/core/domain/result-handler/result";
import { ReportMapper } from "../../mapper/report.mapper";
import { IReportRepository } from "src/order/domain/repositories/report-repositories.interface";
import { OrderReport } from "src/order/domain/entities/orderReport";

export class ReportPostgresRepository extends Repository<ReportORM> implements IReportRepository{
    private readonly reportMapper: ReportMapper;

    constructor(dataSource: DataSource){
        super(ReportORM, dataSource.createEntityManager());
        this.reportMapper = new ReportMapper();
    }

    async findReportById(id: string): Promise<Result<OrderReport>> {
        try {
            var report = await this.createQueryBuilder('OrderReport').select(['OrderReport.id','OrderReport.reportDate','OrderReport.description']).where('OrderReport.id = :id',{id}).getOne()
            const getReport = await this.reportMapper.fromPersistenceToDomain(report);
            return Result.success<OrderReport>(getReport, 200)
        } catch (error) {
            return Result.fail<OrderReport>(new Error(error.message), error.code, error.message);
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