import { AxiosInstance } from "axios";
import { ConflictError } from "../errors/errors";
import { GooglePlacesReponseSchema, PlaceSchema } from "../../schemas/placesSchemas";
import { Place, PlacePrediction } from "../../types/types";
import { PlaceProvider } from "../../domain/providers/providers";

export class PlaceProviderImpl implements PlaceProvider {
    constructor(private client: AxiosInstance) { }

    async getPlaceById(id: PlacePrediction["place_id"]): Promise<Place> {
        const { data } = await this.client.get(`/details/json?place_id=${id}&key=${process.env.GOOGLE_API_KEY}`);
        const response = PlaceSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            throw new ConflictError("Información no válida");
        }
    }

    async getPlaces(place: string): Promise<PlacePrediction[]> {
        const { data } = await this.client.get(`/autocomplete/json?input=${place}&key=${process.env.GOOGLE_API_KEY}`);
        const response = GooglePlacesReponseSchema.safeParse(data);
        if (response.success) {
            return response.data.predictions;
        } else {
            throw new ConflictError("Información no válida");
        }
    }

}