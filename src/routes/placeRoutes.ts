import { Router } from "express";
import { PlaceController } from "../controllers/controllers";
import { param, query } from "express-validator";
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

export default router;