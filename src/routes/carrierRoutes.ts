import { authenticated, returnBodyValidationErrors } from "../middlewares/middlewares";
import { body, param } from "express-validator";
import { CarrierController } from "../controllers/controllers";
import { Router } from "express";

const router = Router();

router.use(authenticated);

router.post('/',
    body('name').notEmpty().withMessage('El nombre del transportista es requerido'),
    body('image').optional(),
    returnBodyValidationErrors,
    CarrierController.store
);

router.get('/',
    CarrierController.index
);

router.get('/:id',
    param('id').isNumeric().withMessage('El id debe de ser un dato númerico'),
    returnBodyValidationErrors,
    CarrierController.get
);

export default router;
