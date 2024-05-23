import { Request, Response } from "express";
import { OrderServices } from "./order.services";

//-----------------create an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot create order!",
      error: err,
    });
  }
};

//-----------------get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Order not found!",
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
