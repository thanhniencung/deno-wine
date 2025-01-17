import { Context, Status, STATUS_TEXT } from "https://deno.land/x/oak/mod.ts";
import { fetchPayload } from "../helper/token.ts";
import { selectWineById } from "../repository/wineRepo.ts";
import { Response } from "../helper/response.ts";
import { Order } from "../model/order.ts";
import {
  addWineToOrder,
  checkWineExist,
  createOrder,
  selectOrderByPhone,
  updateOrderStatus,
} from "../repository/orderRepo.ts";
import { OrderStatus } from "../model/orderStatus.ts";

export const addToCartHandler = async (context: any) => {
  const data = await fetchPayload(context);
  const { wineId } = context.params as { wineId: string };

  const wine = await selectWineById(wineId);
  if (!wine) {
    return Response(context, Status.NotFound, {
      status: Status.NotFound,
      message: STATUS_TEXT.get(Status.NotFound),
    });
  }

  const order: Order = await selectOrderByPhone(data?.phone);
  if (!order) {
    const order: Order = {
      phone: data?.phone,
      wines: [],
      status: OrderStatus.PENDING,
    };

    await createOrder(order);
    await addWineToOrder(wine, data?.phone);
    return Response(context, Status.OK, {
      status: Status.OK,
      message: STATUS_TEXT.get(Status.OK),
    });
  }

  const wineExist = await checkWineExist(wine, data?.phone);
  if (wineExist) {
    return Response(context, Status.Conflict, {
      status: Status.Conflict,
      message: STATUS_TEXT.get(Status.Conflict),
    });
  }

  await addWineToOrder(wine, data?.phone);
  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
  });
};

export const checkoutHandler = async (context: Context) => {
  const data = await fetchPayload(context);
  const upsertedId = await updateOrderStatus(data?.phone);
  if (!upsertedId) {
    return Response(context, Status.ExpectationFailed, {
      status: Status.ExpectationFailed,
      message: STATUS_TEXT.get(Status.ExpectationFailed),
    });
  }

  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
  });
};

export const shoppingCartHandler = async (context: Context) => {
  const data = await fetchPayload(context);
  const order = await selectOrderByPhone(data?.phone);

  if (!order) {
    return Response(context, Status.NotFound, {
      status: Status.NotFound,
      message: STATUS_TEXT.get(Status.NotFound),
    });
  }

  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
    data: {
      wines: order.wines,
    },
  });
};
