import { Carrier, User } from "../entities/entity";
import { GoogleTraficResponseSchema } from "../schemas/traficSchemas";
import { PlacePredictionSchema, PlaceSchema, TrafficResponseSchema } from "../schemas/placesSchemas";
import z from "zod";

export type PlacePrediction = z.infer<typeof PlacePredictionSchema>;
export type Place = z.infer<typeof PlaceSchema>;

export type TraficData = z.infer<typeof GoogleTraficResponseSchema>
export type TrafficResponse = z.infer<typeof TrafficResponseSchema>

export type GetEstimatedTripPricePayload = {
    destination_lat: number;
    destination_lng: number;
    origin_lat: number;
    origin_lng: number;
    product_id: number;
    total_pounds: number;
    operation_date: string;
}

export type CreateTripPayload = GetEstimatedTripPricePayload & {
    estimated_time: number;
    estimated_distance: number;
    amount_lbs: number;
    polyline: string;
    carrier: Carrier;
    user: User;
}

export type TrafficPayload = {
    start_lat: number;
    start_lng: number;
    end_lat: number;
    end_lng: number;
}