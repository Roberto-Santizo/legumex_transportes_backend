import { Router } from "express";
import { PlaceController } from "../controllers/controllers";
import { query } from "express-validator";
import { returnBodyValidationErrors } from "../middlewares/middlewares";

const router = Router();

router.get('/',
    query('place').notEmpty().withMessage('El lugar es requerido'),
    returnBodyValidationErrors,
    PlaceController.index
);

export default router;