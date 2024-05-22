import express from "express";
import { ProductControllers } from "./productController";
const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);

export const ProductRoutes = router;
