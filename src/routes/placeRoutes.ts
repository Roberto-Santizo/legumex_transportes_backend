import { Router } from "express";
import { PlaceController } from "../controllers/controllers";
import { body, param, query } from "express-validator";
import { returnBodyValidationErrors } from "../middlewares/middlewares";

const router = Router();

router.get('/',
    query('place').notEmpty().withMessage('El lugar es requerido'),
    returnBodyValidationErrors,
    PlaceController.index
);

router.get('/:placeId',
    param('placeId').notEmpty().withMessage('El ID del lugar es requerido'),
    returnBodyValidationErrors,
    PlaceController.getPlaceById
);

router.post('/route',
    body('start_lat').notEmpty().withMessage('La latitud de inicio es requerida'),
    body('start_lng').notEmpty().withMessage('La longitud de inicio es requerida'),
    body('end_lat').notEmpty().withMessage('La latitud de destino es requerida'),
    body('end_lng').notEmpty().withMessage('La longitud de destino es requerida'),
    returnBodyValidationErrors,
    PlaceController.getRoute
);

export default router;