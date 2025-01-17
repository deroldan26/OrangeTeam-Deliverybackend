import { IApplicationService } from "../service/application-service.interface";
import { Result } from "src/core/domain/result-handler/result";

export class LoggerDecoratorService<D, R> implements IApplicationService <D, R>{
    constructor(
        private _action : string,
        private _service : IApplicationService<D, R>
    ) {}

    public async execute(data: D): Promise<Result<R>>{
        const result = await this._service.execute(data);

        console.log("The following action was carried out: "+this._action)

        return result;
    }
}