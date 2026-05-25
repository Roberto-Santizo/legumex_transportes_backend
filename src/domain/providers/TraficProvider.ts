import { RoutePayload } from "../../interfaces/interfaces";
import { TraficData } from "../../types/types";

export abstract class TraficProvider {
    abstract getEstimatedTimeInTrafic(payload: RoutePayload): Promise<TraficData>;
}