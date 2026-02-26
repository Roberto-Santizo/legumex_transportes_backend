import { authRoutes, vehicleBrandRoutes, vehiclesRoutes } from "./routes/routes";
import { corsConfig } from "./config/config";
import cors from "cors";
import express from "express";

const app = express();

//SERVER CONFIG
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/vehicle-brands', vehicleBrandRoutes);
app.use('/api/vehicles', vehiclesRoutes);

export default app;