import Db from "../db/database.ts";
import { Wine } from "../model/wine.ts";

const wineCollection = Db.collection("wines");

export const saveWine = async (wine: Wine) => {
    return await wineCollection.insertOne(wine);
}