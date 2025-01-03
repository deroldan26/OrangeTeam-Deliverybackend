import { IApplicationService } from "../service/application-service.interface";
import { Result } from "src/core/domain/result-handler/result";

export class LoggerDecoratorService<D, R> implements IApplicationService <D, R>{
    constructor(
        private _service : IApplicationService<D, R>
    ) {}

    public async execute(data: D): Promise<Result<R>>{
        const result = await this._service.execute(data);

        if(result.Value == null){
            console.log("There was an "+result.Error)
        }

        return result;
    }
}