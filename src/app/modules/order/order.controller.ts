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
    const email = req.query.email;
    if (email) {
      const email = req.query.email as string;
      const result = await OrderServices.getOrdersByEmailFromDB(email);
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    }
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

//------------------get orders by email
// const getOrdersByEmail = async (req: Request, res: Response) => {
//   try {
//     const email = req.query.email as string;
//     const result = await OrderServices.getOrdersByEmailFromDB(email);
//     res.status(200).json({
//       success: true,
//       message: "Orders fetched successfully for user email!",
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Order not found for this email!",
//       error: err,
//     });
//   }
// };

export const OrderController = {
  createOrder,
  getAllOrders,
};
