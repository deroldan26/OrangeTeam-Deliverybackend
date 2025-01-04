import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { AuditEntity } from "../models/postgres/audit.entity";
import { auditEntry } from "src/audit/domain/auditEntry";

export class AuditMapper implements IMapper<auditEntry, AuditEntity> {
    async fromDomainToPersistence(domain: auditEntry): Promise<AuditEntity> {
      const auditORM = new auditEntry();
      auditORM.id = domain.id,
      auditORM.userId = domain.userId,
      auditORM.time = domain.time,
      auditORM.operation = domain.operation,
      auditORM.data = domain.data
      return auditORM;
    //return new AuditEntity()
    }

    async fromPersistenceToDomain(persistence: AuditEntity): Promise<auditEntry> {
        return new auditEntry()
    }
  }