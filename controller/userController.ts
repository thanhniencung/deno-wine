import { Context, Status } from "https://deno.land/x/oak/mod.ts";

export const testApiHandler = (context: Context) => {
  context.response.status = Status.OK;
  context.response.body = "testApiHandler";
};
