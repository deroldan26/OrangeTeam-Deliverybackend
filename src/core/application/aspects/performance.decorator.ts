import { IApplicationService } from "../service/application-service.interface";
import { Result } from "src/core/domain/result-handler/result";

export class PerformanceDecoratorService<D, R> implements IApplicationService <D, R>{
    constructor(
        private _service : IApplicationService<D, R>
    ) {}

    public async execute(data: D): Promise<Result<R>>{
        let time_before = new Date().getTime()

        const result = await this._service.execute(data);

        let time_after = new Date().getTime()

        console.log("The service took "+ (time_after-time_before) +"ms")

        return result;
    }
}