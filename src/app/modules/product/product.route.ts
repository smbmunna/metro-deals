import express from "express";
import { ProductControllers } from "./productController";
const router = express.Router();

router.post("/create-product", ProductControllers.createProduct);

export const ProductRoutes = router;
