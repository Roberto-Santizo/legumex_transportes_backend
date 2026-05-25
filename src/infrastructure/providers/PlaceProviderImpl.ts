import axios, { AxiosInstance } from "axios";
import { ConflictError } from "../errors/errors";
import { GooglePlacesReponseSchema, PlaceSchema } from "../../schemas/placesSchemas";
import { Place, PlacePrediction } from "../../types/types";
import { PlaceProvider } from "../../domain/providers/providers";
import { GooglePlacesMapper } from "../../classes/GooglePlacesMapper";

export class PlaceProviderImpl implements PlaceProvider {
    constructor(private client: AxiosInstance) { }

    async getPlaceById(id: PlacePrediction["place_id"]): Promise<Place> {
        const { data } = await this.client.get(`https://places.googleapis.com/v1/places/${id}`, { headers: { 'X-Goog-Api-Key': process.env.GOOGLE_API_KEY, 'X-Goog-FieldMask': '*' } });
        const formattedResponse = GooglePlacesMapper.toLegacyPlace(data);
        const response = PlaceSchema.safeParse(formattedResponse);
        if (response.success) {
            return response.data;
        } else {
            throw new ConflictError("Información no válida");
        }
    }

    async getPlaces(place: string): Promise<PlacePrediction[]> {
        const { data } = await axios.post('https://places.googleapis.com/v1/places:searchText', { textQuery: place }, { headers: { 'X-Goog-Api-Key': process.env.GOOGLE_API_KEY, 'X-Goog-FieldMask': 'places.formattedAddress,places.id' } });
        const formattedResponse = GooglePlacesMapper.toLegacyPredictions(data);
        const response = GooglePlacesReponseSchema.safeParse(formattedResponse);
        if (response.success) {
            return response.data.predictions;
        } else {
            throw new ConflictError("Información no válida");
        }
    }

}