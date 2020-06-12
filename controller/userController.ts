import { Context, Status, STATUS_TEXT } from "https://deno.land/x/oak/mod.ts";
import { saveUser, selectUSerByPhone } from "../repository/userRepo.ts";
import { Response } from "../helper/response.ts";
import { encryptPass, verifyPass } from "../security/pass.ts";
import { User } from "../model/user.ts";

export const signInHandler = async (context: Context) => {
  const body = await context.request.body();
  const reqData = body.value;

  // verify phone and pass
  const user: User = await selectUSerByPhone(reqData.phone);
  if (!user) {
    return Response(context, Status.NotFound, {
      status: Status.NotFound,
      message: STATUS_TEXT.get(Status.NotFound),
    });
  }

  // verify pass
  const passIsValid = verifyPass(reqData.password, user.password);
  if (!passIsValid) {
    return Response(context, Status.Unauthorized, {
      status: Status.Unauthorized,
      message: STATUS_TEXT.get(Status.Unauthorized),
    });
  }

  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
  });
};

export const signUpHandler = async (context: Context) => {
  const body = await context.request.body();
  const reqData = body.value;

  const user = await selectUSerByPhone(reqData.phone);
  if (user) {
    return Response(context, Status.Conflict, {
      status: Status.Conflict,
      message: STATUS_TEXT.get(Status.Conflict),
    });
  }

  reqData.password = encryptPass(reqData.password);
  const insertId = await saveUser(reqData);
  if (!insertId) {
    return Response(context, Status.InternalServerError, {
      status: Status.InternalServerError,
      message: STATUS_TEXT.get(Status.InternalServerError),
    });
  }

  return Response(context, Status.OK, {
    status: Status.OK,
    message: STATUS_TEXT.get(Status.OK),
  });
};
