import z from "zod";
import { PlaceSchema } from "../schemas/placesSchemas";

export type Place = z.infer<typeof PlaceSchema>;