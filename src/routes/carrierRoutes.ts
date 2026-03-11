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

router.post('/addDriverToCarrier',
    body('code').notEmpty().withMessage('El código es requerido'),
    returnBodyValidationErrors,
    CarrierController.addDriverToCarrier
);

router.get('/getDrivers/:code',
    param('code').notEmpty().withMessage('El código es requerido'),
    returnBodyValidationErrors,
    CarrierController.getDriversByCarrierCode
);

router.post('/addVehicle/:code',
    param('code').notEmpty().withMessage('El código es requerido'),
    body('plate').notEmpty().withMessage('La placa es requerida'),
    body('vehicle_id').notEmpty().withMessage('El vehiculo es requerido'),
    body('total_kms').notEmpty().withMessage('El kilometraje es requerido').isNumeric().withMessage('El kilometraje debe de ser un dato númerico'),
    body('max_weight').notEmpty().withMessage('El peso máximo es requerido').isNumeric().withMessage('El peso maximo debe de ser un dato númerico'),
    body('fuel_type').notEmpty().withMessage('El tipo de combustible es requerido'),
    body('image').optional(),
    returnBodyValidationErrors,
    CarrierController.addVehicleToCarrier
);

router.get('/getVehicles/:code',
    param('code').notEmpty().withMessage('El código es requerido'),
    returnBodyValidationErrors,
    CarrierController.getVehiclesByCarrier
);

router.post('/updateVehicleStatus/:id',
    param('id').notEmpty().withMessage('El código es requerido'),
    returnBodyValidationErrors,
    CarrierController.updateCarrierVehicleStatus
);

export default router;
