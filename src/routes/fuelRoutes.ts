import { Router } from "express";
import { authenticated } from "../middlewares/authentication";
import { FuelController } from "../controllers/FuelController";

const router = Router();

router.use(authenticated);

router.get('/getCurrentPrices',
    FuelController.getCurrentPrices
);

export default router;