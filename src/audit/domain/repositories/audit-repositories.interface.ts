import { Result } from '../../../core/domain/result-handler/result';
import { auditEntry } from '../auditEntry';

export interface IAuditRepository {
  saveAuditEntry(audit: auditEntry): void;
}