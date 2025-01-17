import { Context, Status, STATUS_TEXT } from "https://deno.land/x/oak/mod.ts";
import { Response } from "../helper/response.ts";
import { genToken } from "../security/jwt.ts";
import { Wine } from "../model/wine.ts";
import {
  saveWine,
  selectWineByCateId,
  selectWineById,
} from "../repository/wineRepo.ts";

export const wineListHandler = async (context: Context) => {
  const cates = [
    {
      "cateId": "1",
      "cateName": "Red Wines",
    },
    {
      "cateId": "2",
      "cateName": "White Wines",
    },
    {
      "cateId": "3",
      "cateName": "Rosé Wines",
    },
    {
      "cateId": "4",
      "cateName": "Orange Wine",
    },
    {
      "cateId": "5",
      "cateName": "Champagne",
    },
    {
      "cateId": "6",
      "cateName": "Sparkling Wines",
    },
    {
      "cateId": "7",
      "cateName": "Fortified Wines",
    },
  ];

  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
    data: cates,
  });
};

export const addWineHandler = async (context: Context) => {
  const body = await context.request.body();
  const wine: Wine = body.value;

  if (!wine) {
    return Response(context, Status.BadRequest, {
      status: Status.BadRequest,
      message: STATUS_TEXT.get(Status.BadRequest),
    });
  }

  // insert wine to database
  const insertId = await saveWine(wine);
  if (!insertId) {
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

export const wineDetailHandler = async (context: any) => {
  const { id } = context.params as { id: string };
  const wine: Wine = await selectWineById(id);

  if (!wine) {
    return Response(context, Status.NotFound, {
      status: Status.NotFound,
      message: STATUS_TEXT.get(Status.NotFound),
    });
  }

  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
    data: wine,
  });
};

export const wineCateHandler = async (context: any) => {
  const { id } = context.params as { id: string };
  const wines: Wine[] = await selectWineByCateId(id);

  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
    data: wines,
  });
};
