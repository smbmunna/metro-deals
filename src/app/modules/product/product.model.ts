import { Schema, model } from "mongoose";
import { TProduct, TVariant } from "./product.interface";

const variantsSchema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema({
  quantity: Number,
  inStock: Boolean,
});

const productSchema = new Schema<TProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, requried: true },
  category: { type: String, required: true },
  tags: ["computer", "peripherals", "wireless", "ergonomic"],
  variants: [variantsSchema],
  inventory: inventorySchema,
});

export const Product = model<TProduct>("Product", productSchema);