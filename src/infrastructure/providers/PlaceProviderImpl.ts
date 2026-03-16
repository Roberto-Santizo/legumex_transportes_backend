import { AxiosInstance } from "axios";
import { ConflictError } from "../errors/errors";
import { GoogleGeocodeReponseSchema } from "../../schemas/placesSchemas";
import { Place } from "../../types/types";
import { PlaceProvider } from "../../domain/providers/providers";

export class PlaceProviderImpl implements PlaceProvider {
    constructor(private client: AxiosInstance) { }

    async getPlaces(place: string): Promise<Place[]> {
        const { data } = await this.client.get(`/json?address=${place}&key=${process.env.GOOGLE_API_KEY}`);
        const response = GoogleGeocodeReponseSchema.safeParse(data);
        if(response.success){
            return response.data.results;
        }else{
            throw new ConflictError("Información no válida");
        }
    }

}