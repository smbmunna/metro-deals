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

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
};
