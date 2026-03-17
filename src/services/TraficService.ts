import { TraficProvider } from "../domain/providers/providers";
import { GetEstimatedTimeInTraficPayload } from "../interfaces/interfaces";

export class TraficService {
    constructor(private service: TraficProvider) { }

    getEstimatedTimeInTrafic(payload: GetEstimatedTimeInTraficPayload) {
        return this.service.getEstimatedTimeInTrafic(payload);
    }
}