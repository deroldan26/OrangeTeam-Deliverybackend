import { Result } from '../../../core/domain/result-handler/result';
import { OrderReport } from '../entities/orderReport';

export interface IReportRepository {
  findReportById(id: string): Promise<Result<OrderReport>>;
  saveReportEntity(report: OrderReport): Promise<Result<OrderReport>>;
}