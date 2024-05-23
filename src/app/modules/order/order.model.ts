import { Model, Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number },
  quantity: { type: Number },
});

export const OrderModel = model<TOrder>("Order", OrderSchema);
