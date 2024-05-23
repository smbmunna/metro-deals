import { Types } from "mongoose";
import { ProductModel } from "../product/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//---------------create an order
const createOrderIntoDB = async (order: TOrder) => {
  //check if product id is valid
  const productIdObject = new Types.ObjectId(order.productId);

  const foundProduct = await ProductModel.findOne(productIdObject as any);
  if (!foundProduct) {
    return false;
  }

  //stock check
  const qtyOrd = order.quantity;
  const isAvailable = await stockCheck(
    productIdObject as any,
    qtyOrd as number
  );
  if (!isAvailable) {
    return { success: false, message: "Stock not available" };
  }

  if (foundProduct && isAvailable) {
    //create order
    const result = await OrderModel.create(order);

    //reduce product quantity
    reduceQuantity(order.productId, order);

    //update inStock status
    updateInStock(order.productId);

    return result;
  } else {
    return { success: false, message: "Stock not available" };
  }
};

//----------------stock check
const stockCheck = async (id: string, qtyOrd: number) => {
  const product = await ProductModel.findOne(id as any);
  const currentStock = product?.inventory.quantity;
  if ((currentStock as any) > qtyOrd) {
    return true;
  } else {
    return false;
  }
};

//-------------reduce quantity after ordering
const reduceQuantity = async (id: string, order: TOrder) => {
  const qtyOrd = order.quantity;
  const result = await ProductModel.updateOne(
    { _id: id },
    { $inc: { "inventory.quantity": -qtyOrd } }
  );
  return result;
};

//--------------update stock status
const updateInStock = async (id: string) => {
  const productObjectId = new Types.ObjectId(id);
  const orderedProduct = await ProductModel.aggregate([
    {
      $match: { _id: productObjectId },
    },
  ]);
  const [orderedProductObj] = orderedProduct;
  const productQty = orderedProductObj.inventory.quantity;
  if (productQty <= 0) {
    await ProductModel.updateOne({ _id: id }, { "inventory.inStock": false });
  }
};

//---------------get all orders
const getAllOrdersFromDB = async (email: string) => {
  if (!email) {
    const result = await OrderModel.find();
    return result;
  }
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
};
