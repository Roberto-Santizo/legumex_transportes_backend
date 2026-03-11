import { Coordinate } from "../interfaces/interfaces";

export const createGeoJson = (coordinates: Coordinate[]): Object => {
    const area = {
        type: 'Polygon',
        coordinates: [coordinates]
    };

    return area;
}