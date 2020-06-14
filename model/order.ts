import { Wine } from "./wine.ts";
import { OrderStatus } from "./orderStatus.ts";

export interface Order {
  phone: any;
  wines: Wine[];
  status: OrderStatus;
}
