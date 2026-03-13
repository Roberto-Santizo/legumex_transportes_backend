import { authenticated } from "../middlewares/middlewares";
import { body, param } from "express-validator";
import { returnBodyValidationErrors } from "../middlewares/validation";
import { Router } from "express";
import { ZoneTripPriceController } from "../controllers/controllers";

const router = Router();

router.use(authenticated);

router.post('/',
    body('crop_id').notEmpty().withMessage('El producto es requerido').isNumeric().withMessage('El producto debe de ser un dato númerico'),
    body('fuel_price_id').notEmpty().withMessage('El precio de la gasolina es requerida').isNumeric().withMessage('El precio de la gasolina debe de ser un dato númerico'),
    body('price_per_lb').notEmpty().withMessage('El precio por libra es requerido').isNumeric().withMessage('El precio por libra debe de ser un dato númerico'),
    body('start_date').notEmpty().withMessage('La fecha de inicio es requerida'),
    returnBodyValidationErrors,
    ZoneTripPriceController.store
);

router.get('/getByZoneId/:zoneId',
    param('zoneId').notEmpty().withMessage('El ID es requerido').isNumeric().withMessage('El ID debe de ser un dato númerico'),
    returnBodyValidationErrors,
    ZoneTripPriceController.index
);

export default router;