import { Router } from "express";
import { authenticated, isAdmin, returnBodyValidationErrors } from "../middlewares/middlewares";
import { ZoneController } from "../controllers/controllers";
import { body, param } from "express-validator";

const router = Router();

router.use(authenticated);
router.use(isAdmin);

router.post('/',
    body('name').notEmpty().withMessage('El nombre de la zona es requerido'),
    body('coordinates').isArray().withMessage('Las coordenadas deben de ser un arreglo').notEmpty().withMessage('Las coordenadas son requeridas'),
    returnBodyValidationErrors,
    ZoneController.store
);

router.get('/',
    ZoneController.index
);

router.get('/:id',
    param('id').notEmpty().withMessage('El ID es requerido').isNumeric().withMessage('El ID debe de ser un dato númerico'),
    returnBodyValidationErrors,
    ZoneController.get
);

router.delete('/:id',
    param('id').notEmpty().withMessage('El ID es requerido').isNumeric().withMessage('El ID debe de ser un dato númerico'),
    returnBodyValidationErrors,
    ZoneController.delete
);

router.post('/addPriceRange/:id',
    param('id').notEmpty().withMessage('El ID es requerido').isNumeric().withMessage('El ID debe de ser un dato númerico'),
    body('fuel_range').notEmpty().withMessage('El rango de precio es requerido').isNumeric().withMessage('El rango de precio debe de ser un dato númerico'),
    returnBodyValidationErrors,
    ZoneController.addPriceRange
);

router.get('/getPricesByZone/:id',
    param('id').notEmpty().withMessage('El ID es requerido').isNumeric().withMessage('El ID debe de ser un dato númerico'),
    returnBodyValidationErrors,
    ZoneController.getFuelPricesByZoneId
);

router.delete('/removePriceRange/:rangeId',
    param('rangeId').notEmpty().withMessage('El ID es requerido').isNumeric().withMessage('El ID debe de ser un dato númerico'),
    returnBodyValidationErrors,
    ZoneController.removePriceRange
);

export default router;