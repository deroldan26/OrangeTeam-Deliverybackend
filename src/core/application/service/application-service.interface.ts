import { Result } from "src/core/domain/result-handler/result"


export interface IApplicationService<D, R>
{
    execute ( data: D ): Promise<Result<R>>
}