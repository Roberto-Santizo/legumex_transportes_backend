import { Place, PlacePrediction, TrafficResponse } from '../types/types';
import { decode } from "@googlemaps/polyline-codec";

export class PlaceResource {
    static toJsonDetails(place: Place, id: PlacePrediction['place_id']) {
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

    static formatRoute(data: TrafficResponse) {
        const route = data.routes[0];

        return {
            distance: route.distance,
            duration: route.duration,
            points: decode(route.geometry)
        }
    }


    static collection(places: PlacePrediction[]) {
        return places.map(place => this.toJson(place));
    }
}