import { Place } from '../types/types';

export class PlaceResource {
    static toJson(place: Place) {
        return {
            id: place.place_id,
            address: place.formatted_address,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
        }
    }


    static collection(places: Place[]) {
        return places.map(place => this.toJson(place));
    }
}