import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

//--------------create a product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

//---------------get all products
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

//--------------get a single product by ID
const getASingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id });
  return result;
};

//--------------delete a product with id
const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.updateOne({ id }, { isDeleted: true });
  return result;
};

//---------------Update Product Information
const updateProductInDB = async (id: string, updatedData: object) => {
  const result = ProductModel.findOneAndUpdate({ id }, updatedData, {
    new: true,
  });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
  deleteSingleProductFromDB,
  updateProductInDB,
};
