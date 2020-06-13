import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  signInHandler,
  signUpHandler,
  profileHandler,
} from "../controller/userController.ts";
import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";
import {addWineHandler, wineListHandler} from "../controller/wineController.ts";

const router = new Router();
router
  .post("/api/user/sign-in", signInHandler)
  .post("/api/user/sign-up", signUpHandler)
  .get("/api/user/profile", jwtMiddleware, profileHandler)
  .get("/api/wine/list", wineListHandler)
  .post("/api/wine/add", jwtMiddleware, addWineHandler);

export default router;
