import { Place, PlacePrediction } from '../../types/types';

export abstract class PlaceProvider {
    abstract getPlaces(place: string): Promise<PlacePrediction[]>;
    abstract getPlaceById(id: PlacePrediction['place_id']): Promise<Place>;
}