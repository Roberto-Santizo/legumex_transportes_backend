import { Place, PlacePrediction } from '../types/types';

export class PlaceResource {
    static toJsonDetails(place: Place, id: PlacePrediction['place_id']){
        return {
            id: id,
            address: place.result.formatted_address,
            lat: place.result.geometry.location.lat,
            lng: place.result.geometry.location.lng,
        }
    }

    static toJson(place: PlacePrediction) {
        return {
            id: place.place_id,
            address: place.description,
            lat: 90.1,
            lng: 14.1
        }
    }


    static collection(places: PlacePrediction[]) {
        return places.map(place => this.toJson(place));
    }
}