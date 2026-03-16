import z from "zod";

export const PlaceSchema = z.object({
    formatted_address: z.string(),
    geometry: z.object({
        location: z.object({
            lat: z.number(),
            lng: z.number()
        })
    }),
    place_id: z.string()
});

export const GoogleGeocodeReponseSchema = z.object({
    results: z.array(PlaceSchema)
});