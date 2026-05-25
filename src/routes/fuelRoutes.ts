import { authenticated } from "../middlewares/authentication";
import { body, param } from "express-validator";
import { FuelController } from "../controllers/FuelController";
import { isAdmin } from "../middlewares/roles";
import { returnBodyValidationErrors } from "../middlewares/validation";
import { Router } from "express";

const router = Router();

router.use(authenticated);
router.use(isAdmin);

router.post('/',
    body('name').notEmpty().withMessage('El nombre es requerido'),
    returnBodyValidationErrors,
    FuelController.store
);

router.get('/',
    FuelController.index
);

router.get('/:id',
    param('id').notEmpty().withMessage('El id es requerido').isNumeric().withMessage('El id debe ser un dato númerico'),
    returnBodyValidationErrors,
    FuelController.get
);

router.post('/addPrice/:id',
    body('price').notEmpty().withMessage('El precio es requerido').isNumeric().withMessage('El precio debe ser un dato númerico'),
    returnBodyValidationErrors,
    FuelController.addPrice
);

export default router;