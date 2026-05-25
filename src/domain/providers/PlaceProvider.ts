import { Place, PlacePrediction, TrafficPayload, TrafficResponse } from '../../types/types';

export abstract class PlaceProvider {
    abstract getPlaces(place: string): Promise<PlacePrediction[]>;
    abstract getPlaceById(id: PlacePrediction['place_id']): Promise<Place>;
    abstract getRoute(payload: TrafficPayload): Promise<TrafficResponse>;
}