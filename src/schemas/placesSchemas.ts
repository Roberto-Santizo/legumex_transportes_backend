import z from "zod";

export const PlacePredictionSchema = z.object({
    description: z.string(),
    place_id: z.string(),
});

export const PlaceSchema = z.object({
    result: z.object({
        formatted_address: z.string(),
        geometry: z.object({
            location: z.object({
                lat: z.number(),
                lng: z.number()
            })
        })
    })
});

export const GooglePlacesReponseSchema = z.object({
    predictions: z.array(PlacePredictionSchema)
});