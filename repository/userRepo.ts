import Db from "../db/database.ts";
import { User } from "../model/user.ts";

const userCollection = Db.collection("users");

export const saveUser = async (user: User) => {
  return await userCollection.insertOne(user);
};

export const selectUSerByPhone = async (phone: any) => {
  return await userCollection.findOne({
    phone: phone,
  });
};
