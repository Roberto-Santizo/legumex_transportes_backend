import { PlaceProvider } from "../domain/providers/PlaceProvider";

export class PlaceService {
    constructor(private provider: PlaceProvider) { }

    getPlaces(place: string) {
        return this.provider.getPlaces(place);
    }
}