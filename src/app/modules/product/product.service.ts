import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

//--------------create a product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

//---------------get all products
const getAllProductsFromDB = async (searchTerm: any) => {
  if (searchTerm == undefined) {
    const result = await ProductModel.find();
    return result;
  }
  const regex = new RegExp(searchTerm, "i");
  const pipeline = [
    {
      $match: {
        name: {
          $regex: regex,
        },
      },
    },
  ];

  const result = await ProductModel.aggregate(pipeline);
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

//--------------Search products
//const searchProductsInDB = async (searchTerm: any) => {};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
  deleteSingleProductFromDB,
  updateProductInDB,
};
