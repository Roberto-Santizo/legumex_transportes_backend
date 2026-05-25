import z, { uuid } from "zod";

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

export const AdminSchema = z.object({
    iso_3166_1: z.string(),
    iso_3166_1_alpha3: z.string(),
});

export const LegSchema = z.object({
    steps: z.array(z.any()),
    summary: z.string(),
    distance: z.number(),
    duration: z.number(),
    weight: z.number(),
    admins: z.array(AdminSchema),
    via_waypoints: z.array(z.any()),
});

export const RouteSchema = z.object({
    geometry: z.string(),
    distance: z.number(),
    duration: z.number(),
    weight: z.number(),
    weight_name: z.string(),
    legs: z.array(LegSchema),
});

export const WaypointSchema = z.object({
    location: z.array(z.number()),
    name: z.string(),
    distance: z.number(),
});

export const TrafficResponseSchema = z.object({
    code: z.string(),
    waypoints: z.array(WaypointSchema),
    routes: z.array(RouteSchema),
    uuid: z.string(),
});