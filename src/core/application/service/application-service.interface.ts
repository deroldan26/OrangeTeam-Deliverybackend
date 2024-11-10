import { Result } from "../../../core/domain/result-handler/result"

export interface IApplicationService<D, R>
{
    execute ( data: D ): Promise<Result<R>>
}