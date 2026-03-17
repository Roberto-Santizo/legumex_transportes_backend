import { authRoutes, carrierRoutes, cropRoutes, placeRoutes, tripRoutes, vehicleBrandRoutes, vehiclesRoutes, zoneRoutes, zoneTripPriceRoute } from "./routes/routes";
import { corsConfig } from "./config/config";
import cors from "cors";
import express from "express";

const app = express();

//SERVER CONFIG
app.use(cors(corsConfig));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/vehicle-brands', vehicleBrandRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/carriers', carrierRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/zones-trip-prices', zoneTripPriceRoute);
app.use('/api/crops', cropRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/trips', tripRoutes);

export default app;