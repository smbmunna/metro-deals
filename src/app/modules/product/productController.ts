import { Request, Response } from "express";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await productServices.getAllProductsFromDB(searchTerm);

    if (result.length > 0 && searchTerm) {
      return res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    } else if (result.length == 0) {
      return res.status(500).json({
        success: false,
        message: "Product not found!",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: err,
    });
  }
};

const getASingleProductByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productServices.getASingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "No Product Found!",
      error: err,
    });
  }
};

const deleteASingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Cannot delete product",
      error: err,
    });
  }
};

const updateDataById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;

    const result = await productServices.updateProductInDB(
      productId,
      updatedData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Cannot update product",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getASingleProductByID,
  deleteASingleProduct,
  updateDataById,
};
