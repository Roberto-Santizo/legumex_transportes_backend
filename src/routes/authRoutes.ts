import { AuthController } from "../controllers/controllers";
import { body } from "express-validator";
import { returnBodyValidationErrors } from "../middlewares/validation";
import { Router } from "express";

const router = Router();

router.post('/login',
    body('email').notEmpty().withMessage('El correo electronico es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    returnBodyValidationErrors,
    AuthController.login
);

router.post('/register',
    body('name').notEmpty().withMessage('El nombre del usuario es requerido'),
    body('lastName').notEmpty().withMessage('El apellido del usuario es requerido'),
    body('email').notEmpty().withMessage('El correo electronico es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('role').notEmpty().withMessage('El rol del usuario es requerido'),
    returnBodyValidationErrors,
    AuthController.register
);

export default router;