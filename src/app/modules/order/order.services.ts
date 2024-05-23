import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//---------------create an order
const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

//---------------get all orders
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
