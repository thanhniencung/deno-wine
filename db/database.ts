import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

// code4func - 123456!@#$%^ - 123456%21%40%23%24%25%5E
const client = new MongoClient();
client.connectWithUri(
  "mongodb+srv://code4func:123456%21%40%23%24%25%5E@cluster0-wdvpb.mongodb.net/code4func?retryWrites=true&w=majority",
);

const db = client.database("code4func");
export default db;
