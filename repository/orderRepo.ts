import Db from "../db/database.ts";
import { OrderStatus } from "../model/orderStatus.ts";
import { Order } from "../model/order.ts";
import { Wine } from "../model/wine.ts";

const orderCollection = Db.collection("orders");

export const createOrder = async (order: Order) => {
  return await orderCollection.insertOne(order);
};

export const addWineToOrder = async (wine: Wine, phone: any) => {
  return await orderCollection.updateOne({
    phone: phone,
  }, {
    $push: {
      "wines": wine,
    },
  });
};

export const checkWineExist = async (wine: Wine, phone: any) => {
  return await orderCollection.findOne({
    phone: phone,
    wines: { $in: [wine] },
  });
};

export const selectOrderByPhone = async (phone: any) => {
  return await orderCollection.findOne({
    phone: phone,
    status: OrderStatus.PENDING,
  });
};

export const updateOrderStatus = async (phone: any) => {
  return await orderCollection.updateOne({
    phone: phone,
  }, {
    status: OrderStatus.CONFIRM,
  });
};
