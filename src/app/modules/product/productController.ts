import { Request, Response } from "express";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    console.log(req);
    //call service function
    const result = await productServices.createProductIntoDB(product);
    //sending response
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Cannot create Product",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
};
