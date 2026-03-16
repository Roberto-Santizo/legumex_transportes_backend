import z from "zod";
import { PlacePredictionSchema, PlaceSchema } from "../schemas/placesSchemas";

export type PlacePrediction = z.infer<typeof PlacePredictionSchema>;
export type Place = z.infer<typeof PlaceSchema>;