import { Types } from "mongoose";
import { ProductModel } from "../product/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//---------------create an order
const createOrderIntoDB = async (order: TOrder) => {
  //check if product id is valid
  const productIdObject = new Types.ObjectId(order.productId);

  const foundProduct = await ProductModel.aggregate([
    {
      $match: { _id: productIdObject },
    },
  ]);
  if (foundProduct) {
    const result = await OrderModel.create(order);

    //reduce product quantity
    reduceQuantity(order.productId, order);

    return result;
  } else {
    return false;
  }
};

//-------------reduce quantity after ordering
const reduceQuantity = async (id: string, order: TOrder) => {
  //console.log(productId);
  const qtyOrd = order.quantity;
  const result = await ProductModel.updateOne(
    { _id: id },
    { $inc: { "inventory.quantity": -qtyOrd } }
  );

  return result;
};

//---------------get all orders
const getAllOrdersFromDB = async (email: string) => {
  if (!email) {
    const result = await OrderModel.find();
    return result;
  }
  const result = await OrderModel.aggregate([
    {
      $match: { email: email },
    },
  ]);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
