import { GoogleTraficResponseSchema } from "../schemas/traficSchemas";
import { PlacePredictionSchema, PlaceSchema } from "../schemas/placesSchemas";
import z from "zod";

export type PlacePrediction = z.infer<typeof PlacePredictionSchema>;
export type Place = z.infer<typeof PlaceSchema>;

export type TraficData = z.infer<typeof GoogleTraficResponseSchema>