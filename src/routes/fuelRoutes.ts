import { authenticated } from "../middlewares/authentication";
import { body } from "express-validator";
import { FuelController } from "../controllers/FuelController";
import { returnBodyValidationErrors } from "../middlewares/validation";
import { Router } from "express";

const router = Router();

router.use(authenticated);

router.post('/',
    body('name').notEmpty().withMessage('El nombre es requerido'),
    returnBodyValidationErrors,
    FuelController.store
);

router.get('/',
    FuelController.index
);


export default router;