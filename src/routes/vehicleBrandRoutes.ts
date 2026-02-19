import { authenticated } from "../middlewares/authentication";
import { body, param } from "express-validator";
import { returnBodyValidationErrors } from "../middlewares/middlewares";
import { Router } from "express";
import { VehicleBrandController } from "../controllers/controllers";

const router = Router();

router.use(authenticated);

router.post('/',
    body('name').notEmpty().withMessage('El nombre de la marca es requerido'),
    returnBodyValidationErrors,
    VehicleBrandController.store
);

router.get('/',
    VehicleBrandController.index
);

router.get('/:id',
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    returnBodyValidationErrors,
    VehicleBrandController.get
);

router.patch('/:id',
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    body('name').notEmpty().withMessage('El nombre de la marca es requerido'),
    returnBodyValidationErrors,
    VehicleBrandController.update
);

export default router;