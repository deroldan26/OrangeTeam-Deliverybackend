import { IdGenerator } from 'src/core/application/id.generator/id.generator'
import { v4 as uuidv4 } from 'uuid'


export class UuidGenerator implements IdGenerator<string> {
    async generateId(): Promise<string> {
        return uuidv4()
    }
}