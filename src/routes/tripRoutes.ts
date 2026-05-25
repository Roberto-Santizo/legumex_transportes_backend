import { Router } from "express";
import { TripController } from "../controllers/TripController";
import { authenticated } from "../middlewares/authentication";
import { returnBodyValidationErrors } from "../middlewares/validation";
import { body } from "express-validator";

const router = Router();

router.use(authenticated);

router.post('/',
    body('start_lat').notEmpty().withMessage('Latitud de inicio es requerido'),
    body('start_lng').notEmpty().withMessage('Longitud de inicio es requerido'),
    body('destination_lat').notEmpty().withMessage('Latitud final es requerida'),
    body('destination_lng').notEmpty().withMessage('Longitud final es requerida'),
    body('product_id').notEmpty().withMessage('El producto es requerido').isNumeric().withMessage('El producto debe de ser un dato númerico'),
    body('total_pounds').notEmpty().withMessage('El total de libras es requerido').isNumeric().withMessage('El total de libras debe de ser un dato númerico'),
    body('operation_date').notEmpty().withMessage('La fecha de operación es requerida'),
    body('estimated_time').notEmpty().withMessage('El tiempo estimado es requerido').isNumeric().withMessage('El tiempo estimado debe de ser un dato númerico'),
    body('estimated_distance').notEmpty().withMessage('La distancia estimada es requerida').isNumeric().withMessage('La distancia estimada debe de ser un dato númerico'),
    body('amount_lbs').notEmpty().withMessage('El precio por las libras es requerido').isNumeric().withMessage('La precio por las libras debe de ser un dato númerico'),
    returnBodyValidationErrors,
    TripController.store
);

router.post('/estimatedTripPrice',
    body('start_lat').notEmpty().withMessage('Latitud de inicio es requerido'),
    body('start_lng').notEmpty().withMessage('Longitud de inicio es requerido'),
    body('destination_lat').notEmpty().withMessage('Latitud final es requerida'),
    body('destination_lng').notEmpty().withMessage('Longitud final es requerida'),
    body('product_id').notEmpty().withMessage('El producto es requerido').isNumeric().withMessage('El producto debe de ser un dato númerico'),
    body('total_pounds').notEmpty().withMessage('El total de libras es requerido').isNumeric().withMessage('El total de libras debe de ser un dato númerico'),
    body('operation_date').notEmpty().withMessage('La fecha de operación es requerida'),
    returnBodyValidationErrors,
    TripController.getTripPrice
);

export default router;