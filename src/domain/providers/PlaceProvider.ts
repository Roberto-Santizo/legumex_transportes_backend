import { Place } from "../../types/types";

export abstract class PlaceProvider {
    abstract getPlaces(place: string): Promise<Place[]>;
}