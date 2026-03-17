import { GetEstimatedTimeInTraficPayload } from "../../interfaces/interfaces";
import { TraficData } from "../../types/types";

export abstract class TraficProvider {
    abstract getEstimatedTimeInTrafic(payload: GetEstimatedTimeInTraficPayload): Promise<TraficData>;
}