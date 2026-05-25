import { AxiosInstance } from "axios";
import { ConflictError } from "../errors/errors";
import { GoogleTraficResponseSchema } from "../../schemas/traficSchemas";
import { RoutePayload } from "../../interfaces/interfaces";
import { TraficData } from "../../types/types";
import { TraficProvider } from "../../domain/providers/providers";

export class TraficProviderImpl implements TraficProvider {
    constructor(private client: AxiosInstance) { }

    async getEstimatedTimeInTrafic(payload: RoutePayload): Promise<TraficData> {
        const url = `/directions/json?origin=${payload.start_lat},${payload.start_lng}&destination=${payload.destination_lat},${payload.destination_lng}&key=${process.env.GOOGLE_API_KEY}`
        const { data } = await this.client.get(url);
        const response = GoogleTraficResponseSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            throw new ConflictError("Información no válida");
        }
    }
}