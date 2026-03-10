import { Router } from "express";
import { authenticated, returnBodyValidationErrors } from "../middlewares/middlewares";
import { VehicleController } from "../controllers/controllers";
import { body, param } from "express-validator";

const router = Router();

router.use(authenticated);

router.post('/',
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('autonomy').notEmpty().withMessage('La autonomia del vehiculo es requerida').isNumeric().withMessage('La autonomia del vehiculo debe de ser un dato númerico'),
    body('vehicle_brand_id').notEmpty().withMessage('La marca es requerida').isNumeric().withMessage('La marca debe de ser un dato númerico'),
    body('image').notEmpty().withMessage('La imagén de pérfil es requerida'),
    body('year').notEmpty().withMessage('El modelo del vehiculo es requerido'),
    returnBodyValidationErrors,
    VehicleController.store
);

router.get('/',
    VehicleController.index
);

router.get('/getVehiclesByBrand/:id',
    param('id').notEmpty().withMessage('El id es requerido').isNumeric().withMessage('El id debe de ser un dato númerico'),
    returnBodyValidationErrors,
    VehicleController.getVehiclesByBrandId
);


export default router;