import { Repository } from "typeorm";
import { IAuditRepository } from "src/audit/domain/repositories/audit-repositories.interface";
import { auditEntry } from "src/audit/domain/auditEntry";
import { AuditEntity as AuditORM} from "../../models/postgres/audit.entity";
import { DataSource } from "typeorm";
import { Result } from "src/core/domain/result-handler/result";
import { AuditMapper } from "../../mapper/audit.mapper";

export class AuditPostgresRepository extends Repository<AuditORM> implements IAuditRepository{

    private auditMapper : AuditMapper

    constructor(dataSource: DataSource) {
    super(AuditORM, dataSource.createEntityManager());
    this.auditMapper = new AuditMapper();
    }

    async saveAuditEntry(audit: auditEntry) : Promise<void>{
        try {
            const newAudit = await this.auditMapper.fromDomainToPersistence(audit)
            await this.save(newAudit);
        } catch (error) {
            return null
        }
    }
}