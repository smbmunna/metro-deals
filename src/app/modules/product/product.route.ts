import express from "express";
import { ProductControllers } from "./productController";
const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getASingleProductByID);
router.delete("/:productId", ProductControllers.deleteASingleProduct);
router.put("/:productId", ProductControllers.updateDataById);

export const ProductRoutes = router;
