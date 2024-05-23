import { Request, Response } from "express";
import { OrderServices } from "./order.services";

//-----------------create an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrderIntoDB(order);

    if (result) {
      //console.log(result);
      res.status(200).json({
        success: true,
        message: "Order created successfully",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Product not Available",
      error: err,
    });
  }
};

//-----------------get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await OrderServices.getAllOrdersFromDB(email as string);
    if (result.length > 0 && !email) {
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } else if (result.length > 0 && email) {
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } else if (result.length == 0) {
      return res.status(500).json({
        success: false,
        message: "Order not found!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
