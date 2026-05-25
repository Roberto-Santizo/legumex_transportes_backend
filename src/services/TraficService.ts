import { TraficProvider } from "../domain/providers/providers";
import { RoutePayload } from "../interfaces/interfaces";

export class TraficService {
    constructor(private service: TraficProvider) { }

    getEstimatedTimeInTrafic(payload: RoutePayload) {
        return this.service.getEstimatedTimeInTrafic(payload);
    }
}