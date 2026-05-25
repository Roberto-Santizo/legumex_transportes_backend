export class GooglePlacesMapper {
    static toLegacyPredictions(data: any) {
        return {
            predictions: data.places.map((place: any) => ({
                description: place.formattedAddress,
                place_id: place.id
            }))
        };
    }

    static toLegacyPlace(data: any) {
        return {
            result: {
                formatted_address: data.formattedAddress,
                geometry: {
                    location: {
                        lat: data.location.latitude,
                        lng: data.location.longitude
                    }
                }
            }
        };
    }
}