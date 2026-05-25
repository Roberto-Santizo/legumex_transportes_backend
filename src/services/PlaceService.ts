import { PlaceProvider } from "../domain/providers/PlaceProvider";
import { PlacePrediction, TrafficPayload } from "../types/types";

export class PlaceService {
    constructor(private provider: PlaceProvider) { }

    getPlaces(place: string) {
        return this.provider.getPlaces(place);
    }

    getPlaceById(id: PlacePrediction['place_id']) {
        return this.provider.getPlaceById(id);
    }

    getRoute(payload: TrafficPayload){
        return this.provider.getRoute(payload);
    }
}