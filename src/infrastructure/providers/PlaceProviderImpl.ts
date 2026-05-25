import { ConflictError } from "../errors/errors";
import { GooglePlacesMapper } from "../../classes/GooglePlacesMapper";
import { GooglePlacesReponseSchema, PlaceSchema, TrafficResponseSchema } from "../../schemas/placesSchemas";
import { Place, PlacePrediction, TrafficPayload, TrafficResponse } from "../../types/types";
import { PlaceProvider } from "../../domain/providers/providers";
import axios from "axios";

export class PlaceProviderImpl implements PlaceProvider {
    private mapBoxUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
    private googlePlacesUrl = 'https://places.googleapis.com/v1/places';

    constructor() { }

    async getRoute(payload: TrafficPayload): Promise<TrafficResponse> {
        const coordsUrl = `${payload.start_lng},${payload.start_lat};${payload.end_lng},${payload.end_lat}`;
        const url = `${this.mapBoxUrl}${coordsUrl}?alternatives=true&geometries=polyline6&overview=simplified&access_token=${process.env.MAPBOX_TOKEN}`;
        const { data } = await axios.get(url);
        const response = TrafficResponseSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            throw new ConflictError("Información no válida");
        }
    }

    async getPlaceById(id: PlacePrediction["place_id"]): Promise<Place> {
        const { data } = await axios.get(`${this.googlePlacesUrl}/${id}`, { headers: { 'X-Goog-Api-Key': process.env.GOOGLE_API_KEY, 'X-Goog-FieldMask': '*' } });
        const formattedResponse = GooglePlacesMapper.toLegacyPlace(data);
        const response = PlaceSchema.safeParse(formattedResponse);
        if (response.success) {
            return response.data;
        } else {
            throw new ConflictError("Información no válida");
        }
    }

    async getPlaces(place: string): Promise<PlacePrediction[]> {
        const { data } = await axios.post(`${this.googlePlacesUrl}:searchText`, { textQuery: place }, { headers: { 'X-Goog-Api-Key': process.env.GOOGLE_API_KEY, 'X-Goog-FieldMask': 'places.formattedAddress,places.id' } });
        const formattedResponse = GooglePlacesMapper.toLegacyPredictions(data);
        const response = GooglePlacesReponseSchema.safeParse(formattedResponse);
        if (response.success) {
            return response.data.predictions;
        } else {
            throw new ConflictError("Información no válida");
        }
    }

}