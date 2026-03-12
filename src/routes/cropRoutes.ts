import { authenticated, isAdmin, returnBodyValidationErrors } from "../middlewares/middlewares";
import { body } from "express-validator";
import { CropController } from "../controllers/controllers";
import { Router } from "express";

const router = Router();

router.use(authenticated);

router.post('/',
    isAdmin,
    body('name').notEmpty().withMessage('El nombre del cultivo es requerido'),
    returnBodyValidationErrors,
    CropController.store
);

router.get('/',
    CropController.index
);

export default router;