import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//--------------create a product
const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

//---------------get all products
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
