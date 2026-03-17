import z from "zod";

export const TraficDataResponseSchema = z.object({
    text: z.string(),
    value: z.number()
});

export const GoogleTraficResponseSchema = z.object({
    routes: z.array(z.object({
        legs: z.array(z.object({
            distance: TraficDataResponseSchema,
            duration: TraficDataResponseSchema,
            duration_in_traffic: TraficDataResponseSchema
        }))
    }))
});