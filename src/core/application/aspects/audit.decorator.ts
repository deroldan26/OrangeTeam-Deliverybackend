import { auditEntry } from "src/audit/domain/auditEntry";
import { IApplicationService } from "../service/application-service.interface";
import { Result } from "src/core/domain/result-handler/result";
import { IAuditRepository } from "src/audit/domain/repositories/audit-repositories.interface";
import { IdGenerator } from "../id.generator/id.generator";

export class AuditDecoratorService<D, R> implements IApplicationService <D, R>{
    constructor(
        private _auditRepository : IAuditRepository,
        private readonly idGenerator: IdGenerator<string>,
        private _userId : string,
        private _service : IApplicationService<D, R>
    ) {}

    public async execute(data: D): Promise<Result<R>>{
        const result = await this._service.execute(data);
        
        let entry = new auditEntry()

        entry.id = await this.idGenerator.generateId()
        entry.userId = this._userId
        entry.time = new Date()
        entry.operation = this._service.constructor.name
        entry.data = [JSON.stringify(data)];

        await this._auditRepository.saveAuditEntry(entry);

        return result;
    }
}