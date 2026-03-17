import { Router } from "express";
import { TripController } from "../controllers/TripController";
import { authenticated } from "../middlewares/authentication";
import { returnBodyValidationErrors } from "../middlewares/validation";
import { body } from "express-validator";

const router = Router();

router.use(authenticated);

router.post('/estimatedTraficTime',
    body('start_lat').notEmpty().withMessage('Latitud de inicio es requerido'),
    body('start_lng').notEmpty().withMessage('Longitud de inicio es requerido'),
    body('destination_lat').notEmpty().withMessage('Latitud final es requerida'),
    body('destination_lng').notEmpty().withMessage('Longitud final es requerida'),
    body('departure_time').notEmpty().withMessage('La hora de salida es requerida'),
    returnBodyValidationErrors,
    TripController.getEstimatedTrafic
);

export default router;