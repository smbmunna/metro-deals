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

//----------------get orders by email
const getOrdersByEmailFromDB = async (email: string) => {
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
  getOrdersByEmailFromDB,
};
